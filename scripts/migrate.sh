#!/bin/bash
# Migration script: Import existing briefs into Astro content collections
# Run once from the Blog project root

# Load paths from .env (create .env from .env.example if missing)
if [ -f .env ]; then
  source .env
else
  echo "ERROR: .env file not found. Copy .env.example to .env and set your paths."
  exit 1
fi

# Validate required env vars
if [ -z "$BLOG_DIR" ] || [ -z "$DEVNEWS_DIR" ] || [ -z "$AI_DIR" ]; then
  echo "ERROR: BLOG_DIR, DEVNEWS_DIR, and AI_DIR must be set in .env"
  exit 1
fi

echo "=== Migrating existing briefs ==="

# 1. Backend Fullstack briefs (already markdown, just need frontmatter)
echo ""
echo "--- Backend Fullstack ---"
for file in "$DEVNEWS_DIR"/backend-fullstack-*.md; do
  [ -f "$file" ] || continue
  filename=$(basename "$file")
  # Extract date from filename: backend-fullstack-YYYY-MM-DD.md
  date=$(echo "$filename" | sed 's/backend-fullstack-\(.*\)\.md/\1/')
  target="$BLOG_DIR/src/content/backend-fullstack/$filename"

  if [ -f "$target" ]; then
    echo "  SKIP $filename (already exists)"
    continue
  fi

  # Extract first heading as title
  title=$(head -5 "$file" | grep '^# ' | head -1 | sed 's/^# //')
  if [ -z "$title" ]; then
    title="Backend & Fullstack Daily — $date"
  fi

  # Create file with frontmatter + original content
  {
    echo "---"
    echo "title: \"$title\""
    echo "description: \"Daily backend and fullstack news digest for senior developers\""
    echo "pubDate: \"$date\""
    echo "category: \"backend-fullstack\""
    echo "---"
    echo ""
    cat "$file"
  } > "$target"
  echo "  OK $filename -> $target"
done

# 2. Dev News briefs (already markdown, just need frontmatter)
echo ""
echo "--- Dev News ---"
for file in "$DEVNEWS_DIR"/dev-news-*.md; do
  [ -f "$file" ] || continue
  filename=$(basename "$file")
  date=$(echo "$filename" | sed 's/dev-news-\(.*\)\.md/\1/')
  target="$BLOG_DIR/src/content/dev-news/$filename"

  if [ -f "$target" ]; then
    echo "  SKIP $filename (already exists)"
    continue
  fi

  title=$(head -5 "$file" | grep '^# ' | head -1 | sed 's/^# //')
  if [ -z "$title" ]; then
    title="Dev News Daily — $date"
  fi

  {
    echo "---"
    echo "title: \"$title\""
    echo "description: \"Daily developer news digest — frontend, TypeScript, React, and web platform\""
    echo "pubDate: \"$date\""
    echo "category: \"dev-news\""
    echo "---"
    echo ""
    cat "$file"
  } > "$target"
  echo "  OK $filename -> $target"
done

# 3. AI Coding briefs (HTML -> extract useful info as markdown)
echo ""
echo "--- AI Coding (HTML -> MD) ---"
for file in "$AI_DIR"/*.html; do
  [ -f "$file" ] || continue
  filename=$(basename "$file" .html)

  # Try to extract date from filename patterns:
  # ai-coding-daily-brief-YYYY-MM-DD.html
  # ai-coding-brief-YYYY-MM-DD.html
  # daily-briefing-YYYY-MM-DD.html
  # daily-brief-YYYY-MM-DD.html
  date=$(echo "$filename" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}')
  if [ -z "$date" ]; then
    echo "  SKIP $filename (no date found)"
    continue
  fi

  mdname="ai-coding-$date.md"
  target="$BLOG_DIR/src/content/ai-coding/$mdname"

  if [ -f "$target" ]; then
    echo "  SKIP $mdname (already exists)"
    continue
  fi

  # Extract title from <title> tag
  title=$(grep -o '<title>[^<]*</title>' "$file" | sed 's/<title>//;s/<\/title>//' | head -1)
  if [ -z "$title" ]; then
    title="AI Coding Tools — Daily Brief | $date"
  fi

  # For HTML files, we'll create a markdown wrapper that embeds the original HTML
  # The actual HTML content is too complex to convert cleanly, but we can extract text
  # We'll use a simple approach: strip tags and keep the structure
  {
    echo "---"
    echo "title: \"$title\""
    echo "description: \"Daily digest of AI coding tools and model launches\""
    echo "pubDate: \"$date\""
    echo "category: \"ai-coding\""
    echo "---"
    echo ""
    echo "# $title"
    echo ""
    echo "> This brief was originally generated as an HTML report. View the [original HTML file](/ai-originals/$filename.html) for the full styled version."
    echo ""
    # Extract text content between tags, keeping some structure
    sed -n '/<body/,/<\/body>/p' "$file" \
      | sed 's/<h1[^>]*>/\n# /g; s/<h2[^>]*>/\n## /g; s/<h3[^>]*>/\n### /g' \
      | sed 's/<\/h[1-6]>//g' \
      | sed 's/<p[^>]*>/\n/g; s/<\/p>//g' \
      | sed 's/<br[^>]*>/\n/g' \
      | sed 's/<li[^>]*>/\n- /g; s/<\/li>//g' \
      | sed 's/<a href="\([^"]*\)"[^>]*>\([^<]*\)<\/a>/[\2](\1)/g' \
      | sed 's/<strong>\([^<]*\)<\/strong>/**\1**/g' \
      | sed 's/<em>\([^<]*\)<\/em>/*\1*/g' \
      | sed 's/<code>\([^<]*\)<\/code>/`\1`/g' \
      | sed 's/<[^>]*>//g' \
      | sed '/^[[:space:]]*$/d' \
      | head -500
  } > "$target"
  echo "  OK $filename.html -> $mdname"
done

echo ""
echo "=== Migration complete ==="
echo "Files created:"
echo "  ai-coding:          $(ls "$BLOG_DIR/src/content/ai-coding/"*.md 2>/dev/null | wc -l | tr -d ' ')"
echo "  backend-fullstack:  $(ls "$BLOG_DIR/src/content/backend-fullstack/"*.md 2>/dev/null | wc -l | tr -d ' ')"
echo "  dev-news:           $(ls "$BLOG_DIR/src/content/dev-news/"*.md 2>/dev/null | wc -l | tr -d ' ')"
