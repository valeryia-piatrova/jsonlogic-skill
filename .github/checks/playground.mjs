// Runs the playground's own engine setup (taken from assets/playground.html, so it
// can't drift) against the bundled tests in references/tests/.
import fs from "node:fs";
import path from "node:path";

const html = fs.readFileSync("assets/playground.html", "utf8");
const module = html.match(/<script type="module">([\s\S]*?)\(function\(\)\{/);
if (!module) throw new Error("assets/playground.html: no <script type=\"module\"> engine setup found");
const setup = module[1]
  .replace(/"https:\/\/cdn\.jsdelivr\.net\/npm\/json-logic-engine@[^"]+"/, '"json-logic-engine"');
const enginePath = path.resolve(".github/checks/_engine.mjs");
fs.writeFileSync(enginePath, setup + "\nexport { apply };\n");
const { apply } = await import(enginePath);
fs.rmSync(enginePath);

function run(cases) {
  let passed = 0, total = 0;
  for (const c of cases) {
    if (typeof c === "string") continue; // section comments
    const [rule, data, expected] = Array.isArray(c) ? c : [c.rule, c.data, c.result];
    const wantsError = !Array.isArray(c) && "error" in c;
    total++;
    try {
      const got = apply(rule, data);
      if (!wantsError && JSON.stringify(got) === JSON.stringify(expected)) passed++;
    } catch {
      if (wantsError) passed++;
    }
  }
  return [passed, total];
}

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(path.join(dir, e.name)) : e.name.endsWith(".json") && e.name !== "index.json" ? [path.join(dir, e.name)] : []);
}

const [corePassed, coreTotal] = run(JSON.parse(fs.readFileSync("references/tests/core.json", "utf8")));
let communityPassed = 0, communityTotal = 0;
for (const f of files("references/tests/community")) {
  const [p, t] = run(JSON.parse(fs.readFileSync(f, "utf8")));
  communityPassed += p;
  communityTotal += t;
}

// ponytail: count threshold, not a per-case list. The 13 known misses are json-logic-engine's own
// edge cases (array ops on null, empty and/or, substr on a number). Raise this when the engine fixes them.
const COMMUNITY_MIN = 1125;

console.log(`core ${corePassed}/${coreTotal}, community ${communityPassed}/${communityTotal} (min ${COMMUNITY_MIN})`);
if (corePassed !== coreTotal || communityPassed < COMMUNITY_MIN) process.exit(1);
