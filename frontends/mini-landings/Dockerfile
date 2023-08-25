# Устанавливаем зависимости только тогда, когда это нужно
FROM node:20.5.0-alpine3.18 AS deps
WORKDIR /app
RUN npm install -g npm@9.8.1  # Обновление npm
COPY package*.json ./
RUN npm ci --only=production

# Перестраиваем исходный код только тогда, когда это нужно
FROM node:20.5.0-alpine3.18 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Продакшен образ, копируем все файлы и запускаем next
FROM node:20.5.0-alpine3.18 AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "start"]
