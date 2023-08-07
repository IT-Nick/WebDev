package models

// Role представляет роль пользователя в системе.
type Role struct {
	ID   int64  `json:"id"`
	Name string `json:"name"` // например, "user", "moderator", "admin"
}

// TableName устанавливает имя таблицы по умолчанию.
func (r Role) TableName() string {
	return "roles"
}
