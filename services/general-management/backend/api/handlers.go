package api

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"github.com/IT-Nick/WebDev/services/general-management/backend/database"
	"github.com/dgrijalva/jwt-go"
	"net/http"
	"time"
)

// AuthUserHandler handles user authentication and returns a JWT token
func AuthUserHandler(w http.ResponseWriter, r *http.Request) {
	var requestData map[string]string
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	username, ok1 := requestData["username"]
	password, ok2 := requestData["password"]

	if !ok1 || !ok2 {
		http.Error(w, "Invalid request data", http.StatusBadRequest)
		return
	}

	// Hash the provided password
	hash := sha256.Sum256([]byte(password))
	passwordHash := hex.EncodeToString(hash[:])

	// Get the stored password hash
	storedPasswordHash, err := database.GetPasswordHashByUsername(username)
	if err != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// Compare the hashed passwords
	if storedPasswordHash != passwordHash {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// Create a new token object, specifying signing method and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 72).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte("YourSecretHere"))

	if err != nil {
		http.Error(w, "Could not generate token", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
}

// CreateApplicationHandler обрабатывает создание новой заявки
func CreateApplicationHandler(w http.ResponseWriter, r *http.Request) {
	var a database.Application
	if err := json.NewDecoder(r.Body).Decode(&a); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := database.InsertApplication(a.Email, a.Institute, a.Course, a.TeamExperience, a.BestSkill, a.FullName); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	response := map[string]bool{"success": true}
	json.NewEncoder(w).Encode(response)
}

// ListApplicationsHandler обрабатывает получение списка заявок
func ListApplicationsHandler(w http.ResponseWriter, r *http.Request) {
	applications, err := database.ListApplications()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(applications)
}

// ListAuthUsersHandler обрабатывает получение списка одобренных пользователей
func ListAuthUsersHandler(w http.ResponseWriter, r *http.Request) {
	authUsers, err := database.ListAuthUsers()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(authUsers)
}
func ApproveApplicationHandler(w http.ResponseWriter, r *http.Request) {
	var requestData map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Устанавливаем заголовок Content-Type
	w.Header().Set("Content-Type", "application/json")

	// Получаем id из JSON
	idFloat, ok := requestData["id"].(float64) // JSON часто интерпретирует числа как float64
	if !ok {
		http.Error(w, "Invalid request data: id required", http.StatusBadRequest)
		return
	}

	id := int(idFloat)

	// Обновляем значение IsApproved в базе данных
	if err := database.ApproveApplication(id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Отправляем ответ
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "approved"})
}

// CreateEventHandler обрабатывает создание нового мероприятия
func CreateEventHandler(w http.ResponseWriter, r *http.Request) {
	var e database.Event
	if err := json.NewDecoder(r.Body).Decode(&e); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := database.InsertEvent(e.Title, e.Context, e.StartDate, e.EndDate); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

// ListEventsHandler обрабатывает получение списка мероприятий
func ListEventsHandler(w http.ResponseWriter, r *http.Request) {
	events, err := database.ListEvents()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(events)
}

// DeleteEventHandler обрабатывает удаление мероприятия
func DeleteEventHandler(w http.ResponseWriter, r *http.Request) {
	var requestData map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Получаем id из JSON
	id, ok := requestData["id"].(float64)
	if !ok {
		http.Error(w, "Invalid request data", http.StatusBadRequest)
		return
	}

	if err := database.DeleteEvent(int(id)); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "deleted"})
}
