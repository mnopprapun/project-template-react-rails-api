import FullCalendar, {formatDate} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
//import addEvent from '@fullcalendar/addEvent';
import axios from 'axios';
import React, { Component } from 'react';


const eventURL = "http://localhost3000/Event"

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
	  
componentDidMount = () => {
  axios.get(eventURL, {crossDomain: true}, {withCredentials: true})
  .then(response => this.handleEvents(response.data.event))
}

addNewEvent = (newEvent) => {
		axios.post(eventURL, newEvent)
		.then(() => this.setState({events: [...this.state.events, newEvent] }))
	  }
  
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
        calendarApi.addEvent({
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
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
            editable={true}
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
}
export default Calendar;