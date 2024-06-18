interface LooseObject {
    [key: number | string]: any;
}

interface IGraphData {
    vertices?: Array<{id: number, coordinates: Array<number>, neighbors: Array<number>}>;
    edges: Array<{id: number, points: Array<number>}>;
    graph?: Array<LooseObject>
}

export default IGraphData