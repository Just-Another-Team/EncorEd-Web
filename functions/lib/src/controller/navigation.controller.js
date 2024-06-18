"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kioskLogCollection = void 0;
const database_1 = require("../database");
const converter_1 = require("../models/converter");
exports.kioskLogCollection = database_1.db.collection(`/KioskLog/`).withConverter((0, converter_1.converter)());
class Navigation {
    getAccessToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mapboxAccessToken = process.env.MAPBOX_ACCESSTOKEN;
            res.status(200).json({ token: mapboxAccessToken });
        });
    }
    initializeGraph(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const graphData = req.body;
                const graph = new Graph();
                let vertices = graphData.vertices.map((features) => {
                    let vertex = {
                        id: features.id,
                        coordinates: features.coordinates
                    };
                    graph.addVertex(vertex);
                    return vertex;
                });
                graphData.vertices.forEach((features) => {
                    let origin = {
                        id: features.id,
                        coordinates: features.coordinates
                    };
                    features.neighbors.forEach(element => {
                        let neighbor = vertices.find(vertex => vertex.id === element);
                        if (neighbor !== undefined)
                            graph.addEdge(origin.id, neighbor.id, graph.distance(origin.coordinates, neighbor.coordinates));
                    });
                });
                res.status(200).json({ graph: graph.printGraph(), edges: graphData.edges });
            }
            catch (error) {
                if (error instanceof Error) {
                    const navigationControllerError = {
                        name: "Navigation",
                        error: true,
                        errorType: "Controller Error",
                        control: "Initialize",
                        message: error.message
                    };
                    res.status(400).json(navigationControllerError); //type: error.type, code: error.code
                }
            }
        });
    }
    generatePath(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const graphData = req.body;
                let shortestPath = dijkstra(graphData.graph, graphData.origin, graphData.destination);
                let routeIds = graphData.edges.filter((edge) => {
                    return edge.points.every(point => shortestPath.path.includes(point));
                }).map((edge) => edge.id);
                res.status(200).json({ graph: graphData.graph, origin: graphData.origin, destination: graphData.destination, routes: routeIds });
            }
            catch (error) {
                if (error instanceof Error) {
                    const institutionControllerError = {
                        name: "Navigation",
                        error: true,
                        errorType: "Controller Error",
                        control: "getRoutes",
                        message: error.message
                    };
                    console.error(institutionControllerError);
                    res.status(400).json(institutionControllerError); //type: error.type, code: error.code
                }
            }
        });
    }
    addLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const log = Object.assign(Object.assign({}, req.body), { KILG_ISREAD: false });
            yield exports.kioskLogCollection.add(log)
                .then(() => {
                console.log(`Log added as type ${log.KILG_TYPE}`);
                res.status(200).json(`Log added as type ${log.KILG_TYPE}`);
            })
                .catch((error) => {
                console.log(error.message);
                res.status(400).json(error.message);
            });
        });
    }
}
class Graph {
    constructor() {
        this.neighbors = new Map();
    }
    //addVertex
    addVertex(vertex) {
        this.neighbors.set(vertex.id, new Map());
    }
    //addEdge
    addEdge(vertex, neighbor, distance) {
        this.neighbors.get(vertex).set(neighbor, distance);
        this.neighbors.get(neighbor).set(vertex, distance);
    }
    //calculate distance
    distance(v1, v2) {
        //2d Pythegorean Theorem
        //3d Pythegorean Theorem
        //l^2 + w^2 + h^2 = d^2
        //d = sqrt((l2 - l1)^2 + (w2 - w1)^2 + (h2 - h1)^2)
        //d = sqrt((lng2 - lng1)^2 + (lat2 - lat1)^2)
        return Math.sqrt(((v2[0] - v1[0]) * (v2[0] - v1[0])) + ((v2[1] - v1[1]) * (v2[1] - v1[1])) + ((v2[2] - v1[2]) * (v2[2] - v1[2]))); //TO-DO: Do not forget to add the height or the floor cost
    }
    printGraph() {
        const keys = this.neighbors.keys();
        const graph = {};
        for (let key of keys) {
            let values = this.neighbors.get(key); //mapValue
            graph[key] = Object.fromEntries(values);
        }
        return graph;
    }
}
//Graph is an object map where the keys are the nodes and the value are the distances
const dijkstra = (graph, start, end) => {
    let distances = {};
    distances[end] = Infinity;
    distances = Object.assign(distances, graph[start]);
    let parents = {};
    parents[end] = null;
    for (let child in graph[start])
        parents[child] = start;
    let visited = new Set();
    let node = lowestCostNode(distances, visited);
    while (node) {
        let distance = distances[node];
        let children = graph[node];
        for (let child in children) {
            if (parseInt(child) === start)
                continue;
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
    };
    return results;
};
const lowestCostNode = (costs, processed) => {
    return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.has(node))
                lowest = node;
        }
        return lowest;
    }, null);
};
exports.default = new Navigation;
//# sourceMappingURL=navigation.controller.js.map