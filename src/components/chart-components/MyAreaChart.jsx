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
import { useEffect, useState } from "react";

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

const LINE_COLOR = {
  SUCCESS: "28, 200, 138",
  DANGER: "231, 74, 59",
  GRAY: "20, 20, 20"
}

const GRAPH_STYLES = {
  fill: true,
  pointHoverRadius: 3,
  pointRadius: 0,
  pointHitRadius: 10,
  pointBorderWidth: 2,
}

const PREV_CLOSE_STYLES = {
  borderColor: `rgba(${LINE_COLOR.GRAY}, 0.8)`,
  borderDash: [5, 3],
  borderWidth: 1,
  pointRadius: 0,
}

const TOOL_TIPS_STYLES = {
  mode: "single",
  backgroundColor: "rgb(255,255,255)",
  bodyColor: "#858796",
  titleMarginBottom: 5,
  titleColor: "#6e707e",
  titleFont: {
    size: 14
  },

  borderColor: "#dddfeb",
  borderWidth: 1,
  padding: 10,
  displayColors: false,
  intersect: false,
  mode: "index",
  caretPadding: 10,
}



export function MyAreaChart({ xTimeLabels, xLabels, xData, xVolume, previousClose }) {
  const [lineColor, setLineColor] = useState(() => {
    return xData[xData.length - 1] > previousClose ? LINE_COLOR.SUCCESS : LINE_COLOR.DANGER;
  })

  useEffect(() => {
    setLineColor(() => {
      return xData[xData.length - 1] > previousClose ? LINE_COLOR.SUCCESS : LINE_COLOR.DANGER;
    })
  }, [xData, previousClose])


  const areaData = {
    labels: xTimeLabels,
    datasets: [
      {
        ...GRAPH_STYLES,
        label: "Open",

        backgroundColor: `rgba(${lineColor}, 0.15)`,
        borderColor: `rgba(${lineColor}, 1)`,
        pointBackgroundColor: `rgba(${lineColor}, 1)`,
        pointBorderColor: `rgba(${lineColor}, 1)`,
        pointHoverBackgroundColor: `rgba(${lineColor}, 1)`,
        pointHoverBorderColor: `rgba(${lineColor}, 1)`,

        data: xData
      },
      {
        ...PREV_CLOSE_STYLES,
        label: "Previous Close",
        data: Array(xData.length).fill(previousClose)
      },
    ],
  };

  const areaOptions = {
    animation: false,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0,
      },
    },
  
    scales: {
      x: {
        time: {
          unit: "datse",
        },
  
        grid: {
          display: false,
          drawBorder: false,
        },
  
        ticks: {
          maxTicksLimit: 7,
        },
      },
  
      y: {
        ticks: {
          padding: 10,
          callback: (value, index, values) => {
            return "$" + value.toFixed(2);
          },
        },
  
        grid: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          zeroLineBorderDash: [2],
        },
        
        border: {
          display: false,
          dash: [2],
        }
      },
    },
  
    legend: {
      display: false,
    },
  
    plugins: {
      tooltip: {
        ...TOOL_TIPS_STYLES,
        callbacks: {
          label: _ => "",
          title: (context) => {
            var price = context[0].raw;
            return `USD $${price}`
          },
          afterBody: (context) => {
            return [`${xLabels[context[0].dataIndex]}`, `Volume: ${xVolume[context[0].dataIndex]}`]
         },
        },
      },
    }
  
    
  };

  return (
    <div className="chart-area">
      <Line options={areaOptions} data={areaData} />
    </div>
  );
}
