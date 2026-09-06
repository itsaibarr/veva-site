#!/bin/bash
# Screenshots the public landing page of each product at 1280x800 into assets/src/.
# Uses the gstack browse binary. Re-run any time; halftone.py turns them into plates.
set -e
B=$(bash "$(dirname "$0")/../../.claude/skills/gstack/browse/bin/find-browse" 2>/dev/null || echo /Users/itsaibarr/.codex/skills/gstack/browse/dist/browse)
cd "$(dirname "$0")/../assets/src"
$B viewport 1280x800
while read -r name url; do
  $B goto "$url" || { echo "skip $name"; continue; }
  $B wait --networkidle || true
  $B screenshot --viewport "$name.png"
done <<LIST
resona https://resona.work
klip https://klip.website
hackathon-ops https://hackathon-ops.vercel.app
scout https://www.tryscout.study
strata https://strata-delta.vercel.app
LIST
ls -la
