import { FillPaint } from "mapbox-gl"
import { Layer, Source } from "react-map-gl"

type SourceLayerType = {
    sourceId: string
    layerType: "symbol" | "circle" | "line" | "background" | "fill-extrusion" | "fill" | "heatmap" | "hillshade" | "raster" | "sky"
    tilesetId: string
    layerId: string
    sourceLayer: string
    beforeLayer: string | undefined
    layerLayout: any
    paint: any
    filter: any
}

const SourceLayer = (props: SourceLayerType) => {

    return (
        <Source
        id={props.sourceId}
        type="vector"
        url={`mapbox://${props.tilesetId}`}>
            <Layer
            id={props.layerId}
            type={props.layerType as any}
            source={props.sourceId}
            source-layer={props.sourceLayer}
            beforeId={props.beforeLayer}
            layout={props.layerLayout}
            paint={props.paint}
            filter={props.filter}/>
        </Source>
    )
}

export default SourceLayer