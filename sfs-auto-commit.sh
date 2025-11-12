
#!/bin/bash
set -euo pipefail

echo "🚀 SFS Auto-Commit Starting..."

# Check if we're in a git repo
if [ ! -d .git ]; then
  echo "❌ Not in a git repository"
  exit 1
fi

# Stage all changes
git add -A
echo "✅ Staged all files"

# Generate commit message based on changed files
CHANGED_FILES=$(git diff --cached --name-only | head -5 | tr '\n' ', ' | sed 's/,$//')
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')

if [ -z "$CHANGED_FILES" ]; then
  echo "ℹ️  No changes to commit"
  exit 0
fi

# Create smart commit message
COMMIT_MSG="feat: Updated $CHANGED_FILES - $TIMESTAMP"

# Commit
git commit -m "$COMMIT_MSG"
echo "✅ Committed: $COMMIT_MSG"

# Pull latest (rebase to avoid merge commits)
echo "⬇️  Pulling latest changes..."
git pull --rebase origin $(git branch --show-current) || {
  echo "⚠️  Pull had conflicts, attempting to resolve..."
  git rebase --abort 2>/dev/null || true
  git pull origin $(git branch --show-current)
}

# Push
echo "⬆️  Pushing to GitHub..."
git push origin $(git branch --show-current)

echo "🎉 Done! All changes synced to GitHub"
