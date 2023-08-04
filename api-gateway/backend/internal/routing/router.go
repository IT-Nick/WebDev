package routing

import (
	"github.com/IT-Nick/WebDev/api-gateway/backend/internal/handlers"
	"github.com/IT-Nick/WebDev/api-gateway/backend/internal/middleware"
	"github.com/gorilla/mux"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"net/http"
)

func NewRouter(authHandler *handlers.AuthHandler, gatewayHandler *handlers.GatewayHandler, authMiddleware *middleware.AuthMiddleware, redirectHandler *handlers.RedirectHandler) *mux.Router {
	router := mux.NewRouter()

	// Добавляем обработчик для страницы авторизации
	router.HandleFunc("/form/login", authHandler.LoginForm).Methods("GET", "POST")

	// Добавляем обработчики для аутентификации
	router.HandleFunc("/api/login", authHandler.Login).Methods("POST")
	router.HandleFunc("/api/refresh", authHandler.RefreshToken).Methods("GET")

	// Добавляем обработчик метрик Prometheus
	router.Handle("/metrics", authMiddleware.CheckRole(promhttp.Handler(), "moderator")).Methods("GET")

	// Добавляем роуты, которые требуют авторизации
	router.Handle("/admin/{_:.*}", authMiddleware.CheckRole(http.HandlerFunc(gatewayHandler.ServeHTTP), "admin")).Methods("GET", "POST", "PUT", "DELETE")
	router.Handle("/user/{_:.*}", authMiddleware.CheckAuth(gatewayHandler.ServeHTTP)).Methods("GET", "POST", "PUT", "DELETE")

	// Все остальные запросы перенаправляются на обработчик gateway без проверки авторизации
	router.Handle("/", redirectHandler).Methods("GET", "POST", "PUT", "DELETE")

	return router
}
