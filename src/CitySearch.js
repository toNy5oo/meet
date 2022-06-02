import React, { Component } from 'react';
import { Col } from 'react-bootstrap/'

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
    this.setState({
      query: event.target.value,
      suggestions,
    });
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false
    });
    this.props.updateEvents(suggestion, undefined);
  }
  
  render() {
    return (
      <Col md={5} className="d-flex justify-content-around">
      <div className="CitySearch">Choose a city to see the events having place there:</div>
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => { this.setState({ showSuggestions: true }) }}
        />
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
    );
  }
}

export default CitySearch;