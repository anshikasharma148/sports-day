import React from 'react';

const SelectedEventCard = ({ event, onDeselect }) => {
  const { event_name, event_category, start_time, end_time } = event;
  return (
    <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="font-bold text-xl text-blue-800">{event_name}</div>
      <div className="text-sm text-gray-600">{event_category}</div>
      <div className="text-sm text-gray-500">{new Date(start_time).toLocaleTimeString()} - {new Date(end_time).toLocaleTimeString()}</div>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
        onClick={() => onDeselect(event)}
      >
        Deselect
      </button>
    </div>
  );
};

export default SelectedEventCard;
