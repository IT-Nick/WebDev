package services

import (
	"github.com/IT-Nick/WebDev/services/auth-system/backend/database"
	"github.com/IT-Nick/WebDev/services/auth-system/backend/models"
	"github.com/IT-Nick/WebDev/services/auth-system/backend/security"
)

// AuthService отвечает за реализацию методов авторизации и регистрации.
type AuthService struct {
	db database.Connection
}

// NewAuthService создает новый экземпляр AuthService.
func NewAuthService(db database.Connection) *AuthService {
	return &AuthService{db: db}
}

// SignIn проверяет учетные данные пользователя и возвращает токен в случае успеха.
func (s *AuthService) SignIn(username, password string) (string, error) {
	// Находим пользователя по имени пользователя
	user, err := s.db.GetUserByUsername(username)
	if err != nil {
		return "", err // Возвращаем ошибку, если что-то пошло не так
	}

	// Сравниваем введенный пароль с хешированным паролем в базе данных
	if err := security.ComparePasswords(user.Password, password); err != nil {
		return "", err // Возвращаем ошибку, если пароли не совпадают
	}

	// Генерируем JWT-токен
	token, err := security.GenerateToken(user)
	if err != nil {
		return "", err // Возвращаем ошибку, если не удалось сгенерировать токен
	}

	return token, nil
}

// SignUp регистрирует нового пользователя и возвращает его.
func (s *AuthService) SignUp(user *models.User) (*models.User, error) {
	// Хешируем пароль перед сохранением в базе данных
	hashedPassword, err := security.HashPassword(user.Password)
	if err != nil {
		return nil, err // Возвращаем ошибку, если не удалось захешировать пароль
	}

	user.Password = hashedPassword

	// Сохраняем пользователя в базе данных
	if err := s.db.CreateUser(user); err != nil {
		return nil, err // Возвращаем ошибку, если не удалось сохранить пользователя
	}

	return user, nil
}

// ... дополнительные методы, если потребуется ...
