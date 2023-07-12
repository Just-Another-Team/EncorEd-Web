import React, {useState, useEffect, useRef} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Map from 'react-map-gl'

const mapboxToken = 'pk.eyJ1IjoiYW1hcmlsbG9zaGlubGVlIiwiYSI6ImNsaXV6aXVlMTFnb3czZHF2cDhqZTVrZGkifQ.FAXnyRwlTeFX1y6E8z5LIA'

const MapPage = () => {
    const mapContainer = useRef(null)
    const [longi, setLongi] = useState(123.911976)
    const [lati, setLati] = useState(10.338519)

    const maxbounds = [
        [123.911800, 10.338375], //South West
        [123.912175, 10.338850], //North East
    ]

    const [zoom, setZoom] = useState(12)

    return(
        <Container>
            <Row>
                <Col>
                    <h2>Maps</h2>
                </Col>
            </Row>
            
            <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                <Col md={9}>
                    <Map
                    style={{height: 592}}
                    mapboxAccessToken={mapboxToken}
                    mapStyle='mapbox://styles/mapbox/streets-v12'
                    initialViewState={{
                        latitude: lati,
                        longitude: longi,
                    }}
                    maxBounds={maxbounds}
                    />
                </Col>
            </Row>

        </Container>
    )
}

export default MapPage