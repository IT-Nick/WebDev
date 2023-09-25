import React from 'react';

// Компонент для добавления мероприятия
const AddEventForm: React.FC = () => {
    const [eventData, setEventData] = React.useState({
        title: '',
        context: '',
        content: '',
        start_date: '',
        end_date: '',
        image_url: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEventData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const convertToRFC3339 = (dateStr: string): string => {
        return `${dateStr}T00:00:00Z`;
    }
    

    const handleSubmit = async () => {
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
        <div>
            <h1 className="text-2xl font-bold mb-4">Добавить мероприятие</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="title"
                    placeholder="Название"
                    value={eventData.title}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 rounded-xl"
                    maxLength={53}
                />
                <input
                    type="text"
                    name="context"
                    placeholder="Краткое описание"
                    value={eventData.context}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 rounded-xl"
                    maxLength={84}
                />
                <input
                    type="text"
                    name="content"
                    placeholder="Полное описание"
                    value={eventData.content}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 rounded-xl"
                />
                <input
                    type="date"
                    name="Начало регистрации"
                    value={eventData.start_date}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 rounded-xl"
                />
                <input
                    type="date"
                    name="Конец регистрации"
                    value={eventData.end_date}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 rounded-xl"
                />
                <input
                    type="text"
                    name="image_url"
                    placeholder="Ссылка на изображение"
                    value={eventData.image_url}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 rounded-xl"
                />
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white p-2 rounded-xl"
                >
                    Добавить
                </button>
            </form>
        </div>
    );
};

export default AddEventForm;
