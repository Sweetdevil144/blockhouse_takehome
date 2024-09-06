import axios from 'axios';
import { BarChartData, LineChartData, PieChartData, CandlestickData } from './types';

// Base URL for Django API
const BASE_URL = 'http://localhost:8080/api';

// Fetch Bar Chart Data
export const fetchBarChartData = async (): Promise<BarChartData> => {
  const response = await axios.get<BarChartData>(`${BASE_URL}/bar-chart-data`);
  return response.data;
};

// Fetch Line Chart Data
export const fetchLineChartData = async (): Promise<LineChartData> => {
  const response = await axios.get<LineChartData>(`${BASE_URL}/line-chart-data`);
  return response.data;
};

// Fetch Pie Chart Data
export const fetchPieChartData = async (): Promise<PieChartData> => {
  const response = await axios.get<PieChartData>(`${BASE_URL}/pie-chart-data`);
  return response.data;
};

// Fetch Candlestick Data
export const fetchCandlestickData = async (): Promise<CandlestickData> => {
  const response = await axios.get<CandlestickData>(`${BASE_URL}/candlestick-data`);
  return response.data;
};
