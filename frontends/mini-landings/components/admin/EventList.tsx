import React, { useEffect, useState } from 'react';

interface Event {
    id: number;
    title: string;
    context: string;
    content: string;
    startDate: string;
    endDate: string;
    imageURL: string;
    registrationURL: string;
}

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [modalData, setModalData] = useState<Event | null>(null);

    useEffect(() => {
        fetch('/general-management/api/events/list')
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error(err));
    }, []);

    const deleteEvent = (event: React.MouseEvent, id: number) => {
        event.stopPropagation();

        const payload = JSON.stringify({ id });

        console.log("Sending to server:", payload);

        fetch('/general-management/api/events/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Received from server:", data);

                if (data.status === 'deleted') {
                    setEvents(events.filter((eventItem) => eventItem.id !== id));
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="items-center">
            <h1 className="text-2xl font-bold mb-4">Список мероприятий</h1>
            <ul className="space-y-4">
                {events.map((eventItem) => (
                    <li
                        key={eventItem.id}
                        className="shadow-md hover:shadow-lg p-4 border rounded-lg cursor-pointer"
                        onClick={() => setModalData(eventItem)}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                {eventItem.title}
                            </div>
                            <button
                                className="bg-red-500 text-white px-4 py-1 rounded-full"
                                onClick={(event) => deleteEvent(event, eventItem.id)}
                            >
                                Удалить
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {modalData && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg w-1/2">
                        <h2 className="text-2xl font-bold mb-4">{modalData.title}</h2>
                        <p>Описание: {modalData.content}</p>
                        <p>Дата начала: {modalData.startDate}</p>
                        <p>Дата окончания: {modalData.endDate}</p>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-1 rounded-full"
                            onClick={() => setModalData(null)}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventList;
