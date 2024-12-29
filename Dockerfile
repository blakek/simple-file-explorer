FROM docker.io/oven/bun:alpine

# Install dependencies
COPY . .
RUN bun install --frozen-lockfile

# Next.js build
RUN bun run build

# Default environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV FS_ROOT=/app

# Start the app, expecting FS_ROOT to be set
CMD ["bun", "run", "start"]

# Example test command to build and run the container locally:
# podman build -t simple-file-explorer . && podman run -e FS_ROOT="/app" -p 9000:3000 --detach -v $HOME/Desktop/backup-dump/exports/:/app:ro simple-file-explorer
