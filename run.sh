#!/usr/bin/env bash
# run.sh — wrapper for test-openai and full compress-and-run pipeline

# If you pass "test-openai", just run the connectivity check
if [[ "$1" == "test-openai" ]]; then
  shift
  bash mysite/codex.sh test-openai "$@"
  exit $?
fi

# Otherwise, fire up MCP → Codex compress-and-run → teardown
mcp-filesystem-server --port 6060 --root "$(pwd)" &
MCP_PID=$!

bash mysite/codex.sh compress-and-run
RC=$?

kill "$MCP_PID"

if [ $RC -eq 0 ]; then
  echo "✅ Codex pipeline completed successfully"
else
  echo "❌ Codex pipeline failed (exit $RC)"
fi

exit $RC