import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  // EventsList component 
  test('render EventsList', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  // CitySearch component
  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  // NumberOfEvents component
  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

//INTEGRATION TESTS
describe('<App /> integration', () => {
  
  let AppWrapper;
  
  beforeAll(() => {
    AppWrapper = mount(<App />);
  });
  afterAll(() => {
    AppWrapper.unmount();
  });

  test('App passes "events" state as a prop to EventList', () => {
    const EventsState = AppWrapper.state('events');
    expect(EventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events.lenght).toEqual(EventsState.lenght);
    
  });

 test('App passes "locations" state as a prop to CitySearch', () => {
  const LocationsState = AppWrapper.state('locations');
  expect(LocationsState).not.toEqual(undefined);
  expect(AppWrapper.find(CitySearch).props().locations.lenght).toEqual(LocationsState.lenght);
});

test('get list of events matching the city selected by the user', async () => {
  const CitySearchWrapper = AppWrapper.find(CitySearch);
  const locations = extractLocations(mockData);
  CitySearchWrapper.setState({ suggestions: locations });
  const suggestions = CitySearchWrapper.state('suggestions');
  const selectedIndex = Math.floor(Math.random() * (suggestions.length));
  const selectedCity = suggestions[selectedIndex];
  await CitySearchWrapper.instance().handleItemClicked(selectedCity);
  const allEvents = await getEvents();
  const eventsToShow = allEvents.filter(event => event.location === selectedCity);
  expect(AppWrapper.state('events')).toEqual(eventsToShow);
});

test('get list of all events when user selects "See all cities"', async () => {
  const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
  await suggestionItems.at(suggestionItems.length - 1).simulate('click');
  const allEvents = await getEvents();
  expect(AppWrapper.state('events')).toEqual(allEvents);
});

test('changing number of events through function', () => {
  AppWrapper.instance().setNumberOfEvents(10);
  expect(AppWrapper.state('numberOfEvents')).toEqual(10);
});

});
