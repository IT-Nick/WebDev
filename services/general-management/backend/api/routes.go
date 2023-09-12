package api

import (
	"github.com/IT-Nick/WebDev/services/general-management/backend/utils"
	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {
	router := mux.NewRouter()

	// Оборачиваем все обработчики в CORS middleware
	router.Use(utils.CorsMiddleware)

	// Маршруты API для пользователей
	// создает новую заявку на вступление в команду или организацию.
	router.HandleFunc("/api/applications/create", CreateApplicationHandler).Methods("POST")
	// Авторизует пользователя в системе. (Новый)
	router.HandleFunc("/api/users/auth", AuthUserHandler).Methods("POST")

	// Маршруты API для администратора
	// создает новое мероприятие.
	router.HandleFunc("/api/events/create", CreateEventHandler).Methods("POST")
	// Удаляет существующее мероприятие.
	router.HandleFunc("/api/events/delete", DeleteEventHandler).Methods("DELETE")
	// Одобряет заявку на вступление в сборную.
	router.HandleFunc("/api/applications/approve", ApproveApplicationHandler).Methods("PUT")
	// Возвращает список всех заявок на вступление в сборную.
	router.HandleFunc("/api/applications/list", ListApplicationsHandler).Methods("GET")
	// Возвращает список всех мероприятий.
	router.HandleFunc("/api/events/list", ListEventsHandler).Methods("GET")
	// Возвращает список всех одобренных пользователей из таблицы auth. (Новый)
	router.HandleFunc("/api/users/list", ListAuthUsersHandler).Methods("GET")

	return router
}
