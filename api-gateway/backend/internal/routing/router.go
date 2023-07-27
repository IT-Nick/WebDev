//Роутер передает все запросы пользователя на обработчик API Gateway
package routing

import (
    "net/http"
    "github.com/IT-Nick/WebDev/api-gateway/backend/internal/handlers"
    "github.com/gorilla/mux"
)

func NewRouter(gatewayHandler *handlers.GatewayHandler) *mux.Router {
    router := mux.NewRouter()

    // Все запросы перенаправляются на обработчик gateway
    router.HandleFunc("/{_:.*}", gatewayHandler.HandleRequest).Methods("GET", "POST", "PUT", "DELETE")

    return router
}
