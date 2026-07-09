#!/bin/bash
# Assemble a detail page (one level deep): mkdetail.sh OUT "TITLE" "DESC" BODY_FILE
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PARTS="$(dirname "$0")/parts"
OUT="$ROOT/$1"; TITLE="$2"; DESC="$3"; BODY="$4"
SITE_URL="https://www.workbettertogether.coach"
SLUG="${1%.html}"
CANONICAL="$SITE_URL/$SLUG"
OG_IMAGE="$SITE_URL/assets/site/og-share-image.png"
{
cat <<HEAD
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${TITLE}</title>
  <meta name="description" content="${DESC}">
  <link rel="canonical" href="${CANONICAL}">
  <meta property="og:site_name" content="Work Better Together">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${TITLE}">
  <meta property="og:description" content="${DESC}">
  <meta property="og:url" content="${CANONICAL}">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${TITLE}">
  <meta name="twitter:description" content="${DESC}">
  <meta name="twitter:image" content="${OG_IMAGE}">
  <link rel="icon" type="image/svg+xml" href="../assets/Logos/WBT-20260505-Favicon-Intentional-Blue.svg">
  <link rel="apple-touch-icon" href="../assets/Logos/apple-touch-icon.png">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to main content</a>

HEAD
cat "$PARTS/header-sub.html"
echo ""
echo "  <main id=\"main\">"
cat "$BODY"
echo "  </main>"
echo ""
cat "$PARTS/footer-sub.html"
echo ""
echo '  <script src="../js/rough-notation.js"></script>'
echo '  <script src="../js/site.js"></script>'
echo "</body>"
echo "</html>"
} > "$OUT"
echo "built: $1"
