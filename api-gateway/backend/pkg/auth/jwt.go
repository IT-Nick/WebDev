package auth

import (
	"github.com/golang-jwt/jwt"
	"time"
)

type JWTService interface {
	GenerateToken(username string, role string) (string, error)
	ValidateToken(tokenStr string) (*Claims, error)
}

type tokenService struct {
	secretKey string
}

type Claims struct {
	Username string `json:"username"`
	Role     string `json:"role"`
	jwt.StandardClaims
}

func NewJWTService(secretKey string) JWTService {
	return &tokenService{
		secretKey: secretKey,
	}
}

func (s *tokenService) GenerateToken(username string, role string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Username: username,
		Role:     role,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(s.secretKey))

	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (s *tokenService) ValidateToken(tknStr string) (*Claims, error) {
	claims := &Claims{}

	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(s.secretKey), nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			return nil, err
		}
		return nil, err
	}

	if !tkn.Valid {
		return nil, err
	}

	return claims, nil
}
