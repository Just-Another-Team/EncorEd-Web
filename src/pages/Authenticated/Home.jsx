import React from "react";
import { CardGroup, Col, Container, Row, Stack } from 'react-bootstrap'
import { ImageCard } from "../../components/Cards";

const Home = () => {
    return(
        <Stack>
            <Container style={{borderRadius: 12, backgroundColor: '#F6F5FF', margin: 8, padding: 24}}>
                <Row>
                    <Col>
                        <h1 style={{margin: 0, padding: 0}}> WELCOME "INSERT FULLNAME HERE"</h1>
                    </Col>
                </Row>
            </Container>

            <Container style={{borderRadius: 12, backgroundColor: '#F6F5FF', margin: 8, padding: 24}}>
                <Row>
                    <Col>
                        <h4>Search bar</h4>
                    </Col>
                </Row>
            </Container>

            <Container style={{display: 'flex', flexDirection: 'column', gap: 12, borderRadius: 12, backgroundColor: '#F6F5FF', margin: 8, padding: 24}}>
                <Row>
                    <Col>
                        <h4>Recent Events</h4>
                    </Col>
                </Row>
                <Row>
                    <Col style={{display: 'flex', width: 1, gap: 12, overflow: 'auto'}}>
                        {Array.from({length: 1}).map((el, ind) => (
                            <ImageCard /> 
                        ))}
                    </Col>
                </Row>
            </Container>

            <Container style={{borderRadius: 12, backgroundColor: '#F6F5FF', margin: 8, padding: 16}}>
                <Row>
                    <Col><h4>Calendar of Events</h4></Col>
                </Row>

                <Row>
                    <Col>
                            "Weekly Calendar Here!"
                    </Col>
                </Row>
            </Container>

            <Container style={{display: 'flex', flexDirection: 'column', gap: 12, borderRadius: 12, backgroundColor: '#F6F5FF', margin: 8, padding: 16}}>
                <Row>
                    <Col>
                        <h4>Subjects</h4>
                    </Col>
                </Row>

                <Row xs={1} sm={2} lg={3} xl={5}>
                    {Array.from({length: 7}).map((el, ind) => (
                        <Col style={{marginBottom: 16}}>
                            <ImageCard /> 
                        </Col>
                    ))}
                </Row>
            </Container>
            
        </Stack>
    )
}

export default Home