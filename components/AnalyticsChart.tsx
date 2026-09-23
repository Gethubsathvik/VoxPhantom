// components/AnalyticsChart.tsx
'use client';

import React from 'react';
import { Card } from './Card';

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }>;
}

interface AnalyticsChartProps {
  title: string;
  data: ChartData;
  type: 'line' | 'bar' | 'pie';
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ title, data }) => {
  return (
    <Card glass>
      <div className="space-y-6">
        <h3 className="text-xl font-bold">{title}</h3>
        
        {/* Simple text-based chart representation */}
        <div className="space-y-3">
          {data.labels.map((label, index) => {
            const value = data.datasets[0]?.data[index] || 0;
            const maxValue = Math.max(...(data.datasets[0]?.data || []));
            const percentage = (value / maxValue) * 100;

            return (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className="text-white font-semibold">{value}</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
