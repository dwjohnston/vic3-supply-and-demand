import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Map, MapNode } from "../modelTools/types";


export type MapDataContextType = {
    map: Map;
    setNodeData: (newNodeData: MapNode) => void;
}

export const MapDataContext = createContext<MapDataContextType>({
    map: {
        width: 0,
        height: 0,
        nodes: [],
    },
    setNodeData: () => {
        throw new Error("not instantianted")
    },
});

const ourMap: Map = {
    width: 3,
    height: 3,
    nodes: [
        {
            x: 0,
            y: 1,
            data: {
                transportCost: 10,
                supply: {
                    slope: 1,
                    offset: 0,
                },
                demand: {
                    slope: -2,
                    offset: 200,
                }

            }
        },
        {
            x: 1,
            y: 1,
            data: {
                transportCost: 50,
                supply: {
                    slope: 1,
                    offset: 0,
                },
                demand: {
                    slope: -1,
                    offset: 100,
                }

            }
        },
        {
            x: 2,
            y: 1,
            data: {
                transportCost: 10,
                supply: {
                    slope: 1,
                    offset: 0,
                },
                demand: {
                    slope: -1,
                    offset: 100,
                }
            }
        }
    ]
}

export function MapDataProvider(props: PropsWithChildren<{}>) {

    const [map, setMap] = useState(ourMap);


    return <MapDataContext.Provider value={{
        map: map,
        setNodeData: (nodeData) => {
            const filteredNodes = map.nodes.filter((v) => {
                return v.x !== nodeData.x || v.y !== nodeData.y
            });

            setMap({
                ...map,
                nodes: [...filteredNodes, nodeData]
            })
        }
    }}>
        {props.children}
    </MapDataContext.Provider >
}

export function useUpdateNode() {
    const result = useContext(MapDataContext);

    return result.setNodeData;
}

export function useMapData() {
    const result = useContext(MapDataContext);

    return result.map;
}