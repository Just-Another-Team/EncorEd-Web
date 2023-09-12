//tag <navbar>
// use bootsrap components
import React from "react"
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Outlet } from "react-router-dom"
import { SideBar, TopNav } from "../../components/NavBars"

const DashboardLayout = () => {

    return ( 
        <Container fluid style={{height: '100vh'}}>

            <Row style={{minHeight: 72}}>
                <TopNav />
            </Row>

            <Row>
                <Col style={{maxWidth: 256, padding: 0}}>
                    <SideBar />
                </Col>

                <Col style={{padding: 16}}>
                    <Outlet />
                </Col>
            </Row>

        </Container>
    ) 
}
export default DashboardLayout