//tag <navbar>
// use bootsrap components
import React from "react"
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Outlet } from "react-router-dom"
import { SideBar } from "../../components/NavBars"

const DashboardLayout = () => {

    return ( 
        <Container fluid style={{height: '100vh'}}>

            <Row style={{minHeight: 72}}>
                <Row style={{backgroundColor: '#45A1FD', minHeight: 72, margin: 0, padding: 0, position: 'fixed', zIndex: 1}}>
                    <Col style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                        <img width={48} height={48} src='/assets/Logo.png'/>
                        <h4 style={{padding: 0, margin: 0, fontWeight: '700'}}>EncorEd</h4>
                    </Col>

                    <Col style={{display: 'flex', flexDirection: "row-reverse", gap: 24, alignItems: 'center'}}>
                        <Button size="sm" style={{fontWeight: '700', borderRadius: 24, paddingLeft: 32, paddingRight: 32}}>
                            LOGOUT
                        </Button>

                        <h5 style={{padding: 0, margin: 0}}>User Full name</h5>
                    </Col>
                </Row>
            </Row>

            <Row>
                <Col style={{maxWidth: 256, padding: 0}}>
                    <SideBar />
                </Col>

                <Col style={{border: '1px solid black', padding: 16}}>
                    <Outlet />
                </Col>
            </Row>

        </Container>
    ) 
}
export default DashboardLayout