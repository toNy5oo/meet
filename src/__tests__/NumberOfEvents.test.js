import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NOEventsWrapper;
    beforeAll(() => {
        NOEventsWrapper = shallow( < NumberOfEvents / > );
    });

    //Renders correctly the input field
    test('render text input', () => {
        expect(NOEventsWrapper.find('.events_number__input')).toHaveLength(1);
    });

    //Once state changes updates state
    test('react to state change', () => {
        NOEventsWrapper.setState({ numberOfEvents: 16 });
        expect(NOEventsWrapper.state('numberOfEvents')).toEqual(16);
    });

    //After changing the # of events to display, state changes
    test('change numberOfEvents state when number input changes', () => {
        NOEventsWrapper.setState({ numberOfEvents: 16 });
        NOEventsWrapper.find('.events_number__input').simulate('change', { target: { value: 8 } });
        expect(NOEventsWrapper.state('numberOfEvents')).toEqual(8);
    });
})