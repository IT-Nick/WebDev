package middleware

import (
	"github.com/IT-Nick/WebDev/api-gateway/backend/pkg/auth"
	"log"
	"net/http"
	"strings"
)

type AuthMiddleware struct {
	jwtService auth.JWTService
}

func NewAuthMiddleware(jwtService auth.JWTService) *AuthMiddleware {
	return &AuthMiddleware{
		jwtService: jwtService,
	}
}

func (a *AuthMiddleware) CheckAuth(next http.HandlerFunc) http.Handler {
	log.Println("CheckAuth")
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
			return
		}

		bearerToken := strings.Split(authHeader, " ")
		if len(bearerToken) != 2 {
			http.Error(w, "Invalid Authorization header", http.StatusUnauthorized)
			return
		}

		_, err := a.jwtService.ValidateToken(bearerToken[1])

		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		// Если проверка токена успешна, то мы вызываем следующий обработчик в цепочке
		next(w, r)
	})
}

func (a *AuthMiddleware) CheckRole(next http.Handler, requiredRole string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
			return
		}

		bearerToken := strings.Split(authHeader, " ")
		if len(bearerToken) != 2 {
			http.Error(w, "Invalid Authorization header", http.StatusUnauthorized)
			return
		}

		claims, err := a.jwtService.ValidateToken(bearerToken[1])
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		if claims.Role != requiredRole && requiredRole != "user" {
			http.Error(w, "Forbidden: Insufficient role", http.StatusForbidden)
			return
		}

		// Если проверка роли успешна, то мы вызываем следующий обработчик в цепочке
		next.ServeHTTP(w, r)
	})
}
