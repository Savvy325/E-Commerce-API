import React from 'react';
import { Container, Row } from 'react-bootstrap';
import NavBar from './NavBar';
import '../App.css';

function Home() {
  return (
    <div>
        <NavBar />
        <Row className='home-page'>
          <Container className='w-75'>
            <h1>Welcome to our E-commerce Web Application</h1>
            <h3>Where I honestly have no idea what I'm doing!</h3>
          </Container>
        </Row>
    </div>
  )
}

export default Home