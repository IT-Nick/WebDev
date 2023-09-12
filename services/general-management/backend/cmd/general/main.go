package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/IT-Nick/WebDev/services/general-management/backend/api"
	"github.com/IT-Nick/WebDev/services/general-management/backend/database"
)

func main() {
	// Инициализация соединения с базой данных
	database.Connect()
	defer database.Close()

	// Инициализация HTTP маршрутов
	router := api.NewRouter()

	// Запуск HTTP сервера
	fmt.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", router))
}
