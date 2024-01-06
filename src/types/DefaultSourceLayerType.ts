import { CirclePaint, FillPaint, LinePaint} from "mapbox-gl";

export type DefaultSourceLayerType = {
    floor?: string | undefined;
    type: "symbol" | "circle" | "line" | "raster" | "background" | "fill-extrusion" | "fill" | "heatmap" | "hillshade" | "sky";
    sourceId: string;
    tilesetId: string;
    layerId: string;
    sourceLayer: string;
    paint?: FillPaint | LinePaint | CirclePaint | undefined;
    beforeLayer?: string;
    visible: mapboxgl.Visibility;
}