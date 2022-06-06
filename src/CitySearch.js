import React, { Component } from 'react';
import { InputGroup, FormControl, Col  } from 'react-bootstrap/'
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: false
  }

  handleInputChanged = (event) => {
    this.setState( { showSuggestions: true } );
      const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(event.target.value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: event.target.value,
        infoText: 'We can not find the city you are looking for. Please try another city',
      });
    } else {
      return this.setState({
        query: event.target.value,
        suggestions,
        infoText:''
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
      infoText:''
    });
    this.props.updateEvents(suggestion, undefined);
  }
  
  render() {
    return (
      <>
      <Col>
      {/* <div className="CitySearch">Choose a city to see the events having place there:</div> */}
      <InfoAlert text={this.state.infoText} />
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Events that have place in</InputGroup.Text>
        <FormControl
          placeholder="Type the name of the city you are looking for"
          aria-label="City"
          aria-describedby="basic-input"
          className="city" 
                id="inputGroup-sizing-default"
                value={this.state.query}
                onChange={this.handleInputChanged}
                onFocus={() => { this.setState({ showSuggestions: true }) }}
        />
      </InputGroup>
        {/* <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => { this.setState({ showSuggestions: true }) }}
        /> */}
        <ul className="suggestions" style={this.state.showSuggestions ? {}: { display: 'none' }}>
            {
            this.state.suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => this.handleItemClicked(suggestion)}>{suggestion}</li>
            ))}
            <li onClick={() => this.handleItemClicked("all")}>
              <b>See all cities</b>
            </li>
        </ul>
        </Col>
        </>
    );
  }
}

export default CitySearch;