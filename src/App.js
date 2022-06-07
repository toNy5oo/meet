import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import './nprogress.css';
import { Container, Row } from 'react-bootstrap/'
import Header from './Header';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';

class App extends Component {

    state = {
        events: [],
        locations: [],
        locationSelected: 'all',
        numberOfEvents: 12,
        showWelcomeScreen: undefined
    };
    
    async componentDidMount() {
            this.mounted = true;
            const accessToken = localStorage.getItem('access_token');
            const isTokenValid = (await checkToken(accessToken)).error ? false : true;
            const searchParams = new URLSearchParams(window.location.search);
            const code = searchParams.get("code");
            this.setState({ showWelcomeScreen: !(code || isTokenValid) });
                if ((code || isTokenValid) && this.mounted) {
                        getEvents().then((events) => {
                            if (this.mounted) {
                            this.setState({ events, locations: extractLocations(events) });
                        }
                        });
                }
                
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
        //if (this.state.showWelcomeScreen === undefined) return <div className="App" />
        
        return ( 
            <div className = "App">
            {!navigator.onLine && <OfflineAlert text={'You are currently offline, data may be not updated.'}/>}
            <Header / >
            <Container>
            <Row className="d-flex justify-content-between p-3 m-3">
                <CitySearch locations = { this.state.locations } updateEvents = { this.updateEvents } /> <NumberOfEvents updateEvents = { this.updateEvents } /> 
            </Row> 
            <EventList events = { this.state.events } /> 
            {/* <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} /> */}

            </Container > 
            </div>
        );
    }
}

export default App;