import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { Container, Row, Col } from 'react-bootstrap/'
import Header from './Header';


class App extends Component {

    state = {
        events: [],
        locations: [],
        locationSelected: 'all',
        numberOfEvents: 12
    };

    componentDidMount() {
        this.mounted = true;
        getEvents().then((events) => {
            this.setState({
                locations: extractLocations(events),
                events: events
            });
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    
    updateEvents = (location, eventCount) => {
        if (eventCount === undefined) {
            eventCount = this.state.numberOfEvents;
        } else(
            this.setState({ numberOfEvents: eventCount })
        )
        if (location === undefined) {
            location = this.state.locationSelected;
        }
        console.log(eventCount, location)
        getEvents().then((events) => {
            let locationEvents = location === "all" ?
                events :
                events.filter((event) => event.location === location);
            this.setState({
                events: locationEvents.slice(0, eventCount),
                numberOfEvents: eventCount,
                locationSelected: location,
            });
        })
    }

    render() {

        return ( 
            <div className = "App">
            <Header / >
            <Container>
            <Row className="d-flex justify-content-between">
                <CitySearch locations = { this.state.locations } updateEvents = { this.updateEvents } /> <NumberOfEvents updateEvents = { this.updateEvents } /> 
            </Row> 
            <EventList events = { this.state.events } /> 
            </Container > 
            </div>
        );
    }
}

export default App;