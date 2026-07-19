import React from 'react';
import './Chart.css';
import ChartBar from './ChartBar';

export default function Chart({ dataPoints }) {
  const dataPointVal = dataPoints.map((dp) => dp.value);
  const totalMaxVal = Math.max(...dataPointVal, 0);

  return (
    <div className="chart" role="img" aria-label="Monthly expense chart">
      {dataPoints.map((datapoint) => (
        <ChartBar
          key={datapoint.label}
          value={datapoint.value}
          maxValue={totalMaxVal}
          label={datapoint.label}
        />
      ))}
    </div>
  );
}
