import './calenderStyle.css'
import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import { Calendar } from 'react-calendar'

const Events = () => {
    return(
        <Stack gap={3} style={{background: '#FFF'}}>
            <h2>Events</h2>

            <Container style={{borderRadius: 12, backgroundColor: '#F6F5FF', padding: 16}}>
                <Row>
                    <h5>Upcoming Event</h5>
                </Row>

                <Row>
                    <Col>
                        <h3>EVENT NAME</h3>


                    </Col>

                    <Col>
                        <p>IMAGE GOES HERE</p>
                    </Col>
                </Row>
            </Container>

            <div style={{borderRadius: 12, backgroundColor: '#F6F5FF', padding: 16}}>
                <h5>Events Posted</h5>
            </div>

            <div style={{borderRadius: 12, backgroundColor: '#F6F5FF', padding: 16}}>
                <Col>
                    <Calendar calendarType='US' />
                </Col>
            </div>
        </Stack>
    )
}

export default Events