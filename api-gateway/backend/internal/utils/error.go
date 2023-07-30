package utils

import "log"

func LogError(err error) {
	// здесь реализация логирования ошибок, пример:
	log.Printf("Error: %v", err)
}