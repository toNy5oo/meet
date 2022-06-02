import React, { Component } from 'react';

class Event extends Component {

  state = {
    showDetails: false,
  };

  isClicked = () => {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  };

  render() {
    
    const {event} = this.props;
    const {showDetails} = this.state;

    return (
      <div className='event'>
          <h2 className='summary'>{event.summary}</h2>
          <h4 className='start-date'>{event.start.dateTime} ({event.start.timeZone})</h4>
          <h4 className='location'>@{event.summary} | {event.location}</h4>
          <button className='btn_details' onClick={this.isClicked}>{showDetails ? 'Hide Details' : 'Show Details '}</button>
        {showDetails && 
        (<div className='extra-info'>
            <h3>About the event:</h3>
            <a href={event.htmlLink} rel="noreferrer" target='_blank'>
              See details on Google Calendar
            </a>
            <p className='description'>{event.description}</p>
          </div>
        )}
      </div>
    )
  }
}
export default Event;