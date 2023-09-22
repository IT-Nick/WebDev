package database

import "time"

type Application struct {
	ID             int    `json:"id"`
	Email          string `json:"email"`
	Institute      string `json:"institute"`
	Course         int    `json:"course"`
	TeamExperience bool   `json:"team_experience"`
	BestSkill      string `json:"best_skill"`
	FullName       string `json:"full_name"`
}

type Auth struct {
	ID           int    `json:"id"`
	Username     string `json:"username"`
	PasswordHash string `json:"password_hash"`
	IsApproved   bool   `json:"is_approved"`
}

type Event struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Context   string    `json:"context"`
	Content   string    `json:"content"`
	StartDate time.Time `json:"start_date"`
	EndDate   time.Time `json:"end_date"`
	ImageURL  string    `json:"image_url"`
}
