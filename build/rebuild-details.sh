#!/bin/bash
# Rebuild every case study + article from its gen2 body, preserving the
# existing <title> and <meta description> from the currently-built page.
set -e
SC="$(dirname "$0")"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DB="$SC/detail-bodies"

ARTICLES=" emotional-intelligence-and-leadership in-service-of-the-group-the-facilitators-role dont-skip-the-convo-about-feelings-at-your-next-team-retreat "

for body in "$DB"/*.html; do
  slug=$(basename "$body" .html)
  case "$ARTICLES" in *" $slug "*) dir="insights";; *) dir="case-studies";; esac
  cur="$ROOT/$dir/$slug.html"
  if [ -f "$cur" ]; then
    title=$(grep -oE '<title>[^<]*</title>' "$cur" | head -1 | sed 's/<[^>]*>//g')
    desc=$(grep -oE '<meta name="description" content="[^"]*"' "$cur" | head -1 | sed 's/.*content="//; s/"$//')
  else
    title="$slug — WBT"; desc=""
  fi
  bash "$SC/mkdetail.sh" "$dir/$slug.html" "$title" "$desc" "$body"
done
echo "all detail pages rebuilt"
