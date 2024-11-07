// components/ui/charts.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,   // For categorical x-axis
  LinearScale,    // For numeric y-axis
  BarElement,     // For rendering bar charts
  Title,          // To show chart title
  Tooltip,        // To show tooltips on hover
  Legend,         // For chart legends
} from 'chart.js';

// Register the necessary components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: { categoryName: string; sales: number }[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.categoryName), // Categories for the x-axis
    datasets: [
      {
        label: 'Sales',
        data: data.map((item) => item.sales),  // Sales values for the y-axis
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Styling
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sales by Category',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};
