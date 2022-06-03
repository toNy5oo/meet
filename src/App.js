import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { Container, Row } from 'react-bootstrap/'
import Header from './Header';


class App extends Component {
    
    constructor(props){
        super(props)
            this.state = {
                events: [],
                locations: [],
                locationSelected: 'all',
                numberOfEvents: 12
            };
    }
    
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

    setNumberOfEvents(value) {
        this.setState({
            numberOfEvents: value
        });
        this.updateEvents(undefined, this.state.numberOfEvents);
    };

    render() {

        return ( 
            <div className = "App" >
                <Header />
                <Container fluid >
                        <Row md={6} className="justify-content-center">
                                <CitySearch locations = { this.state.locations } updateEvents = { this.updateEvents } />
                                <NumberOfEvents numberOfEvents = { this.state.numberOfEvents } setNumberOfEvents = { this.setNumberOfEvents }/>
                        </Row>       
                        <EventList events = { this.state.events } />
                </Container>
            </div>
        );
    }
}

export default App;