// News Image entry for 23 November 2026 (Node 22, standard library only).
//
// The entry image sits beside this file as entry.png. This program validates
// it and then copies those exact bytes to /output/entry.png, creating the
// output folder first when it is missing. Outside the grader,
// MAKEFUN_OUTPUT_DIR stands in for /output, e.g.:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Deterministic: it only copies fixed bytes, makes no network calls, and
// both runs write the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// First eight bytes of every PNG file.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
// Competition limit: the image must be at most 1 MiB.
const MAX_BYTES = 1_048_576;

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main() {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, "entry.png");

  let bytes;
  try {
    bytes = readFileSync(source);
  } catch (err) {
    fail(`could not read ${source}: ${err.message}`);
  }

  if (bytes.length < PNG_MAGIC.length || !bytes.subarray(0, 8).equals(PNG_MAGIC)) {
    fail("entry.png does not start with the PNG signature");
  }

  if (bytes.length > MAX_BYTES) {
    fail(`entry.png is ${bytes.length} bytes, over the ${MAX_BYTES}-byte limit`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  const destination = join(outDir, "entry.png");
  writeFileSync(destination, bytes);
  console.log(`wrote ${bytes.length} bytes to ${destination}`);
}

main();
