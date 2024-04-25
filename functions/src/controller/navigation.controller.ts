import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { FixMeLater } from "../types/FixMeLater";
import { VertexType } from "../types/VertexType";
import ErrorController from '../types/ErrorController';

interface LooseObject {
    [key: number | string]: any;
}

interface IGraphData {
    vertices: Array<{id: number, coordinates: Array<number>, neighbors: Array<number>}>;
    edges: Array<{id: number, points: Array<number>}>;
    graph?: Array<LooseObject>
}

interface IPathData {
    origin: number;
    destination: number;
    routes?: Array<number>
}

type PathInputType = IPathData & IGraphData;

class Navigation {
    public async initializeGraph(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const graphData = req.body as IGraphData;

            const graph = new Graph();

            let vertices = graphData.vertices.map((features) => {
                let vertex: VertexType = {
                    id: features.id,
                    coordinates: features.coordinates
                }

                graph.addVertex(vertex);

                return vertex;
            });

            graphData.vertices.forEach((features) => {
                let origin: VertexType = {
                    id: features.id,
                    coordinates: features.coordinates
                }

                features.neighbors.forEach(element => {
                    let neighbor = vertices.find(vertex => vertex.id === element);

                    if (neighbor !== undefined)
                        graph.addEdge(origin.id, neighbor.id, graph.distance(origin.coordinates, neighbor!.coordinates))
                })
            })

            res.status(200).json({graph: graph.printGraph(), edges: graphData.edges})
        } catch (error) {
            if (error instanceof Error) {
                const institutionControllerError: ErrorController = {
                    name: "Navigation",
                    error: true,
                    errorType: "Controller Error",
                    control: "Initialize",
                    message: error.message
                }

                console.error(institutionControllerError)

                res.status(400).json(institutionControllerError) //type: error.type, code: error.code
            }
        }
    }

    public async generatePath(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const graphData = req.body as PathInputType;

            let shortestPath = dijkstra(graphData.graph!, graphData.origin, graphData.destination);

            let routeIds = graphData.edges.filter((edge) => {
                return edge.points.every(point => shortestPath.path.includes(point));
            }).map((edge) => edge.id)

            res.status(200).json({graph: graphData.graph, origin: graphData.origin, destination: graphData.destination, routes: routeIds})
        } catch (error) {
            if (error instanceof Error) {
                const institutionControllerError: ErrorController = {
                    name: "Navigation",
                    error: true,
                    errorType: "Controller Error",
                    control: "getRoutes",
                    message: error.message
                }

                console.error(institutionControllerError)

                res.status(400).json(institutionControllerError) //type: error.type, code: error.code
            }
        }
    }
}

class Graph {
    neighbors: Map<number, Map<number, number>>; //Goal: { VertexID : { NeighborVertexId: Distance, NeighborVertexId: Distance, ... }}

    constructor () {
        this.neighbors = new Map();
    }

    //addVertex
    public addVertex(vertex: VertexType) { //Vertex type to number
        this.neighbors.set(vertex.id, new Map());
    }

    //addEdge
    public addEdge(vertex: number, neighbor: number, distance: number) {
        this.neighbors.get(vertex)!.set(neighbor, distance);
        this.neighbors.get(neighbor)!.set(vertex, distance);
    }

    //calculate distance
    public distance(v1: Array<number>, v2: Array<number>): number {
        //3d Pythegorean Theorem
        //l^2 + w^2 + h^2 = d^2
        //d = sqrt((l2 - l1)^2 + (w2 - w1)^2 + (h2 - h1)^2)
        //d = sqrt((lng2 - lng1)^2 + (lat2 - lat1)^2)
        return Math.sqrt(((v2[0] - v1[0]) * (v2[0] - v1[0])) + ((v2[1] - v1[1]) * (v2[1] - v1[1])) + ((v2[2] - v1[2]) * (v2[2] - v1[2]))); //TO-DO: Do not forget to add the height or the floor cost
    }

    public printGraph() {
        const keys = this.neighbors.keys();
        const graph: LooseObject = {}

        for (let key of keys) {
            let values = this.neighbors.get(key); //mapValue
            graph[key] = Object.fromEntries(values!)
        }

        return graph;
    }
}

//Graph is an object map where the keys are the nodes and the value are the distances
const dijkstra = (graph: LooseObject, start: number, end: number) => {
    let distances: LooseObject = {};
    distances[end] = Infinity;
    distances = Object.assign(distances, graph[start])

    let parents: LooseObject = {};
    parents[end] = null;

    for (let child in graph[start])
        parents[child] = start

    let visited = new Set();

    let node = lowestCostNode(distances, visited);

    while (node) {
        let distance = distances[node];
        let children = graph[node];

        for (let child in children) {
            if (parseInt(child) === start) continue;
            else {
                let newDistance = distance + children[child];

                if (!distances[child] || distances[child] > newDistance) {
                    distances[child] = newDistance;
                    parents[child] = node;
                }
            }
        }

        visited.add(node);
        node = lowestCostNode(distances, visited);
    }

    let shortestPath = [end];
    let parent = parents[end];

    while (parent) {
        shortestPath.push(parseInt(parent));
        parent = parents[parent];
    }
    shortestPath.reverse();

    let results = {
        distance: distances[end],
        path: shortestPath,
    }

    return results;
}

const lowestCostNode = (costs: FixMeLater, processed: FixMeLater) => {
    return Object.keys(costs).reduce((lowest: FixMeLater, node: FixMeLater) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.has(node)) lowest = node;
        }

        return lowest;
    }, null)
}

export default new Navigation;