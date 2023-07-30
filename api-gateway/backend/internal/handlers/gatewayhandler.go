package handlers

import (
	"log"
    "net/http"
    "github.com/IT-Nick/WebDev/api-gateway/backend/internal/middleware"
)

type GatewayHandler struct {
    authMiddleware *middleware.AuthMiddleware
}

func NewGatewayHandler(authMiddleware *middleware.AuthMiddleware) *GatewayHandler {
    return &GatewayHandler{
        authMiddleware: authMiddleware,
    }
}

func (gh *GatewayHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    gh.HandleRequest(w, r)
}

func (gh *GatewayHandler) HandleRequest(w http.ResponseWriter, r *http.Request) {
	log.Println("HandleRequest")

	// Выполняем аутентификацию и авторизацию
    gh.authMiddleware.CheckAuth(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Перенаправляем запрос на Nginx
		http.Redirect(w, r, "http://87.242.123.153:80"+r.RequestURI, http.StatusFound)
	})).ServeHTTP(w, r)
}
