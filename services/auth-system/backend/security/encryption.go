package security

import (
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
	"github.com/IT-Nick/WebDev/services/auth-system/backend/models"
	"os"
	"time"
	"errors"
)

var secretKey = os.Getenv("SECRET_KEY") // Ключ для подписи JWT-токенов, должен быть установлен в переменных окружения

// HashPassword хеширует пароль с использованием bcrypt.
func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

// ComparePasswords сравнивает хешированный пароль с введенным паролем.
func ComparePasswords(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

// GenerateToken генерирует JWT-токен для пользователя.
func GenerateToken(user *models.User) (string, error) {
	// Создаем новый токен
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		ExpiresAt: time.Now().Add(24 * time.Hour).Unix(), // Устанавливаем срок действия токена
		IssuedAt:  time.Now().Unix(),
		Subject:   user.ID,
	})

	// Подписываем токен секретным ключом
	tokenString, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// ParseToken разбирает и возвращает содержимое JWT-токена.
func ParseToken(tokenString string) (*jwt.StandardClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*jwt.StandardClaims)
	if !ok || !token.Valid {
		return nil, errors.New("Неверный токен")
	}

	return claims, nil
}
