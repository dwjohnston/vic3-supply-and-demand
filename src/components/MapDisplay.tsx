import React, { useEffect, useMemo } from 'react';
import { Map, MapNode } from '../modelTools/types';
import { MapNodeDisplay } from './MapNodeDisplay';
import { useNormalisationValue } from '../providers/NormalisationProviders';

export type MapProps = {
    map: Map;
};


function generateGetNodeAtIndex(map: Map): ((x: number, y: number) => MapNode | null) {

    const lookup = new Array(map.width).fill(true).map(() => new Array(map.height).fill(null))

    map.nodes.forEach((v) => {
        lookup[v.x][v.y] = v;
    })

    return (x, y) => {
        return lookup[x][y];
    }
}


export const MapDisplay = (props: MapProps) => {
    const { map } = props;


    const getNodeByXy = useMemo(() => generateGetNodeAtIndex(map), [map]);

    return (
        <div>
            {new Array(map.height).fill(true).map((v, yIndex) => {
                return <div className="map-row" key={yIndex}>
                    {new Array(map.width).fill(true).map((w, xIndex) => {
                        const node = getNodeByXy(xIndex, yIndex);

                        return <MapNodeDisplay node={node} key={xIndex} />
                    })}
                </div>
            })}
        </div>
    );
};
