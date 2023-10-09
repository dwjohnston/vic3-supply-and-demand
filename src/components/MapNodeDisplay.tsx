import React from 'react';
import { MapNode } from '../modelTools/types';
import { SupplyDemandCurve } from './SupplyDemandCurve';
import { TransportPriceIndicator } from './TransportPriceIndicator';
import { NodeControl } from './LocalControls';

export type MapNodeProps = {

    node: MapNode | null;
};



export const MapNodeDisplay = (props: MapNodeProps) => {
    const { node } = props;

    if (!node) {
        return (
            <div className="map-node">

            </div>
        );
    }

    return (
        <div className="map-node">
            <p className="x-y">
                {node.x} {node.y}
            </p>
            <TransportPriceIndicator transportPrice={node.data.transportCost} />
            <SupplyDemandCurve supply={node.data.demand} demand={node.data.supply} />
            <NodeControl node={node} />
        </div>
    );
};
