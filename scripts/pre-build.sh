#!/bin/bash


echo "VERCEL_GIT_COMMIT_MESSAGE: $VERCEL_GIT_COMMIT_MESSAGE"
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[  "$VERCEL_GIT_COMMIT_REF" == "renovate"*  ]]; then
  # Don't build
  echo "🛑 - Build skipped. All \`renovate\` will not be deployed."
  echo "Check scripts/pre-build.sh for more info."
  exit 0;
elif [[ "$VERCEL_GIT_COMMIT_MESSAGE" == *"[skip ci]"* ]] ; then
  # Don't build
  echo "🛑 - Build skipped due to \`[skip ci]\` in commit message."
  echo "Check scripts/pre-build.sh for more info."
  exit 0;
else
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1;
fi
