import mapboxgl, { CirclePaint, FillPaint, LinePaint } from "mapbox-gl";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import Map, { Layer, MapLayerMouseEvent, Source } from 'react-map-gl';
import { DefaultSourceLayerType } from "../../types/DefaultSourceLayerType";
import { CampusMapType } from "../../types/CampusType";
import { SourceTile } from "./MapLayers";
import { Box } from "@mui/material";

const DefaultSourceLayer = ({
    sourceId,
    tilesetId,
    layerId,
    sourceLayer,
    paint,
    beforeLayer,
    visible,
    type,
}: DefaultSourceLayerType) => {

    return (
        <Source
        id={sourceId}
        type="vector"
        url={`mapbox://${tilesetId}`}>
            <Layer
            id={layerId}
            type='fill'
            source={sourceId}
            source-layer={sourceLayer}
            beforeId={beforeLayer}
            layout={{
                visibility: visible
            }}
            paint={paint as FillPaint} />
            
            <Layer
            id={layerId}
            type='line'
            source={sourceId}
            source-layer={sourceLayer}
            beforeId={beforeLayer}
            layout={{
                visibility: visible
            }}
            paint={paint as LinePaint} />

            <Layer
            id={layerId}
            type='circle'
            source={sourceId}
            source-layer={sourceLayer}
            beforeId={beforeLayer}
            layout={{
                visibility: visible
            }}
            paint={paint as CirclePaint} />
        </Source>
    )
}

const MapComponent = (props:CampusMapType) => {
    mapboxgl.accessToken = props.accessToken

    const interactiveLayers = ['secondfloor_rooms_layer', 'mezzanine_rooms_layer', 'groundfloor_rooms_layer', 'basementfloor_rooms_layer']
    const mapStyle: CSSProperties = {
        width: '100%',
        height: "100%",
        backgroundColor: 'transparent',
    }
    const maxBounds = [
        [123.911200, 10.337970], //sw
        [123.912675, 10.339146], //ne
    ]

    const mapContainer = useRef(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const [viewState, setViewState] = useState({
        longitude: 123.911986,
        latitude: 10.338586,
        zoom: 19.25
    })

    const onHandleLoad = (e: mapboxgl.MapboxEvent<undefined>) => {
        console.log('On Load: ', e)
    }

    const handleClickMap = (e: MapLayerMouseEvent) => {
        const room = (e.features as mapboxgl.MapboxGeoJSONFeature[])[0]

        console.log(room.properties)
    }

    // useEffect(() => {
    //     if (map.current) return;

    //     map.current = new mapboxgl.Map({
    //         container: mapContainer.current!,
    //         style: 'mapbox://styles/mapbox/streets-v12',
    //         center: [viewState.longitude, viewState.latitude],
    //         zoom: viewState.zoom
    //     })

    //     const currentMap = map.current

    //     currentMap.on('load', () => {
    //         //currentMap.addSource()
    //     })

    //     currentMap.on('move', () => {
    //         setViewState({
    //             latitude: currentMap.getCenter().lat,
    //             longitude: currentMap.getCenter().lng,
    //             zoom: currentMap.getZoom()
    //         })
    //     })

    //     map.current.on('click', handleClickMap)

    // }, [])

    return (
        <Map
        onLoad={onHandleLoad}
        mapboxAccessToken={props.accessToken}
        initialViewState={{
            longitude: 123.911986,
            latitude: 10.338586,
            zoom: 19.25
        }}
        maxBounds={[
            [123.911200, 10.337970], //sw
            [123.912675, 10.339146], //ne
        ]}
        interactiveLayerIds={interactiveLayers}
        style={mapStyle}
        maxPitch={0}
        onClick={handleClickMap}
        mapStyle="mapbox://styles/amarilloshinlee/clqoecjrx00b001po715sho0g">
            {SourceTile(props.selectedFloor).map((el, ind) => (
                <DefaultSourceLayer
                key={ind}
                type={el.type}
                sourceId={el.sourceId}
                tilesetId={el.tilesetId}
                layerId={el.layerId}
                sourceLayer={el.sourceLayer}
                beforeLayer={el.beforeLayer}
                visible={el.visible}
                paint={el.paint}/>
            ))}
        </Map>
    )

    // return (
    //     <Box
    //     ref={mapContainer}
    //     sx={mapStyle}/>
    // )

}

export default MapComponent;