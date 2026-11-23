#!/bin/bash
# Deploy mindforward.dk (Vercel project mindforward-site) from a clean copy of HEAD.
# /priser stays on the approved version from commit 5226cb5 (the new /priser is not approved live).
set -euo pipefail
REPO="$HOME/Downloads/mindforward-brain/hjemmeside"
D="$(mktemp -d)"
trap 'rm -rf "$D"' EXIT
cd "$REPO"
git archive HEAD | tar -x -C "$D"
git show 5226cb5:src/app/priser/page.tsx > "$D/src/app/priser/page.tsx"
cp -r .vercel "$D/"
cd "$D"
vercel deploy --prod --yes 2>&1 | grep -E "Production:|Error" | tail -1
