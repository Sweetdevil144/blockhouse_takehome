// Define the type for Bar chart data
export interface BarChartData {
  result: {
    model: string[];
    sales: number[];
  };
}

// Define the type for Line chart data
export interface LineChartData {
  result: {
    labels: string[];
    data: number[];
  };
}

// Define the type for Pie chart data
export interface PieChartData {
  result: {
    labels: string[];
    data: number[];
  };
}

// Define the type for Candlestick chart data
export interface CandlestickData {
  result: {
    data: {
      x: string;
      open: number;
      high: number;
      low: number;
      close: number;
    }[];
  };
}
