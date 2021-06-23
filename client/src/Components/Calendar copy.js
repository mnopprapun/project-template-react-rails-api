import React from "react";
// import dateFns from "date-fns";
import * as addMonths  from 'date-fns/addMonths'
import * as subMonths  from 'date-fns/subMonths'
import * as startOfWeek  from 'date-fns/startOfWeek'
import * as endOfWeek from 'date-fns/endOfWeek'
import * as startOfMonth  from 'date-fns/startOfMonth'
import * as endOfMonth from 'date-fns/endOfMonth'
import * as isSameDay  from 'date-fns/isSameDay'
import * as isSameMonth  from 'date-fns/isSameMonth'
import * as addDays  from 'date-fns/addDays'
//import * as currentMonth from 'date-fns/currentMonth'

class Calendar extends React.Component {

	state = {
		currentMonth: new Date(),
		selectedDate: new Date()
	  };
	
	  renderHeader() {
		  const dateFormat = "MMMM YYYY";

	  return (		  
		<div className="header row flex-middle">
		  <div className="col col-start">
			<div className="icon" onClick={this.prevMonth}>
			  chevron_left
			</div>
		  </div>
		  <div className="col col-center">
			<span>
			  {this.format(this.state.currentMonth, dateFormat)}
			</span>
		  </div>
		  <div className="col col-end" onClick={this.nextMonth}>
			<div className="icon">chevron_right</div>
		  </div>
		</div>
	  );
	  }
	
	  renderDays() {
		const dateFormat = "dddd";
		const days = [];
	
		let startDate = this.startOfWeek(this.state.currentMonth);
	
		for (let i = 0; i < 7; i++) {
		  days.push(
			<div className="col col-center" key={i}>
			  {this.format(this.addDays(startDate, i), dateFormat)}
			</div>
		  );
		}
		return <div className="days row">{days}</div>;
	  }


	  renderCells() {
		const { currentMonth, selectedDate } = this.state;
    	const monthStart = this.startOfMonth(currentMonth);
    	const monthEnd = this.endOfMonth(monthStart);
    	const startDate = this.startOfWeek(monthStart);
    	const endDate = this.endOfWeek(monthEnd);

   		 const dateFormat = "D";
    	const rows = [];

    	let days = [];
    	let day = startDate;
    	let formattedDate = "";

   			 while (day <= endDate) {
      			for (let i = 0; i < 7; i++) {
        	formattedDate = this.format(day, dateFormat);
        	const cloneDay = day;
        	days.push(
          <div
            className={`col cell ${
              !this.isSameMonth(day, monthStart)
                ? "disabled"
                : this.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(this.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        	day = this.addDays(day, 1);
      }
      		rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    	}
    	return <div className="body">{rows}</div>;
  		}
	
	  onDateClick = day => {
		this.setState({
			selectedDate: day
		  });
	  };
	
	  nextMonth = () => {
		this.setState({
			currentMonth: this.addMonths(this.state.currentMonth, 1)
		  });
	  };
	
	  prevMonth = () => {
		this.setState({
			currentMonth: this.subMonths(this.state.currentMonth, 1)
		  });
	  };
	

  render() {
    return (
		<div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;