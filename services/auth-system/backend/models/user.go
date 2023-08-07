package models

import "time"

// User представляет сущность пользователя в системе.
type User struct {
	ID        int64     `json:"id"`
	Username  string    `json:"username"`
	Password  string    `json:"-"` // Пароль не сериализуется в JSON
	Email     string    `json:"email"`
	RoleID    int64     `json:"-"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Role      Role      `json:"role" pg:"rel:has-one"` // Связь с ролью
}

// TableName устанавливает имя таблицы по умолчанию.
func (u User) TableName() string {
	return "users"
}
