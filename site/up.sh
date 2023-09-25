source ~/.bash_aliases
pnpm build && sam_tellme "Uploading" && wrangler pages deploy public/ && sam_tellme "App is online!"

