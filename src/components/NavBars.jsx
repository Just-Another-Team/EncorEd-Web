import { FiHome, FiBook, FiMap, FiCalendar, FiUsers } from 'react-icons/fi'
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap'

const SideBar = () => {

    const links = [
        {name: "Home", href: 'home', icon: <FiHome style={{fontSize: 24}} />},
        {name: "Subjects", href: 'subjects', icon: <FiBook style={{fontSize: 24}} />},
        {name: "Map", href: 'map', icon: <FiMap style={{fontSize: 24}} />},
        {name: "Events", href: 'events', icon: <FiCalendar style={{fontSize: 24}} />},
        {name: "Users and Groups", href: 'groups', icon: <FiUsers style={{fontSize: 24}} />}
    ]

    return(
        <Navbar
        style={{
            padding: 0,
            position: 'fixed',
            alignItems: 'flex-start',
            height: '100%',
            width: 256,
            backgroundColor: '#296EB4'
        }}>
            <Container
            fluid
            style={{padding: 0}}>
                <Nav
                style={{
                    flexDirection: 'column',
                    width: '100%'
                }}>
                    {links.map(el => (
                        <Nav.Link
                        href={el.href}
                        style={{
                            textAlign: 'center',
                            padding: 16,
                            color: '#A9C5E1'
                        }}>
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

export {SideBar}