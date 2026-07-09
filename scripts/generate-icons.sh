#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC="$ROOT/public"
SRC="$PUBLIC/qdigital99_logo.png"
MARK="/tmp/qd-mark.png"

if ! command -v convert >/dev/null 2>&1; then
  echo "ImageMagick (convert) is required to generate icons." >&2
  exit 1
fi

mkdir -p "$PUBLIC/icons"

convert "$SRC" -trim +repage -resize 256x256 -background none -gravity center -extent 256x256 "$MARK"
convert "$MARK" -define icon:auto-resize=16,32,48,64 "$PUBLIC/favicon.ico"
convert "$MARK" -resize 16x16 -background none "$PUBLIC/icons/favicon-16x16.png"
convert "$MARK" -resize 32x32 -background none "$PUBLIC/icons/favicon-32x32.png"
convert "$MARK" -resize 48x48 -background none "$PUBLIC/icons/favicon-48x48.png"
convert "$SRC" -trim +repage -resize 180x180 -background none -gravity center -extent 180x180 "$PUBLIC/apple-touch-icon.png"
convert "$MARK" -resize 192x192 -background none -gravity center -extent 192x192 "$PUBLIC/icons/icon-192.png"
convert "$MARK" -resize 512x512 -background none -gravity center -extent 512x512 "$PUBLIC/icons/icon-512.png"
convert -size 1200x630 xc:'#000000' \( "$SRC" -trim +repage -resize 520x520 -background none \) -gravity center -composite "$PUBLIC/og-image.png"

echo "Generated production PNG icons in $PUBLIC"
