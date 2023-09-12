package database

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"time"

	"github.com/jackc/pgx/v4/pgxpool"
)

var pool *pgxpool.Pool

// Connect - создает новое подключение к базе данных
func Connect() {
	var err error
	dsn := "host=10.1.6.181 port=5432 dbname=general user=stepan_plehanov password=aB3$7yZ9!Q1 sslmode=disable"
	pool, err = pgxpool.Connect(context.Background(), dsn)
	if err != nil {
		fmt.Println("Error connecting to DB: ", err)
		return
	}
	fmt.Println("Successfully connected!")
}

// InsertApplication - вставляет новую заявку в таблицу
func InsertApplication(email, institute string, course int, teamExperience bool, bestSkill, fullName string) error {
	_, err := pool.Exec(context.Background(),
		"INSERT INTO applications (email, institute, course, team_experience, best_skill, full_name) VALUES ($1, $2, $3, $4, $5, $6)",
		email, institute, course, teamExperience, bestSkill, fullName)
	return err
}

// ListApplications - возвращает все заявки
func ListApplications() ([]Application, error) {
	rows, err := pool.Query(context.Background(), "SELECT * FROM applications")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var applications []Application
	for rows.Next() {
		var app Application
		err := rows.Scan(&app.ID, &app.Email, &app.Institute, &app.Course, &app.TeamExperience, &app.BestSkill, &app.FullName)
		if err != nil {
			return nil, err
		}
		applications = append(applications, app)
	}

	return applications, nil
}

// ApproveApplication - одобряет заявку и создает учетные данные
func ApproveApplication(id int, username, password string) error {
	tx, err := pool.Begin(context.Background())
	if err != nil {
		return err
	}
	defer tx.Rollback(context.Background())

	var app Application
	err = tx.QueryRow(context.Background(), "SELECT * FROM applications WHERE id = $1", id).Scan(&app.ID, &app.Email, &app.Institute, &app.Course, &app.TeamExperience, &app.BestSkill, &app.FullName)
	if err != nil {
		return err
	}

	// Хеширование пароля (простой пример, лучше использовать библиотеку типа bcrypt)
	hash := sha256.Sum256([]byte(password))
	passwordHash := hex.EncodeToString(hash[:])

	_, err = tx.Exec(context.Background(), "INSERT INTO auth (username, password_hash) VALUES ($1, $2)", username, passwordHash)
	if err != nil {
		return err
	}

	_, err = tx.Exec(context.Background(), "DELETE FROM applications WHERE id = $1", id)
	if err != nil {
		return err
	}

	err = tx.Commit(context.Background())
	return err
	//Этот код также включает в себя транзакционную обработку, чтобы убедиться,
	//что обе операции (вставка в auth и удаление из applications)
	//будут выполнены успешно или не будут выполнены вообще.
}

// ListAuthUsers - возвращает всех одобренных пользователей
func ListAuthUsers() ([]Auth, error) {
	rows, err := pool.Query(context.Background(), "SELECT * FROM auth")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var authUsers []Auth
	for rows.Next() {
		var user Auth
		err := rows.Scan(&user.ID, &user.Username, &user.PasswordHash)
		if err != nil {
			return nil, err
		}
		authUsers = append(authUsers, user)
	}

	return authUsers, nil
}

func GetPasswordHashByUsername(username string) (string, error) {
	var passwordHash string
	err := pool.QueryRow(context.Background(), "SELECT password_hash FROM auth WHERE username = $1", username).Scan(&passwordHash)
	return passwordHash, err
}

// InsertEvent - вставляет новое мероприятие в таблицу
func InsertEvent(title, eventContext string, startDate, endDate time.Time) error {
	_, err := pool.Exec(context.Background(),
		"INSERT INTO events (title, context, start_date, end_date) VALUES ($1, $2, $3, $4)",
		title, eventContext, startDate, endDate)
	return err
}

// ListEvents - возвращает все мероприятия
func ListEvents() ([]Event, error) {
	rows, err := pool.Query(context.Background(), "SELECT * FROM events")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var events []Event
	for rows.Next() {
		var event Event
		err := rows.Scan(&event.ID, &event.Title, &event.Context, &event.StartDate, &event.EndDate)
		if err != nil {
			return nil, err
		}
		events = append(events, event)
	}

	return events, nil
}

// DeleteEvent - удаляет мероприятие
func DeleteEvent(id int) error {
	_, err := pool.Exec(context.Background(),
		"DELETE FROM events WHERE id = $1",
		id)
	return err
}

// Close - закрывает подключение к базе данных
func Close() {
	pool.Close()
}
