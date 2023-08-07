#!/bin/bash

# Описание: Системный скрипт для запуска сайта team.mpei.ru при перезагрузке сервера.
# Имя: runTeamSite.sh
# Местоположение: /etc/init.d/
# Необходимые пакеты: screen

# Настройки
SCREEN_NAME="TeamSite"  # Имя экрана, который нужно запустить
WORKING_DIR="/root/public"  # Рабочая директория для запуска команды

# Запуск экрана
screen -dmS $SCREEN_NAME bash -c "cd $WORKING_DIR && npm run start"

# Выводим сообщение об успешном запуске
echo "Screen $SCREEN_NAME started."
