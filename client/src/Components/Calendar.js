import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import addEvent from '@fullcalendar/addEvent';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

// const events = [
//   {
//     id: 1,
//     title: 'event 1',
//     start: '2021-06-14T10:00:00',
//     end: '2021-06-14T12:00:00',
//   },
//   {
//     id: 2,
//     title: 'event 2',
//     start: '2021-06-16T13:00:00',
//     end: '2021-06-16T18:00:00',
//   },
//   { id: 3, title: 'event 3', start: '2021-06-17', end: '2021-06-20' },
// ];

function Calendar() {
	const [events, addEvent] = useState([]);


	  const addNewEvent = (newEvent) => {
		axios.post('http://localhost:3000/events', newEvent)
		.then((newEvent) => addEvent([...events, newEvent]))
	  }

  return (
    <div className="App">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          center: 'dayGridMonth,timeGridWeek,timeGridDay new',
        }}
        customButtons={{
          new: {
            text: 'new',
            click: () => console.log('new event'),
          },
        }}
        events={events}
        eventColor="red"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.id)}
      />
    </div>
  );
}

export default Calendar;