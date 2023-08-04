package unit

import (
	"github.com/IT-Nick/WebDev/api-gateway/backend/internal/middleware"
	"github.com/IT-Nick/WebDev/api-gateway/backend/pkg/auth"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestCheckRole(t *testing.T) {
	secretKey := "test-secret"
	jwtService := auth.NewJWTService(secretKey)

	authMiddleware := middleware.NewAuthMiddleware(jwtService)

	// Генерируем токен для тестирования
	username := "testUser"
	role := "admin"
	tokenString, _ := jwtService.GenerateToken(username, role)

	tests := []struct {
		name          string
		requiredRole  string
		token         string
		expectedCode  int
		expectedError string
	}{
		{
			name:         "Valid Role",
			requiredRole: "admin",
			token:        tokenString,
			expectedCode: http.StatusOK,
		},
		{
			name:          "Invalid Role",
			requiredRole:  "other",
			token:         tokenString,
			expectedCode:  http.StatusForbidden,
			expectedError: "Forbidden: Insufficient role",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req, err := http.NewRequest("GET", "/test", nil)
			if err != nil {
				t.Fatal(err)
			}
			req.Header.Set("Authorization", "Bearer "+tt.token)

			rr := httptest.NewRecorder()
			handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {})
			checkedHandler := authMiddleware.CheckRole(handler, tt.requiredRole)

			checkedHandler.ServeHTTP(rr, req)

			if status := rr.Code; status != tt.expectedCode {
				t.Errorf("handler returned wrong status code: got %v want %v", status, tt.expectedCode)
			}

			if tt.expectedError != "" {
				respBody := strings.TrimSpace(rr.Body.String())
				if respBody != tt.expectedError {
					t.Errorf("handler returned unexpected error: got %v want %v", respBody, tt.expectedError)
				}
			}
		})
	}
}
