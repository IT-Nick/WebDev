# Устанавливаем зависимости только тогда, когда это нужно
FROM node:20.5.0-alpine3.18 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Копируем исходный код и устанавливаем зависимости
FROM node:20.5.0-alpine3.18
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
