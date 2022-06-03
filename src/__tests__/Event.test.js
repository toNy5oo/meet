import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
            let EventWrapper;

            //Bind to the 1st element in the MockData array
            beforeAll(() => {
                    EventWrapper = shallow( < Event event = { mockData[0] }
                        />);
                    });

                //If event exists
                test('render an event', () => {
                    expect(EventWrapper.find('.event')).toHaveLength(1);
                })

                //If location exists
                test('render a location', () => {
                    expect(EventWrapper.find('.location')).toHaveLength(1);
                })

                //If summary exists
                test('render the summary', () => {
                    expect(EventWrapper.find('.summary')).toHaveLength(1);
                })

                //If date exists
                test('render the date', () => {
                    expect(EventWrapper.find('.start-date')).toHaveLength(1);
                })

                //Extra info not visible at start
                test('not render the extra info by default', () => {
                    expect(EventWrapper.find('.extra-info')).toHaveLength(0);
                })

                //Show extra info div if btn clicked
                test('render the extra info after btn click', () => {
                    EventWrapper.setState({
                        showDetails: false,
                    });
                    EventWrapper.find('.details-button').simulate('click');
                    expect(EventWrapper.find('.extra-details')).toHaveLength(1);
                })

                test('open extra details if button is clicked', () => {
                    EventWrapper.setState({
                        showDetails: true,
                    });
                    EventWrapper.find('.details-button').simulate('click');
                    expect(EventWrapper.state('showDetails')).toBeFalsy();
                })

                test('hide extra details if button is clicked', () => {
                    EventWrapper.setState({
                        showDetails: false,
                    });
                    EventWrapper.find('.details-button').simulate('click');
                    expect(EventWrapper.state('showDetails')).toBeTruthy()
                })

                test('change state when function isClicked is called', () => {
                    EventWrapper.setState({
                        showDetails: false,
                    });
                    EventWrapper.instance().isClicked();
                    expect(EventWrapper.state('showDetails')).toBeTruthy()
                })

            })