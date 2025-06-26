#!/bin/bash

VARS=(
  'NEXT_PUBLIC_STATUS' 
  'NEXT_PUBLIC_BSC_NET_ID' 
  'NEXT_PUBLIC_BSC_CHAIN_NAME' 
  'NEXT_PUBLIC_BSC_CHAIN_SYMBOL'
  'NEXT_PUBLIC_BSC_BLOCK_EXPLORER_URLS'
  'NEXT_PUBLIC_BACKEND_HOST'
  'NEXT_PUBLIC_INFURA_ID'
)

files="$(grep -rli REPLACE_ME_WITH_ /app/.next)"
for var in "${VARS[@]}"; do
  echo "Check that we have ${var} defined"
  test -n "${!var}" && \
    echo "$files" | \
      xargs sed -i "s#REPLACE_ME_WITH_${var}#${!var}#g"
done

echo "Starting Nextjs"
exec "$@"
