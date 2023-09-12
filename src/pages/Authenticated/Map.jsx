import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Map, { Layer, Source } from 'react-map-gl'
import { Mezzanine } from '../../components/svgMap'

const mapboxToken = 'pk.eyJ1IjoiYW1hcmlsbG9zaGlubGVlIiwiYSI6ImNsaXV6aXVlMTFnb3czZHF2cDhqZTVrZGkifQ.FAXnyRwlTeFX1y6E8z5LIA'

const MapPage = () => {
    const [longi, setLongi] = useState(123.911976)
    const [lati, setLati] = useState(10.338519)

    const maxbounds = [
        [123.911800, 10.338375], //South West
        [123.912175 , 10.338850], //North East
    ]

    const [zoom, setZoom] = useState(12)

    const [clickInfo, setClickInfo] = useState(null)

    const selectRoomClick = useCallback(event => {
        const room = event.features && event.features[0]

        if (room === undefined) return;

        setClickInfo({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
            roomName: room.properties.Name  
        })

        alert(room.properties.Name)
    }, [])

    const selectRoom = (clickInfo && clickInfo.roomName) || ''
    const roomFilter = useMemo(() => ['in', 'Name', selectRoom], [selectRoom])

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
                        zoom: zoom
                    }}
                    interactiveLayerIds={["MezzanineFill"]}
                    onMouseDown={selectRoomClick}
                    maxBounds={maxbounds}
                    >
                        {/* Sources based on floors */}
                        <Source id='Mezzanine' type='vector' url='mapbox://amarilloshinlee.clkak13yd02412bntayv0jqcz-42res'>
                            <Layer
                            id='MezzanineFill'
                            type='fill'
                            source='Mezzanine'
                            source-layer='Indoors_Test'
                            paint={{
                                // Basic
                                "fill-opacity": 0.75,
                                "fill-color": "#A0a0a0"

                                // Selected
                                // "fill-color": "#32a852"
                            }}
                            />
                            <Layer
                            id='MezzanineHighLightFill'
                            type='fill'
                            source='MezzanineFill'
                            source-layer='Indoors_Test'
                            paint={{
                                "fill-color": "#32a852"
                            }}
                            filter={roomFilter}
                            />
                        </Source>
                    </Map>
                </Col>
            </Row>

        </Container>
    )
}

export default MapPage