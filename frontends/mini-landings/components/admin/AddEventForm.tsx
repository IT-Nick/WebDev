import React from 'react';

// Компонент для добавления мероприятия
const AddEventForm: React.FC = () => {
  const [eventName, setEventName] = React.useState('');

  const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
  };

  const handleSubmit = () => {
    console.log(`Event Name: ${eventName}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Event</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={handleEventNameChange}
          className="border p-2 mb-4"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEventForm;
