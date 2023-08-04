package handlers

import (
	"github.com/IT-Nick/WebDev/api-gateway/backend/pkg/auth"
	"log"
	"net/http"
	"os"
	"strings"
)

type AuthHandler struct {
	jwtService auth.JWTService
}

func NewAuthHandler(jwtService auth.JWTService) *AuthHandler {
	return &AuthHandler{
		jwtService: jwtService,
	}
}

func (ah *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	log.Println("Login")

	secretKey := r.Header.Get("X-Secret-Key")
	if secretKey != os.Getenv("SECRET_LOGIN_KEY") {
		http.Error(w, "Unauthorized access", http.StatusUnauthorized)
		return
	}

	username := r.FormValue("username")
	role := "admin" //затычка
	tokenString, err := ah.jwtService.GenerateToken(username, role)
	if err != nil {
		http.Error(w, "Error generating token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write([]byte(tokenString))
}

func (ah *AuthHandler) RefreshToken(w http.ResponseWriter, r *http.Request) {
	tokenHeader := r.Header.Get("Authorization")

	if strings.HasPrefix(tokenHeader, "Bearer ") {
		tokenHeader = strings.TrimPrefix(tokenHeader, "Bearer ")
	} else {
		http.Error(w, "Invalid Authorization header", http.StatusUnauthorized)
		return
	}

	claims, err := ah.jwtService.ValidateToken(tokenHeader)
	if err != nil {
		http.Error(w, "Invalid token: "+err.Error(), http.StatusUnauthorized)
		return
	}

	newToken, err := ah.jwtService.GenerateToken(claims.Username, claims.Role)
	if err != nil {
		http.Error(w, "Error generating token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write([]byte(newToken))
}
