#!/bin/bash
# Assemble a root-level page: mkpage.sh OUT_PATH "TITLE" "DESCRIPTION" BODY_FILE [extra_scripts]
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PARTS="$(dirname "$0")/parts"
OUT="$ROOT/$1"; TITLE="$2"; DESC="$3"; BODY="$4"; EXTRA="$5"

{
cat <<HEAD
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${TITLE}</title>
  <meta name="description" content="${DESC}">
  <link rel="icon" type="image/svg+xml" href="assets/Logos/WBT-20260505-Favicon-Intentional-Blue.svg">
  <link rel="apple-touch-icon" href="assets/Logos/apple-touch-icon.png">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

HEAD
cat "$PARTS/header.html"
echo ""
echo "  <main>"
cat "$BODY"
echo "  </main>"
echo ""
cat "$PARTS/footer.html"
echo ""
if [ "$EXTRA" = "content" ]; then echo '  <script src="js/content.js"></script>'; fi
echo '  <script src="js/rough-notation.js"></script>'
echo '  <script src="js/site.js"></script>'
echo "</body>"
echo "</html>"
} > "$OUT"
echo "built: $1"
