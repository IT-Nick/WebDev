package unit

import (
    "net/http"
    "net/http/httptest"
    "testing"
    "github.com/IT-Nick/WebDev/api-gateway/backend/internal/handlers"
    "github.com/IT-Nick/WebDev/api-gateway/backend/internal/middleware"
)

type MockAuthMiddleware struct {
    AuthError error
}

func (m *MockAuthMiddleware) CheckAuth(r *http.Request) error {
    return m.AuthError
}

func TestGatewayHandler_HandleRequest(t *testing.T) {
    // Создаем запрос на проверку
    req, err := http.NewRequest("GET", "/test", nil)
    if err != nil {
        t.Fatal(err)
    }

    // Имитируем успешную аутентификацию
    mockMiddleware := &MockAuthMiddleware{}
    handler := handlers.NewGatewayHandler(mockMiddleware)

    rr := httptest.NewRecorder()
    handlerFunc := http.HandlerFunc(handler.HandleRequest)

    handlerFunc.ServeHTTP(rr, req)

    // Проверяем, что перенаправление происходит правильно
    expected := "http://nginx_server/test"
    if location := rr.Header().Get("Location"); location != expected {
        t.Errorf("handler returned unexpected Location header: got %v want %v", location, expected)
    }

    // Имитируем ошибку аутентификации
    mockMiddleware.AuthError = errors.New("Auth error")
    rr = httptest.NewRecorder()

    handlerFunc.ServeHTTP(rr, req)

    // Проверяем, что возвращается статус 401 Unauthorized
    if status := rr.Code; status != http.StatusUnauthorized {
        t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusUnauthorized)
    }
}
