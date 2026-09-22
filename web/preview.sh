#!/usr/bin/env bash
# Production preview: builds the static export and serves it exactly as the
# shared host will — out/ at the web root with the PHP side beside it.
set -e
cd "$(dirname "$0")"
PORT="${1:-8080}"

npm run build

DIR=.preview
rm -rf "$DIR"
cp -r out "$DIR"
for d in api config data uploads; do ln -s "../../$d" "$DIR/$d"; done

echo
echo "  Preview ready →  http://localhost:$PORT"
echo
php -S "localhost:$PORT" -t "$DIR"
