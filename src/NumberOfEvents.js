import React, { Component } from 'react';


class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 12,
    }

    handleChange = (event) => {
        let numOfEvents = parseInt(event.target.value)
        this.setState({
            numberOfEvents: numOfEvents
          });
          this.props.setNumberOfEvents(numOfEvents);
        } 

  render() {
    return (
      <div className="numberOfEvents">Events to show:
      <input 
            className="events_number__input" 
            type="number" 
            onChange={this.handleChange}
            value={this.state.numberOfEvents}>
        </input>
        </div>
      
    );
  }
}

export default NumberOfEvents;
