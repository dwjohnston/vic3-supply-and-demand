export type SupplyDemandData = {
    slope: number;
    offset: number;
}

export type MapNode = {
    x: number;
    y: number;
    data: {
        transportCost: number;

        demand: SupplyDemandData;
        supply: SupplyDemandData;

    }
}

export type LinkedMapNode = MapNode & {
    id: string;
    neighbours: Array<LinkedMapNode>;
}

export type Map = {
    width: number;
    height: number;
    nodes: Array<MapNode>;
}