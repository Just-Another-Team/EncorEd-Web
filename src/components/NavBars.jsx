import "../styles/NavBar.css"
import { useEffect, useState } from "react"
import { FiHome, FiBook, FiMap, FiCalendar, FiUsers } from 'react-icons/fi'
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap'

const TopNav = () => {
    return (
        <Row className="topNav">
            <Col>
                <img width={48} height={48} src='/assets/Logo.png'/>
                <h4 style={{padding: 0, margin: 0, fontWeight: '700', color: '#296EB4'}}>Encor<span style={{color: '#FDB833'}}>Ed</span></h4>
            </Col>

            <Col>
                <Button size="sm" style={{fontWeight: '700', borderRadius: 24, paddingLeft: 32, paddingRight: 32}}>
                    LOGOUT
                </Button>

                <h5 style={{color: '#F6F5FF', padding: 0, margin: 0}}>User Full name</h5>
            </Col>
        </Row>
    )
}

const SideBar = () => {

    const links = [
        {name: "Home", key: 'home', href: 'home', icon: <FiHome style={{fontSize: 24}} />},
        {name: "Subjects", key: 'subjects', href: 'subjects', icon: <FiBook style={{fontSize: 24}} />},
        {name: "Map", key: 'map', href: 'map', icon: <FiMap style={{fontSize: 24}} />},
        {name: "Events", key: 'events', href: 'events', icon: <FiCalendar style={{fontSize: 24}} />},
        {name: "Users and Groups", key: 'groups', href: 'groups', icon: <FiUsers style={{fontSize: 24}} />}
    ]

    return(
        <Navbar>
            <Container
            fluid
            style={{padding: 0}}>
                <Nav
                activeKey={JSON.parse(localStorage.getItem('link'))}
                onSelect={(selectedLink) => {localStorage.setItem('link', JSON.stringify(selectedLink))}}>
                    {links.map(el => (
                        <Nav.Link
                        key={el.key}
                        href={el.href}
                        >
                            <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                paddingLeft: 18
                            }}>
                                {el.icon}
                                <h6 style={{margin: 0}}>{el.name}</h6>
                            </div>
                        </Nav.Link>
                    ))}
                </Nav>
            </Container>
        </Navbar>
    )
}

export {SideBar, TopNav}