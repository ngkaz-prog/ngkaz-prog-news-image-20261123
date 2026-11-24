// News Image entry for 23 November 2026 (Node 22, standard library only).
//
// The entry image sits beside this file as entry.png. This program copies
// those exact bytes to /output/entry.png, creating the output folder first
// when it is missing. Outside the grader, MAKEFUN_OUTPUT_DIR stands in for
// /output, e.g.:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const bytes = readFileSync(source);
writeFileSync(join(outDir, "entry.png"), bytes);
console.log(`wrote ${bytes.length} bytes to ${join(outDir, "entry.png")}`);
