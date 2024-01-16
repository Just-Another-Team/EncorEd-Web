import { CirclePaint, FillPaint, LinePaint } from "mapbox-gl";
import { useCallback, useState } from "react";
import Map, { Layer, MapLayerMouseEvent, Source } from 'react-map-gl';
import { FixMeLater } from "../../types/FixMeLater";
import { DefaultSourceLayerType } from "../../types/DefaultSourceLayerType";
import { CampusMapType } from "../../types/CampusType";
import { SourceTile } from "./MapLayers";

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

const MapComponent = (props:CampusMapType) => {
    const [hoverInfo, setHoverInfo] = useState<FixMeLater>(null);
    const handleMapHover = useCallback((event: MapLayerMouseEvent) => {
        const { features, point: {x, y} } = event;

        const hoveredFeature = features && features[0];
        setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});

    }, [])

    return (
        <Map
        mapboxAccessToken="pk.eyJ1IjoiYW1hcmlsbG9zaGlubGVlIiwiYSI6ImNsaXV6aXVlMTFnb3czZHF2cDhqZTVrZGkifQ.FAXnyRwlTeFX1y6E8z5LIA"
        initialViewState={{
            longitude: 123.911986,
            latitude: 10.338586,
            zoom: 19.25
        }}
        maxBounds={[
            [123.911200, 10.337970], //sw
            [123.912675, 10.339146], //ne
        ]}
        interactiveLayerIds={['secondfloor_rooms_layer', 'mezzanine_rooms_layer', 'groundfloor_rooms_layer', 'basementfloor_rooms_layer']}
        style={{width: '100%', height: "100%"}}
        maxPitch={0}
        onMouseMove={handleMapHover}
        mapStyle="mapbox://styles/mapbox/streets-v9">
            {SourceTile.layers(props).map((el, ind) => (
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

}

export default MapComponent;