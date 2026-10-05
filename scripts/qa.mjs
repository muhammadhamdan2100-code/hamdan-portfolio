import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = "http://localhost:3000";
mkdirSync("qa", { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--disable-gpu", "--hide-scrollbars", "--no-first-run"],
});

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
];

const report = {};

for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  const issues = [];
  page.on("console", (m) => {
    if (m.type() === "error") issues.push("console.error: " + m.text());
  });
  page.on("pageerror", (e) => issues.push("pageerror: " + e.message));
  page.on("requestfailed", (r) =>
    issues.push("requestfailed: " + r.url() + " :: " + (r.failure()?.errorText ?? ""))
  );
  page.on("response", (r) => {
    if (r.status() >= 400) issues.push(`http ${r.status()}: ${r.url()}`);
  });

  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2600));

  // hero capture first: page is naturally at top, entrance animations settled
  await page.screenshot({ path: `qa/${vp.name}-hero.png` });

  // realistic scroll-through: visit every section so whileInView (once:true)
  // reveals fire before any capture
  await page.evaluate(async () => {
    const sections = Array.from(document.querySelectorAll("main > section, footer"));
    for (const s of sections) {
      s.scrollIntoView({ behavior: "instant", block: "start" });
      await new Promise((r) => setTimeout(r, 650));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1000));

  await page.screenshot({ path: `qa/${vp.name}-full.png`, fullPage: true });

  // 1. anchor integrity: every in-page href resolves to an element
  const anchors = await page.evaluate(() => {
    const hrefs = Array.from(document.querySelectorAll('a[href^="#"]')).map(
      (a) => a.getAttribute("href")
    );
    const unique = [...new Set(hrefs)];
    return unique.map((h) => ({
      href: h,
      resolved: h === "#top" ? Boolean(document.getElementById("top")) : Boolean(document.querySelector(h)),
    }));
  });

  // 2. external links inventory
  const external = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href^="http"]')).map((a) => ({
      href: a.getAttribute("href"),
      target: a.getAttribute("target"),
      rel: a.getAttribute("rel"),
      text: (a.textContent || "").trim().slice(0, 40),
    }))
  );

  // 3. key CTAs present
  const ctas = await page.evaluate(() => {
    const t = document.body.innerText;
    return {
      startProject: t.includes("Start a Project"),
      exploreWork: t.includes("Explore My Work"),
      viewLive: t.includes("View Live Project"),
      send: t.includes("Send Message"),
    };
  });

  report[vp.name] = { anchors, external, ctas, issues };

  // per-section viewport captures (desktop only, for visual review)
  if (vp.name === "desktop") {
    for (const id of ["services", "work", "about", "process", "contact"]) {
      await page.evaluate((i) => {
        document.getElementById(i)?.scrollIntoView({ behavior: "instant", block: "start" });
      }, id);
      await new Promise((r) => setTimeout(r, 1100));
      await page.screenshot({ path: `qa/desktop-${id}.png` });
    }
  }

  // reduced-motion fallback: content must still be visible
  if (vp.name === "desktop") {
    const rmPage = await browser.newPage();
    await rmPage.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    const rmIssues = [];
    rmPage.on("pageerror", (e) => rmIssues.push("pageerror: " + e.message));
    rmPage.on("console", (m) => {
      if (m.type() === "error") rmIssues.push("console.error: " + m.text());
    });
    await rmPage.setViewport({ width: 1440, height: 900 });
    await rmPage.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2000));
    const rmVisible = await rmPage.evaluate(() => {
      const el = document.getElementById("services");
      const r = el?.getBoundingClientRect();
      return { servicesTop: r ? Math.round(r.top) : null };
    });
    await rmPage.evaluate(() =>
      document.getElementById("services")?.scrollIntoView({ behavior: "instant" })
    );
    await new Promise((r) => setTimeout(r, 600));
    const rmOpacity = await rmPage.evaluate(() => {
      const el = document.querySelector("#services h2, #services [class*='display']");
      let node = el;
      while (node && getComputedStyle(node).opacity === "1") node = node.parentElement;
      const heading = Array.from(document.querySelectorAll("#services *")).find(
        (n) => (n.textContent || "").trim().startsWith("WHAT I BUILD")
      );
      return { headingFound: Boolean(heading), headingOpacity: heading ? getComputedStyle(heading).opacity : null };
    });
    await rmPage.screenshot({ path: "qa/desktop-reduced-motion.png" });
    report.reducedMotion = { issues: rmIssues, rmVisible, rmOpacity };
    await rmPage.close();
  }

  // interactive checks
  if (vp.name === "desktop") {
    // click "Start a Project" hero CTA -> should land on #contact
    const clicked = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("a"));
      const el = links.find((a) => (a.textContent || "").includes("Start a Project"));
      if (!el) return false;
      el.click();
      return true;
    });
    await new Promise((r) => setTimeout(r, 1400));
    const scrollAfterCta = await page.evaluate(() => ({
      y: Math.round(window.scrollY),
      contactVisible:
        document.getElementById("contact")?.getBoundingClientRect().top < window.innerHeight,
    }));

    // all five nav links resolve & scroll (settle first, click, poll up to 5s)
    const navChecks = [];
    for (const id of ["work", "services", "about", "process", "contact"]) {
      await new Promise((r) => setTimeout(r, 1200)); // realistic pacing: let prior scroll fully settle
      await page.evaluate((i) => {
        const link = document.querySelector(`header a[href="#${i}"]`);
        if (link) link.click();
      }, id);
      let ok = false;
      let retried = false;
      for (let t = 0; t < 5000 && !ok; t += 250) {
        await new Promise((r) => setTimeout(r, 250));
        ok = await page.evaluate((i) => {
          const el = document.getElementById(i);
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.top > -60 && r.top < window.innerHeight;
        }, id);
        if (!ok && !retried && t >= 2500) {
          retried = true;
          await page.evaluate((i) => {
            document.querySelector(`header a[href="#${i}"]`)?.click();
          }, id);
        }
      }
      navChecks.push({ id, ok, retried });
    }
    report.desktop.interactive = { clicked, scrollAfterCta, navChecks };
  }

  if (vp.name === "mobile") {
    // hamburger opens overlay
    const menuButton = await page.$("header button[aria-label], header button");
    await menuButton.click();
    await new Promise((r) => setTimeout(r, 700));
    const menuOpen = await page.evaluate(() => document.body.innerText.includes("Contact") && Boolean(document.querySelector('[aria-modal="true"], .fixed.inset-0')));
    await page.screenshot({ path: "qa/mobile-menu.png" });
    // click Services link in overlay -> closes, scrolls
    const clickedLink = await page.evaluate(() => {
      const el = document.querySelector('nav[aria-label="Mobile"] a[href="#services"]');
      if (!el) return false;
      el.click();
      return true;
    });
    await new Promise((r) => setTimeout(r, 1400));
    const afterMenu = await page.evaluate(() => ({
      y: Math.round(window.scrollY),
      servicesVisible:
        document.getElementById("services")?.getBoundingClientRect().top < window.innerHeight,
      bodyOverflow: document.body.style.overflow || "(unset)",
      overlayGone: !document.querySelector('nav[aria-label="Mobile"]'),
    }));
    report.mobile.interactive = { menuOpen, clickedLink, afterMenu };

    // form validation: submit empty
    const submitBtn = await page.evaluateHandle(() =>
      Array.from(document.querySelectorAll("button")).find((b) =>
        (b.textContent || "").includes("Send Message")
      )
    );
    await submitBtn.click();
    await new Promise((r) => setTimeout(r, 500));
    const validation = await page.evaluate(() => {
      const t = document.body.innerText;
      return {
        nameError: t.includes("Please enter your name."),
        emailError: t.includes("valid email"),
        messageError: t.includes("Tell me a little"),
      };
    });
    report.mobile.formValidation = validation;
    await page.screenshot({ path: "qa/mobile-form-errors.png" });
  }

  await page.close();
}

await browser.close();
import { writeFileSync } from "node:fs";
writeFileSync("qa/report.json", JSON.stringify(report, null, 2));
for (const [name, r] of Object.entries(report)) {
  if (name === "reducedMotion") continue;
  const failedAnchors = r.anchors.filter((a) => !a.resolved).map((a) => a.href);
  console.log(
    `[${name}] issues=${r.issues.length} anchorsFailed=${JSON.stringify(failedAnchors)} ctas=${JSON.stringify(r.ctas)}`
  );
  for (const i of r.issues) console.log("  !! " + i);
  if (r.interactive) console.log("  interactive: " + JSON.stringify(r.interactive));
  if (r.formValidation) console.log("  formValidation: " + JSON.stringify(r.formValidation));
}
console.log("reducedMotion: " + JSON.stringify(report.reducedMotion));
console.log("external links: " + JSON.stringify(report.desktop.external));
