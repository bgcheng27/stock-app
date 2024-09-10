import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { configStockAreaChart } from "../js/configStockAreaChart";

import { Line } from "react-chartjs-2";


Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  annotationPlugin,
);


export function StockAreaChart({ config, intervalText }) {
  const {areaData, areaOptions} = configStockAreaChart(config, intervalText)

  return (
    <div className="chart-area">
      <Line options={areaOptions} data={areaData} />
    </div>
  );
}
