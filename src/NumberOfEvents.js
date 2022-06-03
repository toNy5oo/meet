import React, { Component } from 'react';
import { Col } from 'react-bootstrap/'


class NumberOfEvents extends Component {
    
    constructor(props){
      super(props);
        this.state = {
        numberOfEvents: 12,
      }
    }
    
    handleChange = (event) => {
      if (event !== undefined){
        let numOfEvents = parseInt(event.target.value)
        this.setState({
            numberOfEvents: numOfEvents
          });
          return () => this.props.setNumberOfEvents(numOfEvents);
        } 
      }

  render() {
    return (
      <Col md={4} className="d-flex justify-content-center">
      <div className="numberOfEvents">Events to show:</div>
      <input 
            className="events_number__input" 
            type="number" 
            onChange={this.handleChange}
            value={this.state.numberOfEvents}>
        </input>
      </Col> 
    );
  }
}

export default NumberOfEvents;
