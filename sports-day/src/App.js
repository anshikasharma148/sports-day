import React, { useState, useEffect } from 'react';
import mockData from './data/mockData';
import EventCard from './components/EventCard';
import SelectedEventCard from './components/SelectedEventCard';
import './index.css';

function App() {
  const [selectedEvents, setSelectedEvents] = useState(() => {
    const savedEvents = localStorage.getItem('selectedEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem('selectedEvents', JSON.stringify(selectedEvents));
  }, [selectedEvents]);

  const addEvent = (event) => {
    if (selectedEvents.length < 3 && !selectedEvents.some(e => e.id === event.id)) {
      const isConflict = selectedEvents.some(e => 
        (new Date(event.start_time) < new Date(e.end_time) && new Date(event.end_time) > new Date(e.start_time))
      );
      if (!isConflict) {
        setSelectedEvents([...selectedEvents, event]);
      } else {
        alert("Event timing conflicts with an already selected event.");
      }
    }
  };

  const removeEvent = (event) => {
    setSelectedEvents(selectedEvents.filter(e => e.id !== event.id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">Sports Day Registration</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">All Events</h2>
          <div className="grid grid-cols-1 gap-4">
            {mockData.map(event => (
              <EventCard key={event.id} event={event} onSelect={addEvent} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Selected Events</h2>
          <div className="grid grid-cols-1 gap-4">
            {selectedEvents.map(event => (
              <SelectedEventCard key={event.id} event={event} onDeselect={removeEvent} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
