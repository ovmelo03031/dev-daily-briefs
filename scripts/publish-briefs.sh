#!/usr/bin/env bash
# Publish pending daily briefs: validate, commit each file individually, push once.
# Run by the `brief-publisher` scheduled task after all brief routines finish.
# Usage: ./scripts/publish-briefs.sh [--dry-run]
#
# This file is intentionally immutable (chflags uchg). To edit it:
#   chflags nouchg scripts/publish-briefs.sh
#   (edit)
#   chflags uchg scripts/publish-briefs.sh
set -euo pipefail

DRY_RUN=0
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=1

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

CATEGORIES="ai-coding|ai-security|ai-toolbox|backend-fullstack|dev-news|gentleman-releases"
TODAY="$(date +%Y-%m-%d)"

log() { printf '[publish-briefs] %s\n' "$*"; }
fail() { log "ERROR: $*"; exit 1; }

branch="$(git rev-parse --abbrev-ref HEAD)"
[[ "$branch" == "main" ]] || fail "current branch is '$branch', expected 'main'. Nothing published."

# Candidate files: new, untracked or modified brief JSONs (staged or not). Deletions are ignored.
candidates=()
while IFS= read -r line; do
  status="${line:0:2}"
  path="${line:3}"
  [[ "$status" == *D* ]] && continue
  [[ "$path" =~ ^src/content/($CATEGORIES)/[^/]+\.json$ ]] || continue
  candidates+=("$path")
done < <(git status --porcelain --untracked-files=all -- src/content/)

if [[ ${#candidates[@]} -eq 0 ]]; then
  log "no pending briefs. Nothing to publish."
  exit 0
fi

commit_message() {
  local path="$1" category file date
  category="$(basename "$(dirname "$path")")"
  file="$(basename "$path" .json)"
  if [[ "$category" == "ai-toolbox" ]]; then
    echo "chore(ai-toolbox): update $TODAY"
    return
  fi
  date="${file#"$category"-}"
  [[ "$date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || date="$TODAY"
  echo "brief($category): $date"
}

committed=0
skipped=()
for path in "${candidates[@]}"; do
  if ! jq empty "$path" 2>/dev/null; then
    skipped+=("$path (invalid JSON)")
    continue
  fi
  if rg -q '\p{Cyrillic}' "$path"; then
    skipped+=("$path (contains Cyrillic characters)")
    continue
  fi
  msg="$(commit_message "$path")"
  if [[ $DRY_RUN -eq 1 ]]; then
    log "would commit: $path -> $msg"
    continue
  fi
  git add -- "$path"
  git commit --quiet -m "$msg" -- "$path"
  log "committed: $path -> $msg"
  committed=$((committed + 1))
done

for s in "${skipped[@]+"${skipped[@]}"}"; do log "skipped: $s"; done

if [[ $DRY_RUN -eq 1 ]]; then
  log "dry run complete. Nothing committed or pushed."
  exit 0
fi

git fetch --quiet origin main
ahead="$(git rev-list --count origin/main..HEAD)"
behind="$(git rev-list --count HEAD..origin/main)"
if [[ "$ahead" -eq 0 ]]; then
  log "nothing to push (committed=$committed)."
  exit 0
fi
if [[ "$behind" -gt 0 ]]; then
  log "local main is $behind behind origin/main, rebasing $ahead commit(s)."
  if ! git pull --quiet --rebase --autostash origin main; then
    git rebase --abort 2>/dev/null || true
    fail "rebase onto origin/main failed. Local commits kept; resolve manually."
  fi
fi

rm -rf dist
if git push origin main; then
  log "pushed $ahead commit(s) to origin/main (committed this run: $committed)."
  exit 0
fi

# A push can report failure after the commits already landed (pre-push hook races).
git fetch --quiet origin main
if git merge-base --is-ancestor HEAD origin/main; then
  log "push reported failure but HEAD is already on origin/main. Published."
  exit 0
fi
fail "push failed. Local commits kept for the next run."
