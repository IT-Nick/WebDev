package database

import (
	"context"
	"fmt"
	"github.com/IT-Nick/WebDev/services/auth-system/backend/api"
	"github.com/jackc/pgx/v4/pgxpool"
)

// Connect создаёт и возвращает соединение с базой данных
func Connect(config *api.Config) (*pgxpool.Pool, error) {
	connectionString := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		config.Database.Host,
		config.Database.Port,
		config.Database.User,
		config.Database.Password,
		config.Database.Database,
	)

	poolConfig, err := pgxpool.ParseConfig(connectionString)
	if err != nil {
		return nil, err
	}

	pool, err := pgxpool.ConnectConfig(context.Background(), poolConfig)
	if err != nil {
		return nil, err
	}

	// Проверяем соединение
	conn, err := pool.Acquire(context.Background())
	if err != nil {
		return nil, err
	}
	defer conn.Release()

	err = conn.Conn().Ping(context.Background())
	if err != nil {
		return nil, err
	}

	return pool, nil
}