import { useEffect, useState } from "react";
import {
  convertToAMPM,
  isFullHourDivisibleByThree,
} from "./helpers/dateTimeHelpers";
import { formatDateTimeLabel, formatMonthDay, getPropValue } from "./helpers/tooltipHelpers";
import { useSortedMarketData } from "./hooks/useSortedMarketData";

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

const AREA_OPS = {
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

    legend: {
      display: false,
    },
}

const X_SCALES = {
  time: {
    unit: "datse",
  },

  grid: {
    display: false,
    drawBorder: false,
  },
}

const Y_SCALES = {
  grid: {
    color: "rgb(234, 236, 244)",
    zeroLineColor: "rgb(234, 236, 244)",
    zeroLineBorderDash: [2],
  },

  border: {
    display: false,
    dash: [2],
  },
}


function getLineColorData(lineColor) {
  return {
    backgroundColor: `rgba(${lineColor}, 0.15)`,
    borderColor: `rgba(${lineColor}, 1)`,
    pointBackgroundColor: `rgba(${lineColor}, 1)`,
    pointBorderColor: `rgba(${lineColor}, 1)`,
    pointHoverBackgroundColor: `rgba(${lineColor}, 1)`,
    pointHoverBorderColor: `rgba(${lineColor}, 1)`,
  }
}

function configLineColor(previousClose, openArray) {
  if (previousClose !== undefined) {
    return openArray[openArray.length - 1] > previousClose
      ? LINE_COLOR.SUCCESS
      : LINE_COLOR.DANGER;
  } else {
    return openArray[openArray.length - 1] > openArray[0]
      ? LINE_COLOR.SUCCESS
      : LINE_COLOR.DANGER 
  }
}


export function configStockAreaChart(config, intervalText) {
  const { graphArray, previousClose } = config;
  const { timeLabels, openArray} = useSortedMarketData(graphArray)

  const [lineColor, setLineColor] = useState(() => {
    return configLineColor(previousClose, openArray)
  });


  useEffect(() => {
    setLineColor(() => {
      return configLineColor(previousClose, openArray)
    });
  }, [openArray, previousClose]);


  const areaData = {
    labels: timeLabels,
    datasets: [
      {
        ...GRAPH_STYLES,
        ...getLineColorData(lineColor),
        label: "Open",
        data: openArray,
      },
      ...(previousClose !== undefined
        ? [
            {
              ...PREV_CLOSE_STYLES,
              label: "Previous Close",
              data: Array(openArray.length).fill(previousClose),
            },
          ]
        : []),
    ],
  };

  const areaOptions = {
    ...AREA_OPS,
    scales: {
      x: {
        ...X_SCALES,
        ticks: {
          callback: (index) => {
            switch (intervalText) {
              case "1D":
                let isoDateTime = getPropValue(graphArray, "dateTime", index)
                let isolatedTime = convertToAMPM(isoDateTime.split(" ")[1]);
                let hourBool = isFullHourDivisibleByThree(isolatedTime);
                if (hourBool) return isolatedTime;
                break;
              case "1W":
                let wDateTime = getPropValue(graphArray, "dateTime", index);
                let wDate = wDateTime.split(" ")[0];
                let wTime = wDateTime.split(" ")[1];
                
                if (wTime === "09:30:00" && index !== 0) return formatMonthDay(wDate);
                break;
              case "1M":
                let mDateTime = getPropValue(graphArray, "dateTime", index);
                let mDate = mDateTime.split(" ")[0];
                let mTime = mDateTime.split(" ")[1];

                if (mTime === "16:00:00" && index !== 0) {
                  let prevDateTime = getPropValue(graphArray, "dateTime", index - 1)
                  let prevDate = prevDateTime.split(" ")[0];
                  let prevDateObj = new Date(prevDate);
                  let currDateObj = new Date(mDate);

                  // Check if the current day is a Monday and the previous trading day was more than one day ago
                  if ((currDateObj - prevDateObj) > 24 * 60 * 60 * 1000) {
                    return formatMonthDay(mDate);
                  }
                }
                break;
            }
          },
        },
      },

      y: {
        ...Y_SCALES,
        ticks: {
          padding: 10,
          callback: (value) => {
            return "$" + value.toFixed(2);
          },
        },
      },
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
              `${formatDateTimeLabel(graphArray[context[0].dataIndex].dateTime)}`,
              `Volume: ${graphArray[context[0].dataIndex].volume}`,
            ];
          },
        },
      },
    },
  };

  return { areaData, areaOptions };
}
