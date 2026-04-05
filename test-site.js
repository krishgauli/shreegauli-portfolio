const http = require("http");

function req(method, path, body, headers) {
  return new Promise((resolve) => {
    const opts = {
      hostname: "localhost", port: 3000, path, method,
      headers: { "Content-Type": "application/json", ...headers },
      timeout: 10000,
    };
    const r = http.request(opts, (res) => {
      let d = ""; res.on("data", (c) => (d += c));
      res.on("end", () => {
        let p; try { p = JSON.parse(d); } catch { p = null; }
        resolve({ code: res.statusCode, data: p, raw: d.substring(0, 200) });
      });
    });
    r.on("error", (e) => resolve({ code: "ERR", error: e.message }));
    r.on("timeout", () => { r.destroy(); resolve({ code: "TIMEOUT" }); });
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

async function main() {
  const issues = [];

  // Page tests
  const pages = ["/","/about","/contact","/services","/services/seo","/services/paid-media","/services/social-media","/services/automation","/work","/work/seo-growth","/work/paid-media","/work/automation","/writing","/seo-tools","/login","/signup","/privacy","/terms","/book","/dashboard/admin","/dashboard/client"];
  
  console.log("=== PAGES ===");
  for (const p of pages) {
    const r = await req("GET", p);
    const ok = r.code === 200;
    console.log((ok ? "OK" : "FAIL") + " [" + r.code + "] " + p);
    if (!ok) issues.push("PAGE " + p + " => HTTP " + r.code);
  }

  // API: Contact Lead POST
  console.log("\n=== CONTACT LEAD API ===");
  const cl = await req("POST", "/api/contact-lead", { name: "Test", email: "t@t.com", message: "hi", source: "test" });
  console.log("[" + cl.code + "] POST /api/contact-lead");
  if (cl.data) {
    console.log("  message: " + cl.data.message);
    console.log("  emailStatus: " + cl.data.emailStatus);
    if (cl.data.emailDebug) console.log("  emailDebug: " + JSON.stringify(cl.data.emailDebug));
    if (cl.data.emailStatus === "failed") issues.push("SMTP: Contact lead emails failed - " + JSON.stringify(cl.data.emailDebug));
  }

  // API: Newsletter POST
  console.log("\n=== NEWSLETTER API ===");
  const nl = await req("POST", "/api/newsletter", { email: "nl" + Date.now() + "@t.com", source: "test" });
  console.log("[" + nl.code + "] POST /api/newsletter => " + (nl.data ? nl.data.message : "ERROR"));

  // API: Login
  console.log("\n=== LOGIN API ===");
  const login = await req("POST", "/api/auth/login", { email: "shree@focusyourfinance.com", password: "Hello@123" });
  console.log("[" + login.code + "] POST /api/auth/login => " + (login.data ? login.data.message : "FAILED"));
  
  let token = null;
  if (login.code === 200 && login.data && login.data.token) {
    token = login.data.token;
    console.log("  user: " + login.data.user.name + ", role: " + login.data.user.role);
  } else {
    issues.push("AUTH: Login failed");
  }

  if (token) {
    console.log("\n=== AUTH ENDPOINTS ===");
    const authEps = [
      { m: "GET", p: "/api/users" },
      { m: "GET", p: "/api/contact-lead" },
    ];
    for (const ep of authEps) {
      const r = await req(ep.m, ep.p, null, { Authorization: "Bearer " + token });
      const ok = r.code >= 200 && r.code < 300;
      const summary = r.data ? (Array.isArray(r.data) ? r.data.length + " items" : (r.data.message || JSON.stringify(r.data).substring(0, 80))) : r.raw.substring(0, 80);
      console.log((ok ? "OK" : "ISSUE") + " [" + r.code + "] " + ep.m + " " + ep.p + " => " + summary);
      if (!ok) issues.push("AUTH API " + ep.p + " => HTTP " + r.code);
    }
  }

  // Missing routes check
  console.log("\n=== ROUTE CHECKS ===");
  const routes = ["/news", "/blog", "/case-studies", "/pricing", "/automation", "/industries", "/book-a-demo", "/forgot-password"];
  for (const r of routes) {
    const res = await req("GET", r);
    const exists = res.code === 200;
    console.log("[" + res.code + "] " + r + " => " + (exists ? "EXISTS" : "MISSING"));
    if (!exists) issues.push("MISSING ROUTE: " + r + " => " + res.code);
  }

  // Summary
  console.log("\n=== SUMMARY ===");
  console.log("Issues found: " + issues.length);
  for (const i of issues) {
    console.log("  - " + i);
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
