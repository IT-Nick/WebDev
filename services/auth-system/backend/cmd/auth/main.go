/*
main.go включает в себя:

Загрузку конфигурации.
Подключение к базе данных.
Инициализацию сервисов, которые включают бизнес-логику приложения.
Инициализацию обработчиков HTTP-запросов.
Настройку маршрутов для обработки различных эндпоинтов API.
Запуск сервера.
Комментарии в коде подробно описывают каждый из этих этапов.
*/
package main

import (
	"github.com/IT-Nick/WebDev/services/auth-system/backend/api"
	"github.com/IT-Nick/WebDev/services/auth-system/backend/handlers"
	"github.com/IT-Nick/WebDev/services/auth-system/backend/database"
	"github.com/IT-Nick/WebDev/services/auth-system/backend/services"
	"log"
	"net/http"
)

func main() {
	// Инициализация конфигурации
	config, err := api.LoadConfig()
	if err != nil {
		log.Fatalf("Ошибка загрузки конфигурации: %v", err)
	}

	// Подключение к базе данных
	db, err := database.Connect(config.Database)
	if err != nil {
		log.Fatalf("Ошибка подключения к базе данных: %v", err)
	}
	defer db.Close()

	// Инициализация сервисов
	userService := services.NewUserService(db)
	authService := services.NewAuthService(db, config.Security)

	// Инициализация обработчиков
	authHandler := handlers.NewAuthHandler(authService)
	userHandler := handlers.NewUserHandler(userService)

	// Настройка маршрутов
	http.HandleFunc("/signin", authHandler.SignIn)
	http.HandleFunc("/signup", userHandler.SignUp)
	http.HandleFunc("/refresh", authHandler.RefreshToken)

	// Запуск сервера
	log.Printf("Сервер запущен на порту %s", config.Server.Port)
	log.Fatal(http.ListenAndServe(":"+config.Server.Port, nil))
}