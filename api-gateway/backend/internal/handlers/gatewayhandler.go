package handlers

import (
    "net/http"
    "github.com/IT-Nick/WebDev/api-gateway/backend/internal/middleware"
    "github.com/IT-Nick/WebDev/api-gateway/backend/internal/utils"
)

type GatewayHandler struct {
    authMiddleware middleware.AuthMiddleware
}

func NewGatewayHandler(authMiddleware middleware.AuthMiddleware) *GatewayHandler {
    return &GatewayHandler{
        authMiddleware: authMiddleware,
    }
}

func (gh *GatewayHandler) HandleRequest(w http.ResponseWriter, r *http.Request) {
    // Выполняем аутентификацию и авторизацию
    err := gh.authMiddleware.CheckAuth(r)
    if err != nil {
        utils.LogError(err)
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    // Перенаправляем запрос на Nginx
	http.Redirect(w, r, "http://nginx"+r.RequestURI, http.StatusFound)
}
