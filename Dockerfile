FROM oven/bun:1 AS build

WORKDIR /app

COPY package.json bun.lock ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
COPY packages/shared/package.json ./packages/shared/

RUN bun install --frozen-lockfile

COPY . .

RUN bun run --cwd frontend build && \
    rm -rf backend/public && \
    cp -r frontend/dist backend/public

FROM oven/bun:1-slim AS runtime

WORKDIR /app

COPY --from=build /app/backend ./backend
COPY --from=build /app/packages ./packages
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 8000

CMD ["bun", "run", "--cwd", "backend", "start"]
