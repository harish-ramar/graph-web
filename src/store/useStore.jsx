import { applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { nanoid } from 'nanoid';
import { createWithEqualityFn } from 'zustand/traditional';

export const useStore = createWithEqualityFn((set, get) => ({
    nodes: [],
    edges: [],

    // Manage node changes
    onNodesChange(changes) {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange(changes) {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    // Add a new node dynamically
    createNode(type, x, y) {
        const id = nanoid();

        switch(type) {
            case 'day' : {
                const data = { day: 'Monday', degree: 0, onChange: get().updateNodeData };
                const position = { x, y };

                set({ nodes: [...get().nodes, { id, type, data, position }] });
                break;
            }

            case 'barChart': {
                const data = { chartData: [] };
                const position = { x, y };

                set({ nodes: [...get().nodes, { id, type, data, position }] });
                break;
            }

            default: {
                console.error(`Unknow node type: ${type}`);
            }
        }
    },

    // Update node data
    updateNodeData(id, newData) {
        set({
            nodes: get().nodes.map((node) => 
                node.id === id
                    ? { ...node, data: { ...node.data, ...newData } }
                    : node
            ),
        });
    },

    // Add a new edge dynamically
    addEdge(data) {
        const id = nanoid(6);
        const edge = { id, ...data };

        set({ edges: [edge, ...get().edges ]});
    },

    updateBarChartData: () => {
        const { nodes, edges } = get();

        set({
            nodes: nodes.map((node) => {
                if (node.type === 'barChart') {
                    const connectedEdges = edges.filter((edge) => edge.target === node.id);
                    const chartData = connectedEdges.map((edge) => {
                        const sourceNode = nodes.find((n) => n.id === edge.source);
                        return sourceNode ? { day: sourceNode.data.day, degree: sourceNode.data.degree } : null;
                    });

                    return {
                        ...node,
                        data: { ...node.data, chartData: chartData.filter(Boolean) },
                    };
                }
                return node;
            }),
        });
    },

    // Delete nodes
    onNodesDelete(deleted) {
        set({
            nodes: get().nodes.filter((node) => !deleted.some((del) => del.id === node.id)),
            edges: get.edges.filter(
                (edge) => !deleted.some((del) => del.id === edge.source || del.id === edge.target)
            ),
        });
    },

    // Delete edges
    onEdgesDelete(deleted) {
        set({
            edges: get().edges.filter(
                (edge) => !deleted.some((delEdge) => delEdge.id === edge.id)
            ),
        });
    },
}));