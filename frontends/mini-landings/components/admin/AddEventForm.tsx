import React from 'react';

// Компонент для добавления мероприятия
const AddEventForm: React.FC = () => {
    const [eventData, setEventData] = React.useState({
        title: '',
        context: '',
        content: '',
        start_date: '',
        end_date: '',
        image_url: '',
        registrationUrl: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEventData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const convertToRFC3339 = (dateStr: string): string => {
        const [day, month, year] = dateStr.split('.');
        if (day && month && year) {
            return `${year}-${month}-${day}T00:00:00Z`;
        } else {
            console.error("Неверный формат даты, нужно DD.MM.YYYY.");
            return "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...eventData,
                start_date: convertToRFC3339(eventData.start_date),
                end_date: convertToRFC3339(eventData.end_date)
            };

            console.log("Sending data to server:", dataToSend);  // Вывод в консоль

            const response = await fetch("/general-management/api/events/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.status === 201) {
                console.log("Event successfully created!");
            } else {
                console.error("Failed to create event.", await response.text());
            }
        } catch (error) {
            console.error("There was an error:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Добавить мероприятие</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Название"
                    value={eventData.title}
                    onChange={handleInputChange}
                    className="block w-full border p-2 mb-4 rounded-xl"
                    maxLength={53}
                />
                <input
                    type="text"
                    name="context"
                    placeholder="Краткое описание"
                    value={eventData.context}
                    onChange={handleInputChange}
                    className="block w-full border p-2 mb-4 rounded-xl"
                    maxLength={84}
                />
                <textarea
                    name="content"
                    placeholder="Полное описание"
                    value={eventData.content}
                    onChange={handleInputChange}
                    className="block w-full border p-2 mb-4 rounded-xl"
                    rows={3} // Высота в 3 строки по умолчанию
                ></textarea>
                <input
                    type="text"
                    name="start_date"
                    placeholder="Начало регистрации (DD.MM.YYYY)"
                    value={eventData.start_date}
                    onChange={handleInputChange}
                    className="block w-full border p-2 mb-4 rounded-xl"
                />
                <input
                    type="text"
                    name="end_date"
                    placeholder="Конец регистрации (DD.MM.YYYY)"
                    value={eventData.end_date}
                    onChange={handleInputChange}
                    className="block w-full border p-2 mb-4 rounded-xl"
                />
                <input
                    type="text"
                    name="image_url"
                    placeholder="Ссылка на изображение"
                    value={eventData.image_url}
                    onChange={handleInputChange}
                    className="block w-full border p-2 mb-4 rounded-xl"
                />
                <input
                    type="text"
                    name="registrationUrl"
                    placeholder="Ссылка для регистрации"
                    value={eventData.registrationUrl}
                    onChange={handleInputChange}
                    className="block w-full border p-2 mb-4 rounded-xl"
                />
                <button type="submit" className="block w-full bg-blue-500 text-white p-2 rounded-xl">
                    Добавить
                </button>
            </form>
        </div>
    );
};

export default AddEventForm;
