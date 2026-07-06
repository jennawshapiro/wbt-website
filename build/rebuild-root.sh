#!/bin/bash
# Rebuild every root page from its scratchpad body, preserving the existing
# <title>/<meta description> and re-detecting the content.js flag.
set -e
SC="$(dirname "$0")"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

for body in "$SC"/bodies/*.html; do
  page=$(basename "$body")
  cur="$ROOT/$page"
  [ -f "$cur" ] || { echo "skip (no current): $page"; continue; }
  title=$(grep -oE '<title>[^<]*</title>' "$cur" | head -1 | sed 's/<[^>]*>//g')
  desc=$(grep -oE '<meta name="description" content="[^"]*"' "$cur" | head -1 | sed 's/.*content="//; s/"$//')
  extra=""
  grep -q 'js/content.js' "$cur" && extra="content"
  bash "$SC/mkpage.sh" "$page" "$title" "$desc" "$body" "$extra"
done
echo "all root pages rebuilt"
