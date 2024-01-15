export type VertexType = {
    id: number,
    coordinates: Array<number>,
    neighbors?: Array<number> | undefined,
    distance?: number | undefined
}