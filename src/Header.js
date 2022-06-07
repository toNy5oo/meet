import React from 'react'
import {Container, Navbar} from 'react-bootstrap'
import {BsFillPeopleFill} from 'react-icons/bs'

function Header() {
  return (
    <Navbar bg="white" variant="white">
    <Container>
      <Navbar.Brand href="#home" className="header">
        <BsFillPeopleFill />{' '}
          Meetup App - Meet other people while learning what you love!
      </Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default Header


