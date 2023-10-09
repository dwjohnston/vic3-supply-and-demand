import { LinkedMapNode, MapNode } from "./types";

function generateLinkedMap(nodes: MapNode[]): Record<string, LinkedMapNode> {
    const linkedMap: Record<string, LinkedMapNode> = {};

    nodes.forEach((node) => {
        const id = `${node.x}-${node.y}`; // Concatenate x and y to create id
        const linkedNode: LinkedMapNode = {
            ...node,
            id,
            neighbours: [], // Initialize neighbors as an empty array
        };

        linkedMap[id] = linkedNode; // Add the linked node to the record
    });

    // Iterate through the nodes to determine neighbors
    nodes.forEach((node) => {
        const { x, y } = node;
        const id = `${x}-${y}`;
        const currentLinkedNode = linkedMap[id];

        // Check adjacent nodes (left, right, above, below)
        const adjacentCoordinates = [
            { x: x - 1, y },
            { x: x + 1, y },
            { x, y: y - 1 },
            { x, y: y + 1 },
        ];

        adjacentCoordinates.forEach((coord) => {
            const neighborId = `${coord.x}-${coord.y}`;
            const neighborNode = linkedMap[neighborId];

            // If the neighbor exists, add it to the current node's neighbors
            if (neighborNode) {
                currentLinkedNode.neighbours.push(neighborNode);
            }
        });
    });

    return linkedMap;
}

// Function to check if the graph is connected and acyclic
function isGraphConnectedAndAcyclic(graph: Record<string, LinkedMapNode>): boolean {
    const visited: Record<string, boolean> = {}; // Keep track of visited nodes

    // Function to perform depth-first search (DFS)
    function dfs(nodeId: string, parent: string | null): boolean {
        visited[nodeId] = true; // Mark the current node as visited

        const neighbors = graph[nodeId].neighbours;

        for (const neighbor of neighbors) {
            const neighborId = neighbor.id;

            if (!visited[neighborId]) {
                // If the neighbor has not been visited, continue DFS
                if (dfs(neighborId, nodeId)) {
                    return true; // Cycle found
                }
            } else if (parent !== neighborId) {
                // If the neighbor has been visited and is not the parent, a cycle is found
                return true;
            }
        }

        return false; // No cycle found in this branch
    }

    // Start DFS from the first node (assuming it exists)
    const nodeIds = Object.keys(graph);
    if (nodeIds.length > 0) {
        const firstNodeId = nodeIds[0];
        if (dfs(firstNodeId, null)) {
            // If DFS returns true, a cycle is found
            return false;
        }

        // Check if all nodes are visited (connected)
        return Object.keys(visited).length === nodeIds.length;
    }

    // If there are no nodes, it is trivially connected and acyclic
    return true;
}
