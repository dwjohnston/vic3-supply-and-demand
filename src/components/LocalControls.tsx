
import React from 'react';
import { useUpdateNode } from '../providers/MapProvider'; // Import MapNode and useUpdateNode from your module
import { MapNode } from '../modelTools/types';

export function NodeControl(props: { node: MapNode }) {
    const { node } = props;
    const setNodeData = useUpdateNode();

    const handlePropertyChange = (parentProperty: "demand" | "supply" | "transportCost", property: "slope" | "offset" | null, increment: number) => {

        if (parentProperty === "transportCost") {
            const updatedNode: MapNode = {
                ...node,
                data: {
                    ...node.data,
                    transportCost: node.data.transportCost + increment,
                },
            };
            setNodeData(updatedNode);
        }
        else if (parentProperty === "demand") {

            if (!property) {
                throw new Error("")
            };
            const updatedNode: MapNode = {
                ...node,
                data: {
                    ...node.data,
                    demand: {
                        ...node.data.demand,
                        [property]: node.data.demand[property] + increment
                    }
                },
            };
            setNodeData(updatedNode);
        } else if (parentProperty === "supply") {
            if (!property) {
                throw new Error("")
            };
            const updatedNode: MapNode = {
                ...node,
                data: {
                    ...node.data,
                    supply: {
                        ...node.data.supply,
                        [property]: node.data.supply[property] + increment
                    }
                },
            };
            setNodeData(updatedNode);
        }

    };

    return (
        <div className="local-control">
            <h4>Node Control</h4>

            <div className="local-control-section">
                <h5>
                    Demand
                </h5>
                <div className="local-control-value-pair">
                    <h6>Slope</h6>
                    <button onClick={() => handlePropertyChange("demand", "slope", 0.1)} disabled={node.data.demand.slope + 0.1 > 0}>+</button>
                    <button onClick={() => handlePropertyChange("demand", "slope", -0.1)}>-</button>
                </div>
                <div className="local-control-value-pair">
                    <h6>Offset</h6>
                    <button onClick={() => handlePropertyChange("demand", "offset", 10)}>+</button>
                    <button onClick={() => handlePropertyChange("demand", "offset", -10)} disabled={node.data.demand.offset - 10 < 0}>-</button>
                </div>
            </div>

            <div className="local-control-section">
                <h5>
                    Supply
                </h5>
                <div className="local-control-value-pair">
                    <h6>Slope</h6>
                    <button onClick={() => handlePropertyChange("supply", "slope", 0.1)}>+</button>
                    <button onClick={() => handlePropertyChange("supply", "slope", -0.1)} disabled={node.data.supply.slope - 0.1 < 0}>-</button>
                </div>
                <div className="local-control-value-pair">
                    <h6>Offset</h6>

                    <button onClick={() => handlePropertyChange('supply', "offset", 10)}>+</button>
                    <button onClick={() => handlePropertyChange('supply', 'offset', -10)}>-</button>
                </div>
            </div>

            <div className="local-control-section">
                <h5>
                    Transport
                </h5>

                <div className="local-control-value-pair">
                    <button onClick={() => handlePropertyChange('transportCost', null, 1)}>+</button>
                    <button onClick={() => handlePropertyChange('transportCost', null, -1)} disabled={node.data.transportCost - 1 < 0}>-</button>
                </div>
            </div>

        </div >
    );
}