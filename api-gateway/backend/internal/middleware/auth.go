package middleware

import (
	"net/http"
	"strings"
	"github.com/golang-jwt/jwt"
)

type AuthMiddleware struct {
	SecretKey string
}

func NewAuthMiddleware(secretKey string) *AuthMiddleware {
	return &AuthMiddleware{
		SecretKey: secretKey,
	}
}

func (a *AuthMiddleware) CheckAuth(r *http.Request) error {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return http.ErrMissingHeader // возвращаем ошибку, если заголовок отсутствует
	}

	bearerToken := strings.Split(authHeader, " ")
	if len(bearerToken) != 2 {
		return http.ErrInvalidHeader // возвращаем ошибку, если заголовок неверный
	}

	token, err := jwt.Parse(bearerToken[1], func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return []byte(a.SecretKey), nil
	})

	if err != nil {
		return err // возвращаем ошибку, если токен неверный
	}

	if !token.Valid {
		return jwt.ErrSignatureInvalid // возвращаем ошибку, если токен недействителен
	}

	return nil
}
