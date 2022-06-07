import React, { Component } from 'react';
import { Button, Card} from 'react-bootstrap'
import { SiGooglemaps } from 'react-icons/si'
import { GrStatusInfo } from 'react-icons/gr'
import { AiOutlineClockCircle } from 'react-icons/ai'

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
  //   const toParseDate = new Date(date).toLocaleDateString(
  //     undefined,
  //     {
  //       year: 'numeric',
  //       month: 'long',
  //       day: 'numeric'
  //     }
  //   );
  //  return toParseDate
  let eventDate = new Date(date);
  let d = eventDate.toLocaleDateString(
        undefined,
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
      );
  let t = eventDate.getHours() + ":" + eventDate.getMinutes();
  return d+' | '+t;

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
            <Card.Title className='start-date'><AiOutlineClockCircle/> {this.parseDate(event.start.dateTime)} ({event.start.timeZone})</Card.Title>
            <Card.Text className='location'><GrStatusInfo /> {event.status} | <SiGooglemaps /> {event.location}</Card.Text></>}
         
      </Card.Body>
      </Card>
      </div>
      
    )
  }
}
export default Event;