import React from "react";
import { Handle } from '@xyflow/react';
import { ResponsiveBar } from "@nivo/bar";

const BarChartNode = ({ id, data }) => {
    return (
        <div style={{
            height: "500px",
            width: "700px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "#fff"
        }}>
            <ResponsiveBar 
                data={data.chartData || []}
                keys={["degree"]}
                indexBy="day"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.4}
                valueScale={{ type: "linear" }}
                colors="#3182CE"
                animate={true}
                enableLabel={false}
                axisTop={null}
                axisRight={null}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "degrees",
                    legendPosition: "middle",
                    legendOffset: -40,
                }}
            />
            <Handle type="target" position="left" style={{ background: '#555', marginTop: '10px' }} />
        </div>
    );
};

export default BarChartNode;