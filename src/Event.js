import React, { Component } from 'react';
import {Col, Button, Card} from 'react-bootstrap'
import { SiGooglemaps } from 'react-icons/si'
import { GrStatusInfo } from 'react-icons/gr'

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
    
      <Card className='event text-center'>
          <Card.Header as="h5" className="summary">{event.summary}</Card.Header>
          <Card.Body>
          <Card.Title className='start-date'>{event.start.dateTime} ({event.start.timeZone})</Card.Title>
          <Card.Text className='location'><GrStatusInfo /> {event.status} | <SiGooglemaps /> {event.location}</Card.Text>
          <Button variant="secondary" className='btn_details' onClick={this.isClicked}>{showDetails ? 'Hide Details' : 'Show Details '}</Button>
        {showDetails && 
        (<div className='extra-info'>
            <h5>About the event:</h5>
            <a href={event.htmlLink} rel="noreferrer" target='_blank'>
              See details on Google Calendar
            </a>
            <p className='description'>{event.description}</p>
          </div>
        )}
      
      </Card.Body>
      </Card>
      
    )
  }
}
export default Event;