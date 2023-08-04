package integration

import (
	"github.com/IT-Nick/WebDev/api-gateway/backend/internal/handlers"
	"github.com/IT-Nick/WebDev/api-gateway/backend/internal/middleware"
	"github.com/IT-Nick/WebDev/api-gateway/backend/internal/routing"
	"github.com/IT-Nick/WebDev/api-gateway/backend/pkg/auth"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

func TestAdminRouteAccess(t *testing.T) {

	jwtService := auth.NewJWTService(os.Getenv("SECRET_KEY"))

	authMiddleware := middleware.NewAuthMiddleware(jwtService)

	authHandler := handlers.NewAuthHandler(jwtService)
	gatewayHandler := handlers.NewGatewayHandler(authMiddleware)
	redirectHandler := handlers.NewRedirectHandler()

	router := routing.NewRouter(authHandler, gatewayHandler, authMiddleware, redirectHandler)

	// Создание тестового сервера
	server := httptest.NewServer(router)
	defer server.Close()

	// Генерация токена для пользователя с ролью admin
	token, err := jwtService.GenerateToken("admin", "admin")
	if err != nil {
		t.Fatalf("Failed to generate token: %s", err.Error())
	}

	// Запрос с валидным токеном для admin
	req, err := http.NewRequest("GET", server.URL+"/admin/", nil)
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Authorization", "Bearer "+token)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}

	// Ожидаем код 200, так как у пользователя есть права доступа
	if res.StatusCode != http.StatusOK {
		t.Fatalf("Expected status OK but got %d", res.StatusCode)
	}

	// Генерация токена для пользователя с ролью moderator
	token, err = jwtService.GenerateToken("admin", "moderator")
	if err != nil {
		t.Fatalf("Failed to generate token: %s", err.Error())
	}

	// Запрос с токеном для moderator
	req, err = http.NewRequest("GET", server.URL+"/admin/", nil)
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Authorization", "Bearer "+token)

	res, err = http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}

	// Ожидаем код 403 (Forbidden), так как у пользователя нет прав доступа
	if res.StatusCode != http.StatusForbidden {
		t.Fatalf("Expected status Forbidden but got %d", res.StatusCode)
	}
}
