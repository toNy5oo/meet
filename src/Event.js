import React, { Component } from 'react';
import { Button, Card} from 'react-bootstrap'
import { SiGooglemaps } from 'react-icons/si'
import { BsCalendar2Event } from 'react-icons/bs'
import { AiOutlineInfoCircle } from 'react-icons/ai'

class Event extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showDetails: false,
    };
  }
 
  isClicked = () => {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  };

  parseDate(date){
  let eventDate = new Date(date);
  let d = eventDate.toLocaleDateString((undefined, { timeZone: 'UTC' }));
  let t = eventDate.getHours() + ":" +('0'+eventDate.getMinutes()).slice(-2);
  return d +' |  '+t;

  }

  render() {
    
    const {event} = this.props;
    const {showDetails} = this.state;

    return (
      <div className='event'>
      <Card className='text-center'>
          <Card.Header as="h5" className="summary">
          {event.summary}
          <Button variant="primary" className='details-button btn-sm' onClick={this.isClicked}>{showDetails ? 'Hide Details' : 'Show Details '}</Button>
          </Card.Header>
          
          <Card.Body>
          {showDetails ? 
              (<div className='extra-details'>
                  <h6>About the event:</h6>
                  <a href={event.htmlLink} rel="noreferrer" target='_blank'>
                    See details on Google Calendar
                  </a>
                  <p className='description'>{event.description}</p>
                </div>
              )
            : <>
            <div className='little_info d-flex flex-column justify-content-center align-items-center'>
            <Card.Title className='start-date'>
            <BsCalendar2Event  fill='rgb(124, 175, 196)'/>&nbsp;
                   {this.parseDate(event.start.dateTime)} ({event.start.timeZone})
            </Card.Title>
            <Card.Text className='location d-flex flex-column align-items-center'> 
                  <h6><AiOutlineInfoCircle fill='rgb(124, 175, 196)'/>&nbsp;{event.status}</h6>
                  <h6><SiGooglemaps fill='rgb(124, 175, 196)'/>{event.location}</h6>
            </Card.Text>
            </div>
            </>}
        
      </Card.Body>
      </Card>
      </div>
      
    )
  }
}
export default Event;