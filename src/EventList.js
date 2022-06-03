import React, { Component } from "react";
import Event from "./Event";
import { Row, Col } from 'react-bootstrap'

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <Row className="Eventlist d-flex">
        {events.map((event) => (
          <Col md={3} key={event.id}>
            <Event event={event} />
          </Col>
        ))}
      </Row>
    );
  }
}

export default EventList;
