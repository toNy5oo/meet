import React, { Component } from 'react';
import { InputGroup, FormControl, Col } from 'react-bootstrap/'
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
     
  state = { 
    numberOfEvents : 12
  }

  changeNumOfEvents = (e) => {
    let newValue = parseInt(e.target.value);
    if ((newValue > 33) || (newValue < 1)) {
      this.setState({
        numberOfEvents: newValue,
        infoText: 'Please set a number between 1 and 32',
      })
    } else {
      this.setState({
        numberOfEvents: newValue,
        infoText: '',
      })
    }
        this.props.updateEvents(undefined, newValue);
  }

  render() {
    return (
      <>
      <Col>
      {/* <div className="numberOfEvents">Events to show:</div> */}
      <ErrorAlert text={this.state.infoText} />
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Number of events to show</InputGroup.Text>
        <FormControl
          placeholder="Number between 1 and 32"
          aria-label="Username"
          aria-describedby="basic-addon1"
          className="events_number__input" 
            type="number" 
            onChange={this.changeNumOfEvents}
            value={this.state.numberOfEvents}
        />
      </InputGroup>
      {/* <input 
            className="events_number__input" 
            type="number" 
            onChange={this.changeNumOfEvents}
            value={this.state.numberOfEvents}>
        </input> */}
      </Col>
      </>
    );
  }
}

export default NumberOfEvents;
