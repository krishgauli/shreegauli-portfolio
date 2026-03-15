"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
    };
  };
  className?: string;
  children?: React.ReactNode;
}

class WebGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private vs: WebGLShader | null = null;
  private fs: WebGLShader | null = null;
  private buffer: WebGLBuffer | null = null;
  private scale: number;
  private shaderSource: string;
  private mouseMove = [0, 0];
  private mouseCoords = [0, 0];
  private pointerCoords = [0, 0];
  private nbrOfPointers = 0;

  private readonly vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

  private readonly vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

  constructor(canvas: HTMLCanvasElement, scale: number) {
    const context = canvas.getContext("webgl2");
    if (!context) {
      throw new Error("WebGL2 not supported");
    }

    this.canvas = canvas;
    this.scale = scale;
    this.gl = context;
    this.shaderSource = defaultShaderSource;
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
  }

  updateShader(source: string) {
    this.reset();
    this.shaderSource = source;
    this.setup();
    this.init();
  }

  updateMove(deltas: number[]) {
    this.mouseMove = deltas;
  }

  updateMouse(coords: number[]) {
    this.mouseCoords = coords;
  }

  updatePointerCoords(coords: number[]) {
    this.pointerCoords = coords;
  }

  updatePointerCount(nbr: number) {
    this.nbrOfPointers = nbr;
  }

  updateScale(scale: number) {
    this.scale = scale;
    this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
  }

  compile(shader: WebGLShader, source: string) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      console.error("Shader compilation error:", error);
    }
  }

  test(source: string) {
    let result: string | null = null;
    const gl = this.gl;
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!shader) return "Failed to create shader";

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      result = gl.getShaderInfoLog(shader);
    }

    gl.deleteShader(shader);
    return result;
  }

  reset() {
    const gl = this.gl;

    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) {
        gl.detachShader(this.program, this.vs);
        gl.deleteShader(this.vs);
      }
      if (this.fs) {
        gl.detachShader(this.program, this.fs);
        gl.deleteShader(this.fs);
      }
      gl.deleteProgram(this.program);
    }
  }

  setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);

    if (!this.vs || !this.fs) {
      throw new Error("Unable to create WebGL shaders");
    }

    this.compile(this.vs, this.vertexSrc);
    this.compile(this.fs, this.shaderSource);

    this.program = gl.createProgram();
    if (!this.program) {
      throw new Error("Unable to create WebGL program");
    }

    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const gl = this.gl;
    const program = this.program;
    if (!program) return;

    this.buffer = gl.createBuffer();
    if (!this.buffer) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  }

  render(now = 0) {
    const gl = this.gl;
    const program = this.program;
    if (!program || !this.buffer || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

    const resolution = gl.getUniformLocation(program, "resolution");
    const time = gl.getUniformLocation(program, "time");
    const move = gl.getUniformLocation(program, "move");
    const touch = gl.getUniformLocation(program, "touch");
    const pointerCount = gl.getUniformLocation(program, "pointerCount");
    const pointers = gl.getUniformLocation(program, "pointers");

    gl.uniform2f(resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(time, now * 1e-3);
    gl.uniform2f(move, this.mouseMove[0], this.mouseMove[1]);
    gl.uniform2f(touch, this.mouseCoords[0], this.mouseCoords[1]);
    gl.uniform1i(pointerCount, this.nbrOfPointers);
    gl.uniform2fv(pointers, this.pointerCoords);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

class PointerHandler {
  private scale: number;
  private active = false;
  private pointers = new Map<number, number[]>();
  private lastCoords = [0, 0];
  private moves = [0, 0];

  constructor(element: HTMLCanvasElement, scale: number) {
    this.scale = scale;

    const map = (x: number, y: number) => [x * this.scale, element.height - y * this.scale];

    element.addEventListener("pointerdown", (event) => {
      this.active = true;
      this.pointers.set(event.pointerId, map(event.clientX, event.clientY));
    });

    const release = (event: PointerEvent) => {
      if (this.count === 1) {
        this.lastCoords = this.first;
      }

      this.pointers.delete(event.pointerId);
      this.active = this.pointers.size > 0;
    };

    element.addEventListener("pointerup", release);
    element.addEventListener("pointerleave", release);

    element.addEventListener("pointermove", (event) => {
      if (!this.active) return;

      this.lastCoords = [event.clientX, event.clientY];
      this.pointers.set(event.pointerId, map(event.clientX, event.clientY));
      this.moves = [this.moves[0] + event.movementX, this.moves[1] + event.movementY];
    });
  }

  updateScale(scale: number) {
    this.scale = scale;
  }

  get count() {
    return this.pointers.size;
  }

  get move() {
    return this.moves;
  }

  get coords() {
    return this.pointers.size > 0
      ? Array.from(this.pointers.values()).flat()
      : [0, 0];
  }

  get first() {
    return this.pointers.values().next().value ?? this.lastCoords;
  }
}

const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const pointersRef = useRef<PointerHandler | null>(null);
  const [isSupported, setIsSupported] = React.useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!canvasRef.current || prefersReducedMotion) {
      setIsSupported(false);
      return;
    }

    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      rendererRef.current?.updateScale(dpr);
      pointersRef.current?.updateScale(dpr);
    };

    const loop = (now: number) => {
      if (!rendererRef.current || !pointersRef.current) return;

      rendererRef.current.updateMouse(pointersRef.current.first);
      rendererRef.current.updatePointerCount(pointersRef.current.count);
      rendererRef.current.updatePointerCoords(pointersRef.current.coords);
      rendererRef.current.updateMove(pointersRef.current.move);
      rendererRef.current.render(now);
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    try {
      rendererRef.current = new WebGLRenderer(canvas, dpr);
      pointersRef.current = new PointerHandler(canvas, dpr);

      rendererRef.current.setup();
      rendererRef.current.init();
      resize();

      if (rendererRef.current.test(defaultShaderSource) === null) {
        rendererRef.current.updateShader(defaultShaderSource);
      }

      animationFrameRef.current = requestAnimationFrame(loop);
      window.addEventListener("resize", resize);
      setIsSupported(true);
    } catch {
      setIsSupported(false);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      rendererRef.current?.reset();
    };
  }, [prefersReducedMotion]);

  return { canvasRef, isSupported: isSupported && !prefersReducedMotion };
};

export default function AnimatedShaderHero({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = "",
  children,
}: HeroProps) {
  const { canvasRef, isSupported } = useShaderBackground();

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${className}`}>
      {isSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none object-cover"
          style={{ background: "black" }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(124,58,237,0.24) 0%, transparent 62%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(34,211,238,0.2) 0%, transparent 65%), #070B14",
          }}
        />
      )}

      {children ? (
        <div className="absolute inset-0 z-10">{children}</div>
      ) : (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-white">
          {trustBadge && (
            <div className="mb-8">
              <div className="flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-6 py-3 text-sm backdrop-blur-md">
                {trustBadge.icons && (
                  <div className="flex gap-1 text-brand-cyan">
                    {trustBadge.icons.map((icon, index) => (
                      <span key={`${icon}-${index}`}>{icon}</span>
                    ))}
                  </div>
                )}
                <span className="text-content-primary/90">{trustBadge.text}</span>
              </div>
            </div>
          )}

          <div className="mx-auto max-w-5xl space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="bg-linear-to-r from-brand-violet via-brand-cyan to-brand-violet bg-clip-text text-5xl font-bold text-transparent md:text-7xl lg:text-8xl">
                {headline.line1}
              </h1>
              <h1 className="bg-linear-to-r from-brand-cyan via-brand-violet to-brand-cyan bg-clip-text text-5xl font-bold text-transparent md:text-7xl lg:text-8xl">
                {headline.line2}
              </h1>
            </div>

            <div className="mx-auto max-w-3xl">
              <p className="text-lg font-light leading-relaxed text-content-primary/90 md:text-xl lg:text-2xl">
                {subtitle}
              </p>
            </div>

            {buttons && (
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                {buttons.primary && (
                  <button
                    onClick={buttons.primary.onClick}
                    className="rounded-full bg-linear-to-r from-brand-violet to-brand-cyan px-8 py-4 text-lg font-semibold text-content-primary transition-all duration-300 hover:scale-105"
                  >
                    {buttons.primary.text}
                  </button>
                )}
                {buttons.secondary && (
                  <button
                    onClick={buttons.secondary.onClick}
                    className="rounded-full border border-brand-cyan/35 bg-brand-cyan/10 px-8 py-4 text-lg font-semibold text-content-primary transition-all duration-300 hover:scale-105"
                  >
                    {buttons.secondary.text}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.;
  mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}

float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}

void main(void) {
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);

  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }

  O=vec4(col,1);
}`;
