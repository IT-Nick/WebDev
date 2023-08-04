// main является точкой входа в приложение API Gateway.
// Он инициализирует логгер, сервис ошибок, обработчики, middleware и маршруты,
// и затем запускает сервер на порту 8080.
// Если сервер не удается запустить, он обрабатывает ошибку с помощью сервиса ошибок.
package main

import (
	"github.com/IT-Nick/WebDev/api-gateway/backend/internal/handlers"
	"github.com/IT-Nick/WebDev/api-gateway/backend/internal/middleware"
	"github.com/IT-Nick/WebDev/api-gateway/backend/internal/routing"
	"github.com/IT-Nick/WebDev/api-gateway/backend/internal/utils"
	"github.com/IT-Nick/WebDev/api-gateway/backend/pkg/auth"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
)

func main() {
	// Загрузка переменных окружения из файла .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Инициализация логера
	utils.InitLogger()

	// Инициализация JWT сервиса
	jwtService := auth.NewJWTService(os.Getenv("SECRET_KEY"))

	// Инициализация middleware
	authMiddleware := middleware.NewAuthMiddleware(jwtService)

	// Инициализация обработчиков
	authHandler := handlers.NewAuthHandler(jwtService)
	gatewayHandler := handlers.NewGatewayHandler(authMiddleware)
	redirectHandler := handlers.NewRedirectHandler()

	// Инициализация маршрутов
	router := routing.NewRouter(authHandler, gatewayHandler, authMiddleware, redirectHandler)

	// Запуск сервера
	serverPort := os.Getenv("SERVER_PORT")
	if serverPort == "" {
		serverPort = "8080"
	}
	log.Printf("Starting server on :%s", serverPort)
	log.Fatal(http.ListenAndServe(":"+serverPort, router))
}
