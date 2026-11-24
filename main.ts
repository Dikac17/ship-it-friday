import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "fix: deleted the tests so Friday can't fail. If prod breaks, it was the intern's merge, not mine.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, TEXT, "utf8");

// Gate validation + read-back verification: the entry must be UTF-8 text of
// 1 to 159 characters, a single non-blank line, and the bytes on disk must
// match the text exactly. Fail loudly on any violation.
const readBack = readFileSync(outFile, "utf8");
if (readBack !== TEXT) throw new Error("read-back mismatch: entry.txt differs from TEXT");
if (readBack.length < 1 || readBack.length > 159) throw new Error(`entry length ${readBack.length} outside 1..159`);
if (readBack.trim().length === 0) throw new Error("entry is blank");
if (readBack.includes("\n")) throw new Error("entry must be a single line");
