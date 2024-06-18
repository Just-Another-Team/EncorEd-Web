import Color from "../../assets/Color";
import { CampusMapType } from "../../types/CampusType";
import { DefaultSourceLayerType } from "../../types/DefaultSourceLayerType";

type SourceType = {
    layers: (props: CampusMapType) => Array<DefaultSourceLayerType>
}

export const SourceTile = (selectedFloor: string): Array<DefaultSourceLayerType> => {

    const second = SecondFloorLayers(selectedFloor, undefined)
    const mezzanine = MezzanineFloorLayers(selectedFloor, second[second.length - 1].layerId) //second[second.length - 1].layerId
    const upperFloor = UpperFloorLayer(selectedFloor, mezzanine[mezzanine.length - 1].layerId)
    const ground = GroundLayers(selectedFloor, upperFloor[upperFloor.length - 1].layerId)

    return second.concat(mezzanine, upperFloor, ground)
}

// Each array has the following in order from bottom to top:
// selectedRoom
// points
// routes
// rooms
// roombase
// base

// shall rooms be filtered or based on visibility?

const SecondFloorLayers = (selectedFloor: string, beforeLayer: string | undefined): Array<DefaultSourceLayerType> => [
    {
        type: "fill",
        roomType: "selectedRoom",
        floor: 'second',
        sourceId: 'second_selectedRoom_source',
        tilesetId: 'amarilloshinlee.bv19pa1v',
        layerId: 'second_selectedRoom_layer',
        sourceLayer: 'Secondfloor_rooms-c7j894',
        paint: {
            "fill-color": "#5da8dd",
            "fill-outline-color": "#044e82"
        },
        beforeLayer: beforeLayer,
        visible: selectedFloor === '2' ? 'visible' : 'none',
    },
    {
        type: "fill",
        roomType: "rooms",
        floor: 'second',
        sourceId: 'second_rooms_source',
        tilesetId: 'amarilloshinlee.bv19pa1v',
        layerId: 'second_rooms_layer',
        sourceLayer: 'Secondfloor_rooms-c7j894',
        paint: {
            "fill-color": "#5da8dd",
            "fill-outline-color": "#044e82"
        },
        beforeLayer: "second_selectedRoom_layer",
        visible: selectedFloor === '2' ? 'visible' : 'none',
    },
    {
        type: "fill",
        roomType: "roombase", 
        floor: 'second',
        sourceId:'second_roombase_source',
        tilesetId:'amarilloshinlee.7yltdsio',
        layerId:'second_roombase_layer',
        sourceLayer:'Secondfloor_roombase-015sk5',
        paint: {
            "fill-color": Color('black', 100)
        },
        beforeLayer:'second_rooms_layer',
        visible: selectedFloor === '2' ? 'visible' : 'none',
    },
]

const MezzanineFloorLayers = (selectedFloor: string, beforeLayer: string | undefined): Array<DefaultSourceLayerType> => [
    // {
    //     type: "fill",
    //     roomType: "rooms",
    //     floor: 'mezzanine',
    //     sourceId: 'mezzanine_selectedRoom_source',
    //     tilesetId: 'amarilloshinlee.a1uk4uh4',
    //     layerId: 'mezzanine_selectedRoom_layer',
    //     sourceLayer: 'Mezzanine_rooms-194s6j',
    //     paint: {
    //         "fill-color": "#5da8dd",
    //         "fill-outline-color": "#044e82"
    //     },
    //     beforeLayer: beforeLayer,//"second_roombase_layer",
    //     visible: selectedFloor === 'M' ? 'visible' : 'none',
    // },
    // {
    //     type: "fill",
    //     roomType: "selectedRoom",
    //     floor: 'mezzanine',
    //     sourceId: 'mezzanine_selectedRoom_source',
    //     tilesetId: 'amarilloshinlee.a1uk4uh4',
    //     layerId: 'mezzanine_selectedRoom_layer',
    //     sourceLayer: 'MezzanineRooms-byjbq5',
    //     paint: {
    //         "fill-color": "#e2f2fd",
    //         "fill-outline-color": "#467495"
    //     },
    //     beforeLayer: beforeLayer,
    //     visible: selectedFloor === 'M' ? 'visible' : 'none',
    // },
    {
        type: "fill",
        roomType: "selectedRoom",
        floor: 'mezzanine',
        sourceId: 'mezzanine_selectedRoom_source',
        tilesetId: 'amarilloshinlee.6erkphyp',
        layerId: 'mezzanine_selectedRoom_layer',
        sourceLayer: 'MezzanineRooms-2egv9v',
        paint: {
            "fill-color": "#e2f2fd",
            "fill-outline-color": "#467495"
        },
        beforeLayer: beforeLayer,
        visible: selectedFloor === 'M' ? 'visible' : 'none',
    },
    //points - new path points
    {
        type: "circle",
        roomType: "points",
        floor: 'mezzanine',
        sourceId: 'mezzanine_point_source',
        tilesetId: 'amarilloshinlee.489xojqi',  //amarilloshinlee.8f1ww4th
        layerId: 'mezzanine_point_layer',
        sourceLayer: 'MezzaninePathPoints-8h1svr', //MezzaninePathPoints-7150lg
        paint: {
            // "line-color": Color("gold", 100)
            "circle-color": Color("gold", 100)
        },
        beforeLayer: "mezzanine_selectedRoom_layer",
        visible: 'visible',//selectedFloor === 'M' ? 'visible' : 'none',
    },
    //routes
    {
        type: "line",
        roomType: "routes",
        floor: 'mezzanine',
        sourceId: 'mezzanine_route_source',
        tilesetId: 'amarilloshinlee.8trrjdd2',
        layerId: 'mezzanine_route_layer',
        sourceLayer: 'MezzaninePath-aayi82',
        paint: {
            // "line-color": Color("gold", 100)
        },
        beforeLayer: "mezzanine_point_layer",
        visible: 'visible', //selectedFloor === 'M' ? 'visible' : 'none',
    },
    {
        type: "fill",
        roomType: "rooms",
        floor: 'mezzanine',
        sourceId: 'mezzanine_rooms_source',
        tilesetId: 'amarilloshinlee.6erkphyp',
        layerId: 'mezzanine_rooms_layer',
        sourceLayer: 'MezzanineRooms-2egv9v',
        paint: {
            "fill-color": "#5da8dd",
            "fill-outline-color": "#044e82"
        },
        beforeLayer: "mezzanine_route_layer",
        visible: selectedFloor === 'M' ? 'visible' : 'none',
    },
    { //New room base
        type: "fill",
        roomType: "roombase",
        floor: 'mezzanine',
        sourceId:'mezzanine_roombase_source',
        tilesetId:'amarilloshinlee.51dohh1f',
        layerId:'mezzanine_roombase_layer',
        sourceLayer:'MezzanineRoomBase-0rblwa',
        paint: {
            "fill-color": Color('black', 100)
        },
        beforeLayer:'mezzanine_rooms_layer',
        visible: selectedFloor === 'M' ? 'visible' : 'none',
    },
    {
        type: "fill",
        roomType: "base",
        floor: 'mezzanine',
        sourceId:'mezzanine_base_source',
        tilesetId:'amarilloshinlee.2s38z292',
        layerId:'mezzanine_base_layer',
        sourceLayer:'MezzanineBase-9wiv2w',
        paint: {
            "fill-color": Color('white', 400),
            "fill-outline-color": Color('black', 100)
        },
        beforeLayer:'mezzanine_roombase_layer',
        visible: selectedFloor === 'M' ? 'visible' : 'none',
    },
]

const UpperFloorLayer = (selectedFloor: string, beforeLayer: string | undefined): Array<DefaultSourceLayerType> => [
    {
        type: "fill",
        roomType: "base",
        floor: 'upperfloor',
        sourceId: 'upperfloor_source',
        tilesetId: 'amarilloshinlee.bo2ogul1',
        layerId: 'upperfloor_layer',
        sourceLayer: 'UpperFloorBase-4xth5a',
        paint: {
            //"fill-color": "#0d81d3",
            "fill-color": Color('white', 400),
            "fill-outline-color":  Color('black', 100)
        },
        beforeLayer: beforeLayer,//'mezzanine_roombase_layer',
        visible:  selectedFloor !== 'G' && selectedFloor !== 'B' ? 'visible' : 'none' //selectedFloor === 'M' ? 'visible' : 'none',
    },
]

const GroundLayers = (selectedFloor: string, beforeLayer: string | undefined): Array<DefaultSourceLayerType> => [
    {
        type: "fill",
        roomType: "selectedRoom",
        floor: 'ground',
        sourceId: 'ground_selectedRoom_source',
        tilesetId: 'amarilloshinlee.06trsgln',
        layerId: 'ground_selectedRoom_layer',
        sourceLayer: 'GroundRooms-9mchnr',
        paint: {
            "fill-color": "#e2f2fd",
            "fill-outline-color": "#467495"
        },
        beforeLayer: beforeLayer,
        visible: selectedFloor === 'G' ? 'visible' : 'none',
    },
    {
        type: "circle",
        roomType: "points",
        floor: 'ground',
        sourceId: 'ground_startpoint_source',
        tilesetId: 'amarilloshinlee.908xgcph',
        layerId: 'ground_startpoint_layer',
        sourceLayer: 'GroundPathPoints-cu1r9x',
        paint: {
            // "line-color": Color("gold", 100)
            "circle-color": Color("primaryBlue", 400)
        },
        beforeLayer: "ground_selectedRoom_layer",
        visible: selectedFloor === 'G' ? 'visible' : 'none',
    },
    //points
    {
        type: "circle",
        roomType: "points",
        floor: 'ground',
        sourceId: 'ground_point_source',
        tilesetId: 'amarilloshinlee.908xgcph',
        layerId: 'ground_point_layer',
        sourceLayer: 'GroundPathPoints-cu1r9x',
        paint: {
            // "line-color": Color("gold", 100)
            "circle-color": Color("gold", 100)
        },
        beforeLayer: "ground_startpoint_layer",
        visible: selectedFloor === 'G' ? 'visible' : 'none',
    },
    //routes
    {
        type: "line",
        roomType: "routes",
        floor: 'ground',
        sourceId: 'ground_route_source',
        tilesetId: 'amarilloshinlee.2s4cc2w2', //amarilloshinlee.2s4cc2w2
        layerId: 'ground_route_layer',
        sourceLayer: 'GroundPath-3b8cia', //GroundPath-3b8cia
        paint: {
            "line-color": Color("black", 100)
        },
        beforeLayer: "ground_point_layer",
        visible: selectedFloor === 'G' ? 'visible' : 'none',
    },
    //rooms
    {
        type: "fill",
        roomType: "rooms",
        floor: 'ground',
        sourceId: 'ground_rooms_source',
        tilesetId: 'amarilloshinlee.06trsgln',
        layerId: 'ground_rooms_layer',
        sourceLayer: 'GroundRooms-9mchnr',
        paint: {
            "fill-color": "#5da8dd",
            "fill-outline-color": "#044e82"
        },
        beforeLayer: "ground_route_layer",
        visible: selectedFloor === 'G' ? 'visible' : 'none',
    },
    {
        type: "fill",
        roomType: "roombase",
        floor: 'ground',
        sourceId:'ground_roombase_source',
        tilesetId:'amarilloshinlee.55wnmffh',
        layerId:'ground_roombase_layer',
        sourceLayer:'GroundRoomBase-7111ns',
        paint: {
            //"fill-color": "#0668ae",
            "fill-color": Color('black', 200)
        },
        beforeLayer:'ground_rooms_layer',
        visible: selectedFloor === 'G' ? 'visible' : 'none',
    },
    {
        type: "fill",
        roomType: "base",
        floor: 'ground',
        sourceId: 'ground_base_source',
        tilesetId: 'amarilloshinlee.96hf9d56',
        layerId: 'ground_base_layer',
        sourceLayer: 'GroundBase-d94vp4',
        paint: {
            //"fill-color": "#0d81d3",
            "fill-color": Color('white', 400),
            "fill-outline-color": Color('black', 100)
        },
        beforeLayer: 'ground_roombase_layer',
        visible: selectedFloor === 'G' ? 'visible' : 'none',
    },
]