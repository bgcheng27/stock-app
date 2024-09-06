import { useEffect, useState } from "react";
import {
  extractTime,
  isFullHourDivisibleByThree,
} from "./dateHelpers";

const LINE_COLOR = {
  SUCCESS: "28, 200, 138",
  DANGER: "231, 74, 59",
  GRAY: "20, 20, 20",
};

const GRAPH_STYLES = {
  fill: true,
  pointHoverRadius: 3,
  pointRadius: 0,
  pointHitRadius: 10,
  pointBorderWidth: 2,
};

const PREV_CLOSE_STYLES = {
  borderColor: `rgba(${LINE_COLOR.GRAY}, 0.8)`,
  borderDash: [5, 3],
  borderWidth: 1,
  pointRadius: 0,
};

const TOOL_TIPS_STYLES = {
  mode: "single",
  backgroundColor: "rgb(255,255,255)",
  bodyColor: "#858796",
  titleMarginBottom: 5,
  titleColor: "#6e707e",
  titleFont: {
    size: 14,
  },

  borderColor: "#dddfeb",
  borderWidth: 1,
  padding: 10,
  displayColors: false,
  intersect: false,
  mode: "index",
  caretPadding: 10,
};

function configLineColor(previousClose, xData) {
  if (previousClose !== undefined) {
    return xData[xData.length - 1] > previousClose
      ? LINE_COLOR.SUCCESS
      : LINE_COLOR.DANGER;
  } else {
    return xData[xData.length - 1] > xData[0]
      ? LINE_COLOR.SUCCESS
      : LINE_COLOR.DANGER 
  }
}

// custom hook
export function configStockAreaChart(config, intervalText) {
  const { xTimeLabels, xLabels, xData, xVolume, previousClose } = config;
  const [lineColor, setLineColor] = useState(() => {
    return configLineColor(previousClose, xData)
  });

  useEffect(() => {
    setLineColor(() => {
      return configLineColor(previousClose, xData)
    });
  }, [xData, previousClose]);

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

        data: xData,
      },
      ...(previousClose !== undefined
        ? [
            {
              ...PREV_CLOSE_STYLES,
              label: "Previous Close",
              data: Array(xData.length).fill(previousClose),
            },
          ]
        : []),
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
          callback: (value, index) => {
            switch (intervalText) {
              case "1D":
                let isolatedTime = extractTime(xLabels[index]);
                let hourBool = isFullHourDivisibleByThree(isolatedTime);
                if (hourBool) return isolatedTime;
                break;
              case "1W":
                let wDate = xLabels[index].split(",")[0];
                let wTime = xLabels[index].split(" ")[2];
                if (wTime === "9:30AM" && index !== 0) return wDate;
                break;
              case "1M":
                let mDate = xLabels[index].split(",")[0];
                let mTime = xLabels[index].split(" ")[2];
                if (mTime === "9:30AM" && index !== 0) {
                  let prevDate = xLabels[index - 1].split(",")[0];
                  let prevDateObj = new Date(prevDate);
                  let currDateObj = new Date(mDate);

                  // Check if the current day is a Monday and the previous trading day was more than one day ago
                  if ((currDateObj - prevDateObj) > 24 * 60 * 60 * 1000) {
                    return mDate;
                  }
                }
                break;
            }
          },
        },
      },

      y: {
        ticks: {
          padding: 10,
          callback: (value) => {
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
        },
      },
    },

    legend: {
      display: false,
    },

    plugins: {
      tooltip: {
        ...TOOL_TIPS_STYLES,
        callbacks: {
          label: (_) => "",
          title: (context) => {
            var price = context[0].raw;
            return `USD $${price}`;
          },
          afterBody: (context) => {
            return [
              `${xLabels[context[0].dataIndex]}`,
              `Volume: ${xVolume[context[0].dataIndex]}`,
            ];
          },
        },
      },
    },
  };

  return { areaData, areaOptions };
}
