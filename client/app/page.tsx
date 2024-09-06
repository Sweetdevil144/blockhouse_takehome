"use client";

import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchBarChartData, fetchLineChartData, fetchPieChartData } from './services/api';
import { BarChartData, LineChartData, PieChartData } from './services/types';
import CustomShapeBarChart from './CandlestickChart'; // Import the candlestick chart

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [barData, setBarData] = useState<BarChartData['result'] | null>(null);
  const [lineData, setLineData] = useState<LineChartData['result'] | null>(null);
  const [pieData, setPieData] = useState<PieChartData['result'] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const barResponse = await fetchBarChartData();
      setBarData(barResponse.result);

      const lineResponse = await fetchLineChartData();
      setLineData(lineResponse.result);

      const pieResponse = await fetchPieChartData();
      setPieData(pieResponse.result);
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Bar Chart */}
        <div>{barData && (
          <Bar
            data={{
              labels: barData.model,
              datasets: [{
                label: 'Sales',
                data: barData.sales,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }]
            }}
            options={{ responsive: true }}
          />
        )}</div>

        {/* Line Chart */}
        <div>{lineData && (
          <Line
            data={{
              labels: lineData.labels,
              datasets: [{
                label: 'Revenue',
                data: lineData.data,
                fill: false,
                borderColor: '#742774'
              }]
            }}
            options={{ responsive: true }}
          />
        )}</div>

        {/* Pie Chart */}
        <div>{pieData && (
          <Pie
            data={{
              labels: pieData.labels,
              datasets: [{
                data: pieData.data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              }]
            }}
            options={{ responsive: true }}
          />
        )}</div>

        {/* Candlestick Chart */}
        <div>
          <CustomShapeBarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
