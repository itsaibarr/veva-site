#!/bin/bash
# Screenshots the public landing page of each product at 1280x800 into assets/src/.
# Needs the gstack browse binary (BROWSE=/path/to/browse to override).
set -e
B=${BROWSE:-$(bash "$(dirname "$0")/../../.claude/skills/gstack/browse/bin/find-browse" 2>/dev/null || true)}
B=${B:-$HOME/.codex/skills/gstack/browse/dist/browse}
[ -x "$B" ] || { echo "gstack browse binary not found; set BROWSE=/path/to/browse" >&2; exit 1; }
cd "$(dirname "$0")/../assets/src"
$B viewport 1280x800 </dev/null
node --input-type=module -e "import {CONTENT} from '../../content.mjs'; for (const c of CONTENT.en.work.items) if (c.image) console.log(c.image, c.proof.href)" |
while read -r name url; do
  $B goto "$url" </dev/null || { echo "skip $name"; continue; }
  $B wait --networkidle </dev/null || true
  $B screenshot --viewport "$name.png" </dev/null
done
ls -la
