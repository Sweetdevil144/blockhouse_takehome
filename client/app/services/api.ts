import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

// Define the types for each chart data
interface BarChartResponse {
  model: string[];
  sales: number[];
}

interface LineChartResponse {
  labels: string[];
  data: number[];
}

interface PieChartResponse {
  color: string[];
  value: number[];
}

interface CandlestickResponse {
  data: {
    x: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
}

export const fetchPieChartData = async (): Promise<PieChartResponse> => {
  const response = await axios.get<PieChartResponse>(`${BASE_URL}/pie-chart-data`);
  return response.data;
};

export const fetchBarChartData = async (): Promise<BarChartResponse> => {
  const response = await axios.get<BarChartResponse>(`${BASE_URL}/bar-chart-data`);
  return response.data;
};

export const fetchLineChartData = async (): Promise<LineChartResponse> => {
  const response = await axios.get<LineChartResponse>(`${BASE_URL}/line-chart-data`);
  return response.data;
};

export const fetchCandlestickData = async (): Promise<CandlestickResponse> => {
  const response = await axios.get<CandlestickResponse>(`${BASE_URL}/candlestick-data`);
  return response.data;
};
