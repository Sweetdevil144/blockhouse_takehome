import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchBarChartData, fetchLineChartData, fetchPieChartData, fetchCandlestickData } from './services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

// Define the type for Bar and Line chart data
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }[];
}

// Define the type for Pie chart data
interface PieChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

// Define the type for Candlestick chart data
interface CandlestickData {
  data: {
    x: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
}

const Dashboard = () => {
  // State for each chart's data
  const [barData, setBarData] = useState<ChartData | null>(null);
  const [lineData, setLineData] = useState<ChartData | null>(null);
  const [pieData, setPieData] = useState<PieChartData | null>(null);
  const [candleData, setCandleData] = useState<CandlestickData | null>(null);

  useEffect(() => {
    async function fetchData() {
      // Fetch Bar chart data
      const bar = await fetchBarChartData();
      setBarData({
        labels: bar.model, // Matches the "model" field in the JSON
        datasets: [{
          label: 'Sales',
          data: bar.sales, // Matches the "sales" field in the JSON
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        }],
      });

      // Fetch Line chart data
      const line = await fetchLineChartData();
      setLineData({
        labels: line.labels, // Matches the "labels" field in the JSON
        datasets: [{
          label: 'Revenue',
          data: line.data, // Matches the "data" field in the JSON
          fill: false,
          borderColor: '#742774',
        }],
      });

      // Fetch Pie chart data
      const pie = await fetchPieChartData();
      setPieData({
        labels: pie.color, // Matches the "color" field in the JSON
        datasets: [{
          data: pie.value, // Matches the "value" field in the JSON
          backgroundColor: pie.color, // Using colors as background
        }],
      });

      // Fetch Candlestick chart data
      const candle = await fetchCandlestickData();
      setCandleData(candle); // Store candlestick data directly as no transformations needed
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>{barData && <Bar data={barData} options={{ responsive: true }} />}</div>
        <div>{lineData && <Line data={lineData} options={{ responsive: true }} />}</div>
        <div>{pieData && <Pie data={pieData} options={{ responsive: true }} />}</div>
        <div>
          {candleData && (
            <div>
              <h2>Candlestick Data</h2>
              {candleData.data.map((candle, index) => (
                <div key={index}>
                  Date: {candle.x}, Open: {candle.open}, High: {candle.high}, Low: {candle.low}, Close: {candle.close}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
