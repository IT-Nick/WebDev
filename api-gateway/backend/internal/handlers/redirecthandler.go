package handlers

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

type RedirectHandler struct{}

func NewRedirectHandler() *RedirectHandler {
	return &RedirectHandler{}
}

func (rh *RedirectHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	rh.HandleRequest(w, r)
}

func (rh *RedirectHandler) HandleRequest(w http.ResponseWriter, r *http.Request) {
	log.Println("HandleRequest")

	nginxIP := os.Getenv("NGINX_IP")             // читаем переменную окружения
	nginxProtocol := os.Getenv("NGINX_PROTOCOL") // читаем переменную окружения
	nginxPort := os.Getenv("NGINX_PORT")         // читаем переменную окружения

	if nginxIP == "" {
		nginxIP = "127.0.0.1" // если переменная окружения не установлена, используем localhost по умолчанию
	}
	if nginxProtocol == "" {
		nginxProtocol = "http" // по умолчанию используем http
	}
	if nginxPort == "" {
		nginxPort = "80" // по умолчанию используем порт 80
	}

	// Перенаправляем запрос на Nginx
	http.Redirect(w, r, fmt.Sprintf("%s://%s:%s%s", nginxProtocol, nginxIP, nginxPort, r.RequestURI), http.StatusFound)
}
