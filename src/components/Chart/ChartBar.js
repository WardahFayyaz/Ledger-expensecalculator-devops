import React from 'react';
import './ChartBar.css';
import { formatCurrency } from '../../utils/categories';

export default function ChartBar({ value, maxValue, label }) {
  let fillerHeight = '0%';
  if (maxValue > 0) {
    fillerHeight = Math.round((value / maxValue) * 100) + '%';
  }

  return (
    <div className="chart-bar" title={`${label}: ${formatCurrency(value)}`}>
      <div className="chart-bar__inner">
        <div
          className="chart-bar__fill"
          style={{ height: fillerHeight }}
        />
      </div>
      <div className="chart-bar__label">{label}</div>
    </div>
  );
}
