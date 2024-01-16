import Map, { Layer, Source } from 'react-map-gl';
import { CirclePaint, FillPaint, LinePaint, MapLayerMouseEvent } from 'mapbox-gl'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FixMeLater } from '../../types/FixMeLater';
import { DefaultSourceLayerType } from '../../types/DefaultSourceLayerType';

// type DefaultSourceLayerType = {
//     floor?: string | undefined;
//     sourceId: string;
//     tilesetId: string;
//     layerId: string;
//     sourceLayer: string;
//     paint: FillPaint;
//     beforeLayer?: string;
//     visible: mapboxgl.Visibility;
// }

//SHOULD HAVE BEEN A MAPBOX COMPONENT INSTEAD OF A TSX COMPONENT
//SEE THIS ARTICLE https://www.lostcreekdesigns.co/writing/a-complete-guide-to-sources-and-layers-in-react-and-mapbox-gl-js/

type DefaultSourceLayerType = {
    floor?: string | undefined;
    sourceId: string;
    tilesetId: string;
    layerId: string;
    sourceLayer: string;
    paint: FillPaint;
    beforeLayer?: string;
    visible: mapboxgl.Visibility;
}

type CampusMapType = {
    selectedFloor: string;
}

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
                paint={paint as FillPaint} 
            />
            
            <Layer
                id={layerId}
                type='line'
                source={sourceId}
                source-layer={sourceLayer}
                beforeId={beforeLayer}
                layout={{
                    visibility: visible
                }}
                paint={paint as LinePaint} 
            />

            <Layer
                id={layerId}
                type='circle'
                source={sourceId}
                source-layer={sourceLayer}
                beforeId={beforeLayer}
                layout={{
                    visibility: visible
                }}
                paint={paint as CirclePaint} 
            />
        </Source>
    )
}

const CampusMap = ({ 
    selectedFloor 
}: CampusMapType) => {
    
    const [allData, setAllData] = useState(null);
    const [hoverInfo, setHoverInfo] = useState<FixMeLater>(null);

    const handleMapHover = useCallback((event: MapLayerMouseEvent) => {
        const { features, point: {x, y} } = event;

        const hoveredFeature = features && features[0];
        setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});

    }, [])

    //Order goes as this:
    //Rooms
    //Roombase
    //Base
    const sourceLayers: Array<DefaultSourceLayerType> = [
        //Secondfloor
        {
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
            type:'fill',
        },
        {
            floor: 'second',
            sourceId:'secondfloor_roombase_source',
            tilesetId:'amarilloshinlee.7yltdsio',
            layerId:'secondfloor_roombase_layer',
            sourceLayer:'Secondfloor_roombase-015sk5',
            paint: {
                "fill-color": "#0668ae",
            },
            beforeLayer:'secondfloor_rooms_layer',
            visible: selectedFloor === '2' ? 'visible' : 'none',
            type:'fill',
        },
        //Mezzanine
        {
            floor: 'mezzanine',
            sourceId: 'mezzanine_rooms_source',
            tilesetId: 'amarilloshinlee.a1uk4uh4',
            layerId: 'mezzanine_rooms_layer',
            sourceLayer: 'Mezzanine_rooms-194s6j',
            paint: {
                "fill-color": "#5da8dd",
                "fill-outline-color": "#044e82"
            },
            beforeLayer: 'secondfloor_roombase_layer',
            visible: selectedFloor === 'M' ? 'visible' : 'none',
            type:'fill',
        },  
        {
            floor: 'mezzanine',
            sourceId: 'mezzanine_roombase_source',
            tilesetId: 'amarilloshinlee.4a5uuxfs',
            layerId: 'mezzanine_roombase_layer',
            sourceLayer: 'Mezzanine_roombase-2l39tx',
            paint: {
                "fill-color": "#0668ae",
            },
            beforeLayer: 'mezzanine_rooms_layer',
            visible: selectedFloor === 'M' ? 'visible' : 'none',
            type:'fill',
        },
        {
            floor: 'mezzanine',
            sourceId: 'mezzanine_base_source',
            tilesetId: 'amarilloshinlee.afxqckn4',
            layerId: 'mezzanine_base_layer',
            sourceLayer: 'Mezzanine-csch54',
            paint: {
                "fill-color": "#0d81d3",
            },
            beforeLayer: 'mezzanine_roombase_layer',
            visible: selectedFloor === 'M' ? 'visible' : 'none',
            type:'fill',
        },
        //Upperfloor Base
        {
            floor: 'upper',
            sourceId: 'upperfloor_base_source',
            tilesetId: 'amarilloshinlee.d77pyqj7',
            layerId: 'upperfloor_base_layer',
            sourceLayer: 'Upperfloor_base-4q9zev',
            paint: {
                "fill-color": (selectedFloor !== 'M') ? "#0d81d3" : "#044e82",
            },
            beforeLayer: 'mezzanine_base_layer',
            visible: (selectedFloor !== 'G' && selectedFloor !== 'B') ? 'visible' : 'none',
            type:'fill',
        },
        //Ground
        {
            floor: 'ground',
            sourceId: 'groundfloor_path_source',
            tilesetId: 'amarilloshinlee.84l8ltuy',
            layerId: 'groundfloor_path_layer',
            sourceLayer: 'Groundfloor_path-175ufm',
            paint: {
                "line-color" : "#fcba03",
                "line-width" : 3
            },
            beforeLayer: 'upperfloor_base_layer',
            visible: selectedFloor === 'G' ? 'visible' : 'none',
            type: "line",
        },
        {
            floor: 'ground',
            sourceId: 'groundfloor_rooms_source',
            tilesetId: 'amarilloshinlee.1787se74',
            layerId: 'groundfloor_rooms_layer',
            sourceLayer: 'Groundfloor_rooms-bpp3gf',
            paint: {
                "fill-color": "#5da8dd",
                "fill-outline-color": "#044e82"
            },
            beforeLayer: 'upperfloor_base_layer',
            visible: selectedFloor === 'G' ? 'visible' : 'none',
            type:'fill',
        },
        {
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
            type:'fill',
        },
        {
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
            type:'fill',
        },
        //Basement
        {
            floor: 'basement',
            sourceId: 'basementfloor_rooms_source',
            tilesetId: 'amarilloshinlee.dxb3fkp8',
            layerId: 'basementfloor_rooms_layer',
            sourceLayer: 'Basement_rooms-02jcga',
            paint: {
                "fill-color": "#5da8dd",
                "fill-outline-color": "#044e82"
            },
            beforeLayer: 'groundfloor_base_layer',
            visible: selectedFloor === 'B' ? 'visible' : 'none',
            type:'fill',
        },
        {
            floor: 'basement',
            sourceId:'basementfloor_roombase_source',
            tilesetId:'amarilloshinlee.9jhwhbwg',
            layerId:'basementfloor_roombase_layer',
            sourceLayer:'Basement_roombase-893s6y',
            paint: {
                "fill-color": "#0668ae",
            },
            beforeLayer:'basementfloor_rooms_layer',
            visible: selectedFloor === 'B' ? 'visible' : 'none',
            type:'fill',
        },
        {
            floor: 'basement',
            sourceId: 'basementfloor_base_source',
            tilesetId: 'amarilloshinlee.2lipcj9j',
            layerId: 'basementfloor_base_layer',
            sourceLayer: 'Basement_base-4vbip0',
            paint: {
                "fill-color": selectedFloor !== 'B' ? '#044e82' : "#0d81d3" ,
            },
            beforeLayer: 'basementfloor_roombase_layer',
            visible: 'visible',
            type:'fill',
        },
    ]

    return (
        <Map
        mapboxAccessToken="pk.eyJ1IjoiYW1hcmlsbG9zaGlubGVlIiwiYSI6ImNsaXV6aXVlMTFnb3czZHF2cDhqZTVrZGkifQ.FAXnyRwlTeFX1y6E8z5LIA"
        initialViewState={{
            longitude: 123.911986,
            latitude: 10.338586,
            zoom: 19
        }}
        maxBounds={[
            [123.911200, 10.337970], //sw
            [123.912675, 10.339146], //ne
        ]}
        //interactiveLayerIds={['secondfloor_rooms_layer', 'mezzanine_rooms_layer', 'groundfloor_rooms_layer', 'basementfloor_rooms_layer']}
        style={{width: '100%', height: '100%'}}
        onMouseMove={handleMapHover}
        mapStyle="mapbox://styles/mapbox/streets-v9">

            {sourceLayers.map((el, ind) => (
                <DefaultSourceLayer
                key={ind}
                sourceId={el.sourceId}
                tilesetId={el.tilesetId}
                layerId={el.layerId}
                sourceLayer={el.sourceLayer}
                beforeLayer={el.beforeLayer}
                visible={el.visible}
                paint={el.paint}
                type={el.type}/>
            ))}
            {hoverInfo && (
            <div className="tooltip" style={{left: hoverInfo.x, top: hoverInfo.y}}>
                <div>State: {hoverInfo.feature.properties.name}</div>
                <div>Median Household Income: {hoverInfo.feature.properties.value}</div>
                <div>Percentile: {(hoverInfo.feature.properties.percentile / 8) * 100}</div>
            </div>
            )}
        </Map>
    )
}

export default CampusMap