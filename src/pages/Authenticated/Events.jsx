import './calenderStyle.css'
import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import { Calendar } from 'react-calendar'
import { ImageCard } from "../../components/Cards";


const Events = () => {
    return(
        <Stack gap={3} style={{background: '#FFF'}}>
            <h2>Events</h2>

            <Container style={{borderRadius: 12, backgroundColor: '#F6F5FF', padding: 16}}>
                <Row>
                    <h5>Upcoming Event</h5>
                </Row>

                <Row style={{padding: 16, gap: 32, flexDirection: 'row-reverse'}}>
                    <Col
                    style={{
                        height: 240,
                        border: '4px solid #296EB4',
                        borderRadius: 12,
                        backgroundImage: 'url(/assets/EventTestPic.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                    </Col>

                    <Col style={{display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', padding: 0}}>
                        <h2 style={{marginBottom: 30, fontWeight: '700', color: '#1789FC'}}>INFORMATION MANAGEMENT</h2>

                        <Row>
                            <Col xs={3} style={{minWidth: 96}}><h5>Location</h5></Col>
                            <Col><h5 style={{color: '#548BC3'}}>217</h5></Col>
                        </Row>
                        <Row>
                            <Col xs={3} style={{minWidth: 96}}><h5>Date</h5></Col>
                            <Col><h5 style={{color: '#548BC3'}}>MMMM DD, YYYY</h5></Col>
                        </Row>
                        <Row>
                            <Col xs={3} style={{minWidth: 96}}><h5>Schedule</h5></Col>
                            <Col><h5 style={{color: '#548BC3'}}>00:00 AM - 00:00 PM</h5></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Container style={{display: 'flex', flexDirection: 'column', gap: 12, borderRadius: 12, backgroundColor: '#F6F5FF', margin: 8, padding: 16}}>
                <Row>
                    <h5 style={{margin: 0, color: '#296EB4'}}>Events Posted</h5>
                </Row>

                <Row xs={1} sm={2} lg={3} xl={5}>
                    {Array.from({length: 2}).map((el, ind) => (
                        <Col key={ind} style={{marginBottom: 16}}>
                            <ImageCard src='/assets/EventTestPic.png' /> 
                        </Col>
                    ))}
                </Row>
            </Container>

            <div style={{borderRadius: 12, backgroundColor: '#F6F5FF', padding: 16}}>
                <Col>
                    <Calendar calendarType='US' />
                </Col>
            </div>
        </Stack>
    )
}

export default Events