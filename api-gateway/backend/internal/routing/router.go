package routing

import (
	"github.com/IT-Nick/WebDev/api-gateway/backend/internal/middleware"
	"github.com/IT-Nick/WebDev/api-gateway/backend/internal/handlers"
	"github.com/gorilla/mux"
	"net/http"
	"log"
)

func NewRouter(authHandler *handlers.AuthHandler, gatewayHandler *handlers.GatewayHandler, authMiddleware *middleware.AuthMiddleware) *mux.Router {
    router := mux.NewRouter()
	log.Println("NewRouter")

    // Добавляем роуты, которые требуют авторизации
    router.Handle("/admin/{_:.*}", authMiddleware.CheckAuth(gatewayHandler.ServeHTTP)).Methods("GET", "POST", "PUT", "DELETE")
    router.Handle("/user/{_:.*}", authMiddleware.CheckAuth(gatewayHandler.ServeHTTP)).Methods("GET", "POST", "PUT", "DELETE")
    // и так далее для других роутов, требующих авторизации...

    // Все остальные запросы перенаправляются на обработчик gateway без проверки авторизации
    router.Handle("/{_:.*}", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "http://nginx"+r.RequestURI, http.StatusFound)
	}).Methods("GET", "POST", "PUT", "DELETE")

    return router
}
