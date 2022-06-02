import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { Container, Row, Col, Card } from 'react-bootstrap/'


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
            if (this.mounted) {
                getEvents().then((events) => {
                    this.setState({
                        locations: extractLocations(events),
                        events: events
                    });
                });
            }
        });
    }
    componentWillUnmount() {
        this.mounted = false;
    }

    updateEvents = (location, eventCount) => {
        if (eventCount === undefined) {
            eventCount = this.state.numberOfEvents;
        }
        if (location === undefined) {
            location = this.state.locationSelected;
        }
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

    setNumberOfEvents = (numberOfEvents) => {
        this.setState({
            numberOfEvents,
        });
        this.updateEvents(undefined, numberOfEvents);
    };

    render() {

        return ( <
            div className = "App" >
            <
            Container fluid >
            <
            Row md = { 10 } >
            <
            Col className = "d-flex justify-content-between" >
            <
            CitySearch locations = { this.state.locations }
            updateEvents = { this.updateEvents }
            />  <
            NumberOfEvents numberOfEvents = { this.state.numberOfEvents }
            setNumberOfEvents = { this.setNumberOfEvents }
            />  <
            /Col> <
            /Row> <
            Row md = { 10 } >
            <
            Col md = { 3 }
            className = "d-flex justify-content-center" >
            <
            EventList events = { this.state.events }
            /> <
            /Col> <
            /Row> <
            /Container>   <
            /div>
        );
    }
}

export default App;