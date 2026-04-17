#!/usr/bin/env bash
# Delete brief files (.md/.mdx) older than 30 days based on the date
# embedded in their filename (format: {category}-{YYYY-MM-DD}.{md|mdx}).
#
# Safe to run locally or in CI. Does NOT commit — caller handles git.
#
# Usage:
#   ./scripts/cleanup-old-briefs.sh [--days N] [--dry-run]

set -euo pipefail

DAYS=30
DRY_RUN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --days) DAYS="$2"; shift 2 ;;
    --dry-run) DRY_RUN=1; shift ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

# Calculate cutoff date — works on BSD (macOS) and GNU (Linux) date
if date -v-"${DAYS}"d +%Y-%m-%d >/dev/null 2>&1; then
  cutoff=$(date -v-"${DAYS}"d +%Y-%m-%d)
else
  cutoff=$(date -d "${DAYS} days ago" +%Y-%m-%d)
fi

echo "Removing briefs with filename date < ${cutoff} (older than ${DAYS} days)"
if [[ $DRY_RUN -eq 1 ]]; then echo "DRY RUN — no files will be deleted"; fi

deleted=0
shopt -s nullglob
for dir in src/content/ai-coding src/content/backend-fullstack src/content/dev-news; do
  [[ -d "$dir" ]] || continue
  for file in "$dir"/*.md "$dir"/*.mdx; do
    filename="${file##*/}"
    name_no_ext="${filename%.*}"
    # Extract last 10 chars — expected to be YYYY-MM-DD
    date_part="${name_no_ext: -10}"

    if [[ "$date_part" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] && [[ "$date_part" < "$cutoff" ]]; then
      echo "  [DELETE] $file (date: $date_part)"
      if [[ $DRY_RUN -eq 0 ]]; then
        rm "$file"
      fi
      deleted=$((deleted + 1))
    fi
  done
done

echo "Total ${DRY_RUN:+would-be-}deleted: ${deleted}"
