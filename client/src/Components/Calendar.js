import FullCalendar, {formatDate} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
//import addEvent from '@fullcalendar/addEvent';
import axios from 'axios';
import React, { Component } from 'react';


const eventURL = "http://localhost:3000/events"

class Calendar extends Component {
  state = {
    events: [],
      title:"",
      start:"",
      end:""
  }

handleEvents = (eventData) =>{
  this.setState({
    events: eventData
  })
}
	  
// componentDidMount = () => {
//   axios.get(eventURL, {crossDomain: true}, {withCredentials: true})
//   .then(response => this.handleEvents(response.data.event))
// }

addNewEvent = (newEvent) => {
  const token = localStorage.getItem("token")
  console.log(newEvent)
  let postOption ={
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      "Accepts": 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(newEvent)
    }

    fetch("http://localhost:3000/events", postOption)
    .then(res => res.json())
    .then(console.log)
}
		// axios.post(eventURL, newEvent)
		// .then(() => this.setState({events: [...this.state.events, newEvent] }))
	  
    handleWeekendsToggle = () => {
      this.setState({
        weekendsVisible: !this.state.weekendsVisible
      })
    }
  
    handleDateSelect = (selectInfo) => {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar
  
      calendarApi.unselect() // clear date selection
  
      if (title) {
        this.addNewEvent({
          calendar_id: this.props.user.id,
          user_id: this.props.user.id,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
        })
        calendarApi.addEvent({
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          //allDay: selectInfo.allDay
        })
      }
    }
  
    handleEventClick = (clickInfo) => {
      if ((`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    }
  
    handleEvents = (events) => {
      this.setState({
        currentEvents: events
      })
    }
  
  
  
   renderEventContent= (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  
 renderSidebarEvent = (event) => {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
        <i>{event.title}</i>
      </li>
    )
  }
  
render (){
  return(
    <div className="App">
      <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            // editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={this.events} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={this.renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
    </div>
  );
}
// renderSidebar=()=> {
//   return (
//     <div className='demo-app-sidebar'>
//       <div className='demo-app-sidebar-section'>
//         <h2>Instructions</h2>
//         <ul>
//           <li>Select dates and you will be prompted to create a new event</li>
//           <li>Drag, drop, and resize events</li>
//           <li>Click an event to delete it</li>
//         </ul>
//       </div>
//       <div className='demo-app-sidebar-section'>
//         <label>
//           <input
//             type='checkbox'
//             checked={this.state.weekendsVisible}
//             onChange={this.handleWeekendsToggle}
//           ></input>
//           toggle weekends
//         </label>
//       </div>
//       <div className='demo-app-sidebar-section'>
//         <h2>All Events ({this.state.currentEvents.length})</h2>
//         <ul>
//           {this.state.currentEvents.map(this.renderSidebarEvent)}
//         </ul>
//       </div>
//     </div>
//   )
// }
}
export default Calendar;