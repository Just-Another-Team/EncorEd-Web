import { CampusMapType } from "../../types/CampusType";
import { DefaultSourceLayerType } from "../../types/DefaultSourceLayerType";

type SourceType = {
    layers: (props: CampusMapType) => Array<DefaultSourceLayerType>
}

export const SourceTile: SourceType = {
    layers: ({selectedFloor}) => [
        //Ground
        {
            type: "circle",
            floor: 'ground',
            sourceId: 'groundfloor_pathpoints_source',
            tilesetId: 'amarilloshinlee.6162viae',
            layerId: 'groundfloor_pathpoints_layer',
            sourceLayer: 'Groundfloor_pathpoints-23ialp',
            paint: {
                "circle-color": "#FFFFFF",
                "circle-radius": 2,
            },
            // beforeLayer: 'upperfloor_base_layer',
            beforeLayer: undefined,
            visible: selectedFloor === 'G' ? 'visible' : 'none',
        },
        {
            type: "line",
            floor: 'ground',
            sourceId: 'groundfloor_path_source',
            tilesetId: 'amarilloshinlee.84l8ltuy',
            layerId: 'groundfloor_path_layer',
            sourceLayer: 'Groundfloor_path-175ufm',
            paint: {
                // "fill-color": "#5da8dd",
                // "fill-outline-color": "#044e82"
                "line-color": "#000000",
                "line-width": 2,
            },
            beforeLayer: 'groundfloor_pathpoints_layer',
            visible: selectedFloor === 'G' ? 'visible' : 'none',
        },
        {
            type: "fill",
            floor: 'ground',
            sourceId: 'groundfloor_rooms_source',
            tilesetId: 'amarilloshinlee.1787se74',
            layerId: 'groundfloor_rooms_layer',
            sourceLayer: 'Groundfloor_rooms-bpp3gf',
            paint: {
                "fill-color": "#5da8dd",
                "fill-outline-color": "#044e82"
            },
            beforeLayer: 'groundfloor_path_layer',
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
                "fill-color": "#0668ae",
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
                "fill-color": "#0d81d3",
            },
            beforeLayer: 'groundfloor_roombase_layer',
            visible: selectedFloor === 'G' ? 'visible' : 'none',
        },
    ]
}