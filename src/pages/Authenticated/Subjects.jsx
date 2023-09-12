import React from 'react'
import { Container, Stack, Row, Col } from 'react-bootstrap'
import { ImageCard } from "../../components/Cards";

const Subjects = () => {
    return(
        <Stack gap={3}>
            <h2 style={{margin: 0, color: '#FDC65C'}}>Subjects</h2>

            <Container style={{borderRadius: 12, backgroundColor: '#F6F5FF', padding: 16}}>
                <Row>
                    <h5 style={{margin: 0, color: '#296EB4'}}>Upcoming Subject</h5>
                </Row>

                <Row style={{padding: 16, gap: 32, flexDirection: 'row-reverse'}}>
                    <Col
                    style={{
                        height: 240,
                        border: '4px solid #296EB4',
                        borderRadius: 12,
                        backgroundImage: 'url(/assets/SubjectTestPic.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                    </Col>

                    <Col style={{display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', padding: 0}}>
                        <h2 style={{marginBottom: 30, fontWeight: '700', color: '#1789FC'}}>INFORMATION MANAGEMENT</h2>

                        <Row>
                            <Col xs={3} style={{minWidth: 96}}><h5>Room</h5></Col>
                            <Col><h5 style={{color: '#548BC3'}}>217</h5></Col>
                        </Row>
                        <Row>
                            <Col xs={3} style={{minWidth: 96}}><h5>Schedule</h5></Col>
                            <Col><h5 style={{color: '#548BC3'}}>10:00 AM - 11:00 AM (Friday)</h5></Col>
                        </Row>
                        <Row>
                            <Col xs={3} style={{minWidth: 96}}><h5>Code</h5></Col>
                            <Col><h5 style={{color: '#548BC3'}}>74595</h5></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Container style={{display: 'flex', flexDirection: 'column', gap: 12, borderRadius: 12, backgroundColor: '#F6F5FF', margin: 8, padding: 16}}>
                <Row>
                    <h5 style={{margin: 0, color: '#296EB4'}}>Subjects Enrolled</h5>
                </Row>

                <Row xs={1} sm={2} lg={3} xl={5}>
                    {Array.from({length: 7}).map((el, ind) => (
                        <Col key={ind} style={{marginBottom: 16}}>
                            <ImageCard src='/assets/SubjectTestPic.png' /> 
                        </Col>
                    ))}
                </Row>
            </Container>

        </Stack>
    )
}

export default Subjects