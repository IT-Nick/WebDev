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
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"log"
	"net/http"
)

func main() {
	// Инициализация логера
	utils.InitLogger()

	// Инициализация middleware
	authMiddleware := middleware.NewAuthMiddleware(string(utils.JwtKey))

	// Инициализация обработчиков
	authHandler := handlers.NewAuthHandler()
	gatewayHandler := handlers.NewGatewayHandler(authMiddleware)

	// Инициализация маршрутов
	router := routing.NewRouter(authHandler, gatewayHandler, authMiddleware)

	// Добавляем обработчик метрик Prometheus
	router.Handle("/metrics", promhttp.Handler())

	// Добавляем обработчики для аутентификации
	router.HandleFunc("/login", authHandler.Login).Methods("POST")
	router.HandleFunc("/refresh", authHandler.RefreshToken).Methods("GET")

	// Запуск сервера
	log.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080", router)) // вызывает os.Exit(1), завершая программу
}
