# Этап сборки
FROM golang:1.20.6 AS builder

WORKDIR /app
# Копирование кода Go и файлов модулей
COPY go.mod go.sum ./
# Загрузка зависимостей
RUN go mod download
COPY . .
# Сборка приложения
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Этап выполнения
FROM alpine:latest  
RUN apk --no-cache add ca-certificates

WORKDIR /root/
# Копирование бинарного файла из этапа сборки
COPY --from=builder /app/main .
# Запуск приложения
CMD ["./main"] 
