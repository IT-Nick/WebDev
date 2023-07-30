package handlers

import (
	"net/http"
	"strings"
	"github.com/IT-Nick/WebDev/api-gateway/backend/pkg/auth"
)

type AuthHandler struct {}

func NewAuthHandler() *AuthHandler {
	return &AuthHandler{}
}

func (ah *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	// Здесь была бы логика аутентификации, например проверка имени пользователя и пароля.
	// Если аутентификация успешна, генерируется JWT.
	log.Println("Login")

	username := r.FormValue("username")
	// password := r.FormValue("password")
	// валидация логина и пароля здесь

	tokenString, err := utils.GenerateJWT(username)
	if err != nil {
		http.Error(w, "Error generating token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Возврат JWT клиенту
	w.Write([]byte(tokenString))
}

func (ah *AuthHandler) RefreshToken(w http.ResponseWriter, r *http.Request) {
	// Получаем токен из заголовка
	tokenHeader := r.Header.Get("Authorization")
	
	// Проверяем наличие префикса Bearer и удаляем его
	if strings.HasPrefix(tokenHeader, "Bearer ") {
		tokenHeader = strings.TrimPrefix(tokenHeader, "Bearer ")
	} else {
		http.Error(w, "Invalid Authorization header", http.StatusUnauthorized)
		return
	}
	
	// Валидируем токен
	claims, err := utils.ValidateJWT(tokenHeader)
	if err != nil {
		http.Error(w, "Invalid token: "+err.Error(), http.StatusUnauthorized)
		return
	}

	// Генерируем новый токен с теми же утверждениями
	newToken, err := utils.GenerateJWT(claims.Username)
	if err != nil {
		http.Error(w, "Error generating token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Возвращаем новый токен клиенту
	w.Write([]byte(newToken))
}
