import IGraphData from "./IGraphData";

export interface IPathData {
    origin: number;
    destination: number;
}

export type PathInputType = IPathData & IGraphData;