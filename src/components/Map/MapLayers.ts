import Color from "../../assets/Color";
import { CampusMapType } from "../../types/CampusType";
import { DefaultSourceLayerType } from "../../types/DefaultSourceLayerType";

type SourceType = {
    layers: (props: CampusMapType) => Array<DefaultSourceLayerType>
}

export const SourceTile = (selectedFloor: string): Array<DefaultSourceLayerType> => {

    const second = SecondFloorLayers(selectedFloor)
    const mezzanine = MezzanineFloorLayers(selectedFloor)
    const upperFloor = UpperFloorLayer(selectedFloor)
    const ground = GroundLayers(selectedFloor)

    return second.concat(mezzanine, upperFloor, ground)
}

const SecondFloorLayers = (selectedFloor: string): Array<DefaultSourceLayerType> => [
    {
        type: "fill",
        floor: 'second',
        sourceId: 'secondfloor_rooms_source',
        tilesetId: 'amarilloshinlee.bv19pa1v',
        layerId: 'secondfloor_rooms_layer',
        sourceLayer: 'Secondfloor_rooms-c7j894',
        paint: {
            "fill-color": "#5da8dd",
            "fill-outline-color": "#044e82"
        },
        beforeLayer: undefined,
        visible: selectedFloor === '2' ? 'visible' : 'none',
    },
    {
        type: "fill",
        floor: 'second',
        sourceId:'secondfloor_roombase_source',
        tilesetId:'amarilloshinlee.7yltdsio',
        layerId:'secondfloor_roombase_layer',
        sourceLayer:'Secondfloor_roombase-015sk5',
        paint: {
            "fill-color": Color('black', 100)
        },
        beforeLayer:'secondfloor_rooms_layer',
        visible: selectedFloor === '2' ? 'visible' : 'none',
    },
]

const MezzanineFloorLayers = (selectedFloor: string): Array<DefaultSourceLayerType> => [
    {
        type: "fill",
        floor: 'mezzanine',
        sourceId: 'mezzanine_rooms_source',
        tilesetId: 'amarilloshinlee.a1uk4uh4',
        layerId: 'mezzanine_rooms_layer',
        sourceLayer: 'Mezzanine_rooms-194s6j',
        paint: {
            "fill-color": "#5da8dd",
            "fill-outline-color": "#044e82"
        },
        beforeLayer: "secondfloor_roombase_layer",
        visible: selectedFloor === 'M' ? 'visible' : 'none',
    },
    {
        type: "fill",
        floor: 'mezzanine',
        sourceId:'mezzanine_roombase_source',
        tilesetId:'amarilloshinlee.4a5uuxfs',
        layerId:'mezzanine_roombase_layer',
        sourceLayer:'Mezzanine_roombase-2l39tx',
        paint: {
            "fill-color": Color('black', 100)
        },
        beforeLayer:'mezzanine_rooms_layer',
        visible: selectedFloor === 'M' ? 'visible' : 'none',
    },
]

const UpperFloorLayer = (selectedFloor: string): Array<DefaultSourceLayerType> => [
    {
        type: "fill",
        floor: 'upperfloor',
        sourceId: 'upperfloor_source',
        tilesetId: 'amarilloshinlee.d77pyqj7',
        layerId: 'upperfloor_layer',
        sourceLayer: 'Upperfloor_base-4q9zev',
        paint: {
            //"fill-color": "#0d81d3",
            "fill-color": Color('white', 400),
            "fill-outline-color": Color('black', 100)
        },
        beforeLayer: 'mezzanine_roombase_layer',
        visible:  selectedFloor !== 'G' && selectedFloor !== 'B' ? 'visible' : 'none' //selectedFloor === 'M' ? 'visible' : 'none',
    },
]

const GroundLayers = (selectedFloor: string): Array<DefaultSourceLayerType> => [
    // {
    //     type: "circle",
    //     floor: 'ground',
    //     sourceId: 'groundfloor_pathpoints_source',
    //     tilesetId: 'amarilloshinlee.6162viae',
    //     layerId: 'groundfloor_pathpoints_layer',
    //     sourceLayer: 'Groundfloor_pathpoints-23ialp',
    //     paint: {
    //         "circle-color": "#FFFFFF",
    //         "circle-radius": 2,
    //     },
    //     // beforeLayer: 'upperfloor_base_layer',
    //     beforeLayer: undefined,
    //     visible: selectedFloor === 'G' ? 'visible' : 'none',
    // },
    // {
    //     type: "line",
    //     floor: 'ground',
    //     sourceId: 'groundfloor_path_source',
    //     tilesetId: 'amarilloshinlee.84l8ltuy',
    //     layerId: 'groundfloor_path_layer',
    //     sourceLayer: 'Groundfloor_path-175ufm',
    //     paint: {
    //         // "fill-color": "#5da8dd",
    //         // "fill-outline-color": "#044e82"
    //         "line-color": "#000000",
    //         "line-width": 2,
    //     },
    //     beforeLayer: 'groundfloor_pathpoints_layer',
    //     visible: selectedFloor === 'G' ? 'visible' : 'none',
    // },
    {
        type: "fill",
        floor: 'ground',
        sourceId: 'groundfloor_rooms_source',
        tilesetId: 'amarilloshinlee.1pd11jpd',
        layerId: 'groundfloor_rooms_layer',
        sourceLayer: 'Groundfloor_rooms-2vl1xb',
        paint: {
            "fill-color": "#5da8dd",
            "fill-outline-color": "#044e82"
        },
        beforeLayer: 'upperfloor_layer',
        visible: selectedFloor === 'G' ? 'visible' : 'none',
    },
    {
        type: "fill",
        floor: 'ground',
        sourceId:'groundfloor_roombase_source',
        tilesetId:'amarilloshinlee.dzy9pvar',
        layerId:'groundfloor_roombase_layer',
        sourceLayer:'Groundfloor_roombase-bgrglw',
        paint: {
            //"fill-color": "#0668ae",
            "fill-color": Color('black', 100)
        },
        beforeLayer:'groundfloor_rooms_layer',
        visible: selectedFloor === 'G' ? 'visible' : 'none',
    },
    {
        type: "fill",
        floor: 'ground',
        sourceId: 'groundfloor_base_source',
        tilesetId: 'amarilloshinlee.7zo227np',
        layerId: 'groundfloor_base_layer',
        sourceLayer: 'Groundfloor_base-ancfso',
        paint: {
            //"fill-color": "#0d81d3",
            "fill-color": Color('white', 400),
            "fill-outline-color": Color('black', 100)
        },
        beforeLayer: 'groundfloor_roombase_layer',
        visible: selectedFloor === 'G' ? 'visible' : 'none',
    },
]