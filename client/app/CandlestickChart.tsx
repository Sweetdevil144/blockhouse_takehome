import React, { useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Bar, Cell, Tooltip } from 'recharts';
import { fetchCandlestickData } from './services/api'; // Assuming this fetch function already exists
import { CandlestickData } from './services/types';

// Custom Candlestick Shape
const Candlestick = props => {
  const {
    fill,
    x,
    y,
    width,
    height,
    low,
    high,
    openClose: [open, close],
  } = props;
  
  const isGrowing = open < close; // Determines if the stock grew or declined
  const color = isGrowing ? 'green' : 'red'; // Color coding based on growth or decline
  
  const ratio = Math.abs(height / (open - close)); // Ratio to determine the size of the candlestick
  return (
    <g stroke={color} fill="none" strokeWidth="2">
      {/* Candlestick body */}
      <path
        d={`
          M ${x},${y}
          L ${x},${y + height}
          L ${x + width},${y + height}
          L ${x + width},${y}
          L ${x},${y}
        `}
      />
      {/* Bottom wick */}
      {isGrowing ? (
        <path
          d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - low) * ratio}
          `}
        />
      ) : (
        <path
          d={`
            M ${x + width / 2}, ${y}
            v ${(close - low) * ratio}
          `}
        />
      )}
      {/* Top wick */}
      {isGrowing ? (
        <path
          d={`
            M ${x + width / 2}, ${y}
            v ${(close - high) * ratio}
          `}
        />
      ) : (
        <path
          d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - high) * ratio}
          `}
        />
      )}
    </g>
  );
};

// Prepare data for rendering in the chart
const prepareData = (data: any[]) => {
  return data.map(({ open, close, ...other }) => {
    return {
      ...other,
      openClose: [open, close], // Combine open and close for the custom shape
    };
  });
};

const CustomShapeBarChart = () => {
  const [candleData, setCandleData] = useState<CandlestickData['result']['data'] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const candleResponse = await fetchCandlestickData();
      const preparedData = prepareData(candleResponse.result.data);
      setCandleData(preparedData); // Set the prepared data
    }

    fetchData();
  }, []);

  if (!candleData) return <p>Loading Candlestick Data...</p>;

  const minValue = candleData.reduce(
    (minValue, { low, openClose: [open, close] }) => {
      const currentMin = Math.min(low, open, close);
      return minValue === null || currentMin < minValue ? currentMin : minValue;
    },
    null
  );

  const maxValue = candleData.reduce(
    (maxValue, { high, openClose: [open, close] }) => {
      const currentMax = Math.max(high, open, close);
      return currentMax > maxValue ? currentMax : maxValue;
    },
    minValue
  );

  return (
    <BarChart
      width={600}
      height={300}
      data={candleData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="x" />
      <YAxis domain={[minValue, maxValue]} />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="openClose" fill="#8884d8" shape={<Candlestick />}>
        {candleData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'green' : 'red'} />
        ))}
      </Bar>
      <Tooltip />
    </BarChart>
  );
};

export default CustomShapeBarChart;
