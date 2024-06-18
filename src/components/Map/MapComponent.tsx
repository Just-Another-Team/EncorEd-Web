import mapboxgl, { CirclePaint, FillPaint, LinePaint, LngLatBoundsLike } from "mapbox-gl";
import { CSSProperties, Ref, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map, { Layer, MapLayerMouseEvent, MapRef, Popup, ScaleControl, Source, ViewStateChangeEvent } from 'react-map-gl';
import { DefaultSourceLayerType } from "../../types/DefaultSourceLayerType";
import { CampusMapType } from "../../types/CampusType";
import { SourceTile } from "./MapLayers";
import { Box, Button, Typography } from "@mui/material";
import Color from "../../assets/Color";
import SourceLayer from "./SourceLayer";
import bbox from "@turf/bbox";
import IRoom from "../../data/IRoom";
import { useMapboxNavigation } from "../../hooks/useMapboxNavigation";
import IGraphData from "../../data/IGraphData";
import { PathInputType } from "../../data/IPathData";
import { FixMeLater } from "../../types/FixMeLater";
import { useRooms } from "../../hooks/useRooms";
import { uniqueId } from "lodash";
import IFloor from "../../data/IFloor";

type PathPointType = {
    id: number,
    neighbors: string,
    roomId: string
}

// Rules:
// basement     = 0
// ground       = 1
// mezzanine    = 2
// second       = 3

const MapComponent = (props:CampusMapType) => {
    const { floors } = useRooms()
    const { selectedRoom, selectedFloor, destination, setRoom, setFloor, addSearchLog, initializeGraph, generatePath } = useMapboxNavigation()

    const [initializedGraph, setGraph] = useState<{graph: Array<any>, edges: Array<{id: number, points: Array<number>}>}>({ graph: [], edges: [] })
    const [routes, setRoutes] = useState<Array<number>>([])
    const [stairs, setStairs] = useState<Array<{id: number, neighbors: Array<number>, coordinates: Array<number>}>>([])
    const mapRef = useRef<MapRef>()

    const interactiveLayers = ['second_rooms_layer', 'mezzanine_rooms_layer', 'ground_rooms_layer', 'basementfloor_rooms_layer']
    const mapStyle: CSSProperties = {
        width: '100%',
        height: "100%",
        backgroundColor: 'transparent',
    }
    const maxBounds: LngLatBoundsLike = [
        [123.911200, 10.337970], //sw
        [123.912675, 10.339146], //ne
    ]

    const handleGoingUp = () => {
        let currentFloor = selectedFloor?.FLR_LEVEL as number;
        ++currentFloor;

        const nextFloor = floors.find(floor => floor.FLR_LEVEL === currentFloor)

        setFloor(nextFloor!)
    }

    const onHandleLoad = async (e: mapboxgl.MapboxEvent<undefined>) => {
        const vertices = SourceTile(props.selectedFloor).filter(source => source.roomType === "points").filter(source => source.sourceId !== "ground_startpoint_source").map(source => ({
            id: source.sourceId,
            sourceLayer: source.sourceLayer,
            floor: source.floor === "second" ? 3 : source.floor === "mezzanine" ? 2 : 1
        }))
        const edges = SourceTile(props.selectedFloor).filter(source => source.roomType === "routes").map(source => ({
            id: source.sourceId,
            sourceLayer: source.sourceLayer
        }))

        // This became Two dimensional
        const initialVertex = vertices.map((vertexSourceLayer) => {
                                    const sourceFeatures = e.target.querySourceFeatures(vertexSourceLayer.id, {
                                        sourceLayer: vertexSourceLayer.sourceLayer,
                                    }).map((feature) => ({
                                        id: (feature.properties as any).id,
                                        neighbors: JSON.parse((feature.properties as any).neighbors),
                                        coordinates: [...(feature.geometry as any).coordinates, vertexSourceLayer.floor]
                                    }))

                                    return sourceFeatures
                                }).flat(Infinity)

        // const vertexSourceLayers = vertices.map((vertexSourceLayer) => {
        //     const sourceFeatures = e.target.querySourceFeatures(vertexSourceLayer.id, {
        //         sourceLayer: vertexSourceLayer.sourceLayer,
        //     }).map((feature) => ({
        //         id: (feature.properties as any).id,
        //         neighbors: JSON.parse((feature.properties as any).neighbors),
        //         coordinates: [...(feature.geometry as any).coordinates, vertexSourceLayer.floor]
        //     }))

        //     return sourceFeatures
        // })[2]

        const vertexSourceLayers = Array.from(new Set(initialVertex.map(vertex => (vertex as FixMeLater).id))).map(id => initialVertex.find(a => (a as FixMeLater).id === id))
        //vertices

        

        //const uniqueVertex = Array.from(new Set(initialVertex.map(vertex => (vertex as FixMeLater).id))).map(id => initialVertex.find(a => (a as FixMeLater).id === id))

        const initialEdges = edges.map((vertexSourceLayer) => {
                                const sourceFeatures = e.target.querySourceFeatures(vertexSourceLayer.id, {
                                    sourceLayer: vertexSourceLayer.sourceLayer,
                                }).map((feature) => {
                                    return ({
                                        id: (feature.properties as any).id,
                                        points: JSON.parse((feature.properties as any).points),
                                    })
                                })

                                return sourceFeatures
                            }).flat(Infinity)

        const edgeSourceLayers = Array.from(new Set(initialEdges.map(vertex => (vertex as FixMeLater).id))).map(id => initialEdges.find(a => (a as FixMeLater).id === id))

        // const edgeSourceLayers = edges.map((vertexSourceLayer) => {
        //     const sourceFeatures = e.target.querySourceFeatures(vertexSourceLayer.id, {
        //         sourceLayer: vertexSourceLayer.sourceLayer,
        //     })
        //     .map((feature) => ({
        //         id: (feature.properties as any).id,
        //         points: JSON.parse((feature.properties as any).points),
        //     }))

        //     return sourceFeatures
        // })[1]

        const data: IGraphData = {
            vertices: vertexSourceLayers as FixMeLater,
            edges: edgeSourceLayers as FixMeLater
        }

        const graph = (await initializeGraph(data)).data
        setGraph(graph)

        const startVertex = vertexSourceLayers.filter(vertex => (vertex as FixMeLater).id === 1001)
        //console.log(startVertex)
        setStairs(startVertex as FixMeLater)
    }

    const handleDrag = (e: ViewStateChangeEvent) => {
        if (!destination) setRoom(undefined)
    }

    const handleClickMap = (e: MapLayerMouseEvent) => {
        const room = (e.features as mapboxgl.MapboxGeoJSONFeature[])[0]

        if (!room) {
            setRoom(undefined)
            setRoutes([])
            return
        }
        
        const roomProperties = room.properties as IRoom

        addSearchLog(roomProperties)
        setRoom(roomProperties)
    }

    const selectedRoomQuery = (filter?: Array<any>, floor?: IFloor) => {
        const floorLevel = floor?.FLR_LEVEL === 3 ? "second" :  floor?.FLR_LEVEL === 2 ? "mezzanine" : "ground"
        const roomSourceLayer = SourceTile(props.selectedFloor).find(source => source.roomType === "rooms" && source.floor === floorLevel)

        const room = mapRef.current?.querySourceFeatures(`${floorLevel}_rooms_source`, {
            sourceLayer: roomSourceLayer?.sourceLayer,
            filter: filter,
        })[0]

        return room
    }

    // Activate when a room is selected
    useEffect(() => {
        console.log(roomFilter, selectedFloor)

        if (!selectedRoom) return

        const roomQuery = selectedRoomQuery(roomFilter, selectedFloor)
        if (!roomQuery) {
            console.log("Room Query: ", roomQuery)
            return
        }

        const [minLng, minLat, maxLng, maxLat] = bbox(roomQuery)

        const midLat = (minLat + maxLat) / 2
        const midLng = (minLng + maxLng) / 2

        mapRef.current?.flyTo({
            center: [midLng, midLat]
        })

        // mapRef.current?.fitBounds([
        //     [minLng, minLat],
        //     [maxLng, maxLat]
        // ], {padding: 5, duration: 1000})
    }, [selectedFloor, selectedRoom])

    // Active when clicking on "Navigate" 
    useEffect(() => {
        if (!destination) return

        //query the destination point by the roomID
        const floorLevel = selectedFloor?.FLR_LEVEL === 3 ? "second" :  selectedFloor?.FLR_LEVEL === 2 ? "mezzanine" : "ground"
        const pointSourceLayer = SourceTile(props.selectedFloor).find(source => source.roomType === "points" && source.floor === floorLevel)

        // mapRef.current?.querySourceFeatures(`${floorLevel}_point_source`, {
        //     sourceLayer: pointSourceLayer?.sourceLayer,
        //     filter: ['in', 'roomId', destination.ROOM_ID],
        // }).map(point => {
        //     console.log(point.properties)
        // })

        // if (mapRef.current?.querySourceFeatures(`${floorLevel}_point_source`).length === 0) {
        //     console.log("Error Occured", `${floorLevel}_point_source`)
        //     return
        // }

        const destinationPoint = mapRef.current?.querySourceFeatures(`${floorLevel}_point_source`, {
            sourceLayer: pointSourceLayer?.sourceLayer,
            filter: ['in', 'roomId', destination.ROOM_ID],
        })[0]

        if (!destinationPoint) {
            alert("Error Occured: Id of room is undefined. Contact the EncorEd Administrators for this error")
            return
        }

        //generate Path
        const data: PathInputType = {
            graph: initializedGraph.graph,
            edges: initializedGraph.edges,
            origin: 1001,
            destination: (destinationPoint?.properties as PathPointType).id,
        }

        generatePath(data)
            .then((result) => {
                console.log(result.data)
                
                setRoutes((result.data as FixMeLater).routes)

                mapRef.current?.flyTo({
                    zoom: 19.15,
                    center: [123.911986, 10.338586]
                })
            })
            .catch((error) => {
                console.error(error)
                //show modal of error
            })
    }, [destination])

    const room = (selectedRoom && selectedRoom.ROOM_ID) || ''
    const roomFilter = useMemo(() => ['in', 'ROOM_ID', room], [room])
    const routeFilter = useMemo(() => ['in', 'id', ...routes], [routes])

    return (
        <Map
        ref={mapRef as Ref<MapRef>}
        onLoad={onHandleLoad}
        mapboxAccessToken={props.accessToken}
        initialViewState={{
            longitude: 123.911986,
            latitude: 10.338586,
            zoom: 19.25
        }}
        maxBounds={maxBounds}
        interactiveLayerIds={interactiveLayers}
        style={mapStyle}
        maxPitch={0}
        onClick={handleClickMap}
        onDrag={handleDrag}
        mapStyle="mapbox://styles/amarilloshinlee/clqoecjrx00b001po715sho0g">
            {SourceTile(props.selectedFloor).map((el, ind) => {
                return (
                    <SourceLayer
                    key={ind}
                    layerType={el.type}
                    filter={el.roomType === "selectedRoom" ? roomFilter : el.roomType === "points" && el.sourceId !== "ground_startpoint_source" ? ['in', 'id', 1301, 1302, 1303] : el.sourceId === "ground_startpoint_source" ? ['in', 'id', 1001] : el.roomType === "routes" ? routeFilter : ["all", true]}
                    sourceId={el.sourceId}
                    tilesetId={el.tilesetId}
                    layerId={el.layerId}
                    sourceLayer={el.sourceLayer}
                    beforeLayer={el.beforeLayer}
                    layerLayout={{
                        visibility: el.visible
                    }}
                    paint={el.paint}/>
                )
            })}
            {stairs.map(stair => (
                <Popup
                longitude={stair.coordinates[0]}
                latitude={stair.coordinates[1]}
                closeButton={false}>
                    <Typography>You are located here</Typography>
                </Popup>
            ))}
            <ScaleControl
            maxWidth={256}/>
        </Map>
    )
}

export default MapComponent;