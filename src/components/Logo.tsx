'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
  iconSize?: number;
  darkText?: boolean;
  compact?: boolean;
}

export default function Logo({
  className = '',
  showText = true,
  iconSize = 100,
  darkText = false,
  compact = false,
}: LogoProps) {
  const textSize = compact ? '1.15rem' : '2rem';
  const taglineSize = compact ? '0.5rem' : '0.65rem';
  const taglineSpacing = compact ? '3px' : '5px';
  const gap = compact ? '10px' : '16px';

  return (
    <>
      <style>{`
        .sg-logo-wrapper {
          display: inline-flex;
          align-items: center;
          gap: ${gap};
          text-decoration: none;
          cursor: pointer;
        }

        .sg-logo-icon {
          filter: drop-shadow(0 0 18px rgba(124, 58, 237, 0.25));
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sg-logo-wrapper:hover .sg-logo-icon {
          transform: scale(1.06);
        }

        /* orbit pulse */
        @keyframes sg-orbit-pulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.55; }
        }
        .sg-orbit { animation: sg-orbit-pulse 4s ease-in-out infinite; }
        .sg-orbit-2 { animation-delay: 1.3s; }
        .sg-orbit-3 { animation-delay: 2.6s; }

        /* slow spin for the outer ring */
        @keyframes sg-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .sg-ring-spin {
          transform-origin: 60px 60px;
          animation: sg-spin 24s linear infinite;
        }

        /* floating dots */
        @keyframes sg-dot-float {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-3px); }
        }
        .sg-dot-1 { animation: sg-dot-float 3s ease-in-out infinite; }
        .sg-dot-2 { animation: sg-dot-float 3s ease-in-out 0.8s infinite; }
        .sg-dot-3 { animation: sg-dot-float 3s ease-in-out 1.6s infinite; }
        .sg-dot-4 { animation: sg-dot-float 3s ease-in-out 2.4s infinite; }

        /* glow throb on letters */
        @keyframes sg-glow {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(124,58,237,0.3)); }
          50% { filter: drop-shadow(0 0 14px rgba(124,58,237,0.6)); }
        }
        .sg-letters { animation: sg-glow 5s ease-in-out infinite; }

        /* brand text styles */
        .sg-brand-name {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-weight: 800;
          font-size: ${textSize};
          line-height: 1.1;
          letter-spacing: -0.5px;
        }
        .sg-brand-tagline {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-weight: 600;
          font-size: ${taglineSize};
          letter-spacing: ${taglineSpacing};
          text-transform: uppercase;
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .sg-logo-wrapper { gap: 8px; }
          .sg-brand-name { font-size: ${compact ? '1rem' : '1.25rem'}; }
          .sg-brand-tagline { font-size: 0.45rem; letter-spacing: 2px; }
        }
      `}</style>

      <Link
        href="/"
        className={`sg-logo-wrapper ${className}`}
        aria-label="Go to Shree Gauli homepage"
        title="Shree Gauli — Digital Marketing Specialist"
      >
        {/* Animated SG Icon */}
        <svg
          className="sg-logo-icon"
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: iconSize, height: iconSize }}
        >
          <defs>
            <linearGradient id="sg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
            <linearGradient id="sg-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Outer rotating ring with dashes */}
          <g className="sg-ring-spin">
            <circle
              cx="60" cy="60" r="55"
              fill="none"
              stroke="url(#sg-ring-grad)"
              strokeWidth="1.5"
              strokeDasharray="8 12"
            />
          </g>

          {/* Orbiting decorative ellipses */}
          <ellipse className="sg-orbit" cx="60" cy="60" rx="48" ry="20" fill="none" stroke="rgba(124,58,237,0.12)" strokeWidth="1" transform="rotate(-25 60 60)" />
          <ellipse className="sg-orbit sg-orbit-2" cx="60" cy="60" rx="44" ry="16" fill="none" stroke="rgba(34,211,238,0.10)" strokeWidth="1" transform="rotate(35 60 60)" />
          <ellipse className="sg-orbit sg-orbit-3" cx="60" cy="60" rx="50" ry="14" fill="none" stroke="rgba(124,58,237,0.08)" strokeWidth="1" transform="rotate(70 60 60)" />

          {/* Floating accent dots */}
          <circle className="sg-dot-1" cx="18" cy="38" r="2.5" fill="#7C3AED" opacity="0.5" />
          <circle className="sg-dot-2" cx="100" cy="28" r="2" fill="#22D3EE" opacity="0.4" />
          <circle className="sg-dot-3" cx="104" cy="88" r="3" fill="#8B5CF6" opacity="0.35" />
          <circle className="sg-dot-4" cx="24" cy="85" r="1.8" fill="#22D3EE" opacity="0.45" />

          {/* Background circle */}
          <circle cx="60" cy="60" r="36" fill="rgba(124,58,237,0.06)" stroke="rgba(124,58,237,0.15)" strokeWidth="1.5" />

          {/* SG Letters */}
          <g className="sg-letters">
            <text
              x="38"
              y="72"
              fontFamily="'Inter', system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="40"
              fill="url(#sg-grad)"
              letterSpacing="-1"
            >
              S
            </text>
            <text
              x="62"
              y="72"
              fontFamily="'Inter', system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="40"
              fill="url(#sg-grad)"
              letterSpacing="-1"
            >
              G
            </text>
          </g>
        </svg>

        {showText && (
          <div>
            <div className="sg-brand-name" style={{ margin: 0 }}>
              <span style={{ color: darkText ? '#0f172a' : '#F8FAFC' }}>Shree</span>{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Gauli
              </span>
            </div>
            <div className="sg-brand-tagline">Digital Marketing</div>
          </div>
        )}
      </Link>
    </>
  );
}
