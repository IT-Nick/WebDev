package utils

import (
    "log"
    "os"
)
func InitLogger() {
	// Здесь вы можете настроить ваш логгер. Например:
	log.SetOutput(os.Stdout)  // Установить вывод на стандартный вывод
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)  // Включить дату, время и имя файла в логах
}

func LogError(err error) {
	// здесь реализация логирования ошибок, пример:
	log.Printf("Error: %v", err)
}