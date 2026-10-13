#!/usr/bin/env node
// The djs command. Runs dist/djs.js in a child Node with the stack the frontend needs (`--stack-size=7600`: its
// analysis recurses deeper than Node's default allows), passing the arguments, the standard streams and the exit
// status through. dist/djs.js acts only as the process entry, so it is run, not imported.
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const entry = fileURLToPath(new URL("../dist/djs.js", import.meta.url));
const run = spawnSync(process.execPath, ["--stack-size=7600", entry, ...process.argv.slice(2)], { stdio: "inherit" });
process.exitCode = run.status ?? 1;
