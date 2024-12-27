import React, { useMemo } from 'react';
import {
	ReactFlow,
	ReactFlowProvider,
	Background,
	MiniMap,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import BarChartNode from './components/BarChart';
import DayNode from './components/DayNode';
import { useStore } from './store/useStore';

const nodeTypes = {
	barChart: BarChartNode,
	day: DayNode,
};

export default function App() {
	const {
		nodes,
		edges,
		onNodesChange,
		onEdgesChange,
		createNode,
		addEdge,
	} = useStore();

    const updatedNodes = useMemo(() => {
		return nodes.map((node) => {
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
		});
	  }, [nodes, edges]);

	return (
		<ReactFlowProvider>
			<div style={{ width: '100vw', height: '100vh' }}>
				<button
					onClick={() => createNode('day', 0, 0)}
					style={{ position: 'absolute', zIndex: 10 }}
				>
					Add Day Node
				</button>
				< button
					onClick={() => createNode('barChart', 0, 0)}
					style={{ position: 'absolute', top: '40px', zIndex: 10 }}
				>
					Add BarChart Node
				</button>

				<ReactFlow
					nodes={updatedNodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={addEdge}
					nodeTypes={nodeTypes}
					fitView
				>
					<Background />
					<MiniMap />
				</ReactFlow>
			</div>
		</ReactFlowProvider>
	);
}
