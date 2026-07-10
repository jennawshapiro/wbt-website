#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# sync-to-drive.sh — mirror the local working tree to the Google Drive copy
# ---------------------------------------------------------------------------
# The project's day-to-day home is this fast local git clone (~/Projects/
# wbt-website). The Google-Drive-synced folder is kept as a *shared mirror*
# (so Jenna & co. can see current files, and as a backup) — but it is NO LONGER
# the working/deploy copy (Google Drive's virtual filesystem is too slow for
# git/deploys).
#
# This script pushes the current site content into that Drive folder so it stays
# current. It runs automatically after every `git push` via the .githooks/
# pre-push hook (in the background, so it never slows your push down), and you
# can also run it by hand any time:  ./sync-to-drive.sh
#
# Safe by default: it never DELETES anything from Drive (pure overlay), so
# design-source files kept only in Drive (e.g. *.psd) are never touched.
# Pass --mirror for an exact mirror that also removes stale files (design
# sources are still protected).
# ---------------------------------------------------------------------------
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Where the Google Drive copy lives on this machine. Override with WBT_DRIVE_DIR.
DRIVE_DIR="${WBT_DRIVE_DIR:-/Users/deroyperaza/Library/CloudStorage/GoogleDrive-deroy@hyperakt.com/Shared drives/Brand & Marketing/HKT AI/WBT Website}"

if [ ! -d "$DRIVE_DIR" ]; then
  echo "sync-to-drive: Drive folder not found — skipping."
  echo "  (looked for: $DRIVE_DIR ; set WBT_DRIVE_DIR to override)"
  exit 0
fi

# Never mirror local tooling / VCS internals into Drive:
#   .git      — Drive must not become a second git repo
#   .claude   — local Claude Code tooling & machine-specific settings
#   node_modules / .netlify / OS cruft
EXCLUDES=(
  --exclude '.git/'
  --exclude '.claude/'
  --exclude 'node_modules/'
  --exclude '.netlify/'
  --exclude '.DS_Store'
  --exclude 'Thumbs.db'
  --exclude '*.swp'
)

DELETE=()
if [ "${1:-}" = "--mirror" ]; then
  # exact mirror, but keep any design-source files that live only in Drive
  DELETE=( --delete --exclude '*.psd' --exclude '*.ai' --exclude '*.sketch' --exclude '*.fig' )
  echo "sync-to-drive: EXACT MIRROR (will remove stale files; design sources kept)"
fi

echo "sync-to-drive: $REPO_DIR"
echo "           ->  $DRIVE_DIR"
rsync -a "${EXCLUDES[@]}" "${DELETE[@]}" "$REPO_DIR"/ "$DRIVE_DIR"/
echo "sync-to-drive: done ✓"
