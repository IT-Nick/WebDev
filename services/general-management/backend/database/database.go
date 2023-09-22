package database

import (
	"context"
	"fmt"
	"log"
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

// ApproveApplication - одобряет заявку, устанавливая IsApproved в true и удаляя из applications
func ApproveApplication(id int) error {
	tx, err := pool.Begin(context.Background())
	if err != nil {
		log.Printf("Error starting transaction: %v", err)
		return err
	}
	defer tx.Rollback(context.Background())

	// Получаем email по заданному ID из таблицы applications
	var email string
	err = tx.QueryRow(context.Background(), "SELECT email FROM applications WHERE id = $1", id).Scan(&email)
	if err != nil {
		log.Printf("Error fetching email: %v", err)
		return err
	}

	// Обновляем значение IsApproved для заданного email
	result, err := tx.Exec(context.Background(), "UPDATE auth SET is_approved = TRUE WHERE username = $1", email)
	if err != nil {
		log.Printf("Error updating is_approved: %v", err)
		return err
	}
	affectedRows := result.RowsAffected()
	log.Printf("Rows affected while updating is_approved: %d", affectedRows)

	// Удаляем соответствующую запись из таблицы applications
	result, err = tx.Exec(context.Background(), "DELETE FROM applications WHERE id = $1", id)
	if err != nil {
		log.Printf("Error deleting application: %v", err)
		return err
	}
	affectedRows = result.RowsAffected()
	log.Printf("Rows affected while deleting from applications: %d", affectedRows)

	// Фиксация транзакции
	err = tx.Commit(context.Background())
	if err != nil {
		log.Printf("Error committing transaction: %v", err)
		return err
	}

	log.Println("Transaction committed successfully.")
	return nil
}

// InsertAuthUser - вставляет нового пользователя в таблицу Auth
func InsertAuthUser(email, passwordHash string) error {
	_, err := pool.Exec(context.Background(),
		"INSERT INTO auth (username, password_hash, is_approved) VALUES ($1, $2, $3)",
		email, passwordHash, false)
	return err
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
		err := rows.Scan(&user.ID, &user.Username, &user.PasswordHash, &user.IsApproved)
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
func InsertEvent(title, eventContext, content string, startDate, endDate time.Time, imageURL string) error {
	_, err := pool.Exec(context.Background(),
		"INSERT INTO events (title, context, content, start_date, end_date, image_url) VALUES ($1, $2, $3, $4, $5, $6)",
		title, eventContext, content, startDate, endDate, imageURL)
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
		err := rows.Scan(&event.ID, &event.Title, &event.Context, &event.Content, &event.StartDate, &event.EndDate, &event.ImageURL)
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
