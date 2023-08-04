package handlers

import (
	"fmt"
	"github.com/IT-Nick/WebDev/api-gateway/backend/internal/middleware"
	"log"
	"net/http"
	"os"
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

	nginxIP := os.Getenv("NGINX_IP")
	nginxProtocol := os.Getenv("NGINX_PROTOCOL")
	nginxPort := os.Getenv("NGINX_PORT")

	if nginxIP == "" {
		nginxIP = "127.0.0.1" // если переменная окружения не установлена, используем localhost по умолчанию
	}
	if nginxProtocol == "" {
		nginxProtocol = "http" // по умолчанию используем http
	}
	if nginxPort == "" {
		nginxPort = "80" // по умолчанию используем порт 80
	}

	// Выполняем аутентификацию и авторизацию
	gh.authMiddleware.CheckAuth(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Перенаправляем запрос на Nginx
		http.Redirect(w, r, fmt.Sprintf("%s://%s:%s%s", nginxProtocol, nginxIP, nginxPort, r.RequestURI), http.StatusFound)
	})).ServeHTTP(w, r)
}
