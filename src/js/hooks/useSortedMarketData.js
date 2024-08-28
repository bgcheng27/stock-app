import { useMemo } from "react";
import { extractTime, formatDateTimeLabel, setIntradayArray } from "../dateHelpers";
import { number_format, twoDecimal } from "../formatters";


// modify sortedData
// add argument: interval which can be 1D, 1W, 1M, 1Y

export function useSortedMarketData(sortedData) {
  // const sortedData = useMemo(() => {
  //   const initialData = Object.keys(dataPoints)
  //     .map((key) => {
  //       return {
  //         dateTime: key,
  //         open: twoDecimal(dataPoints[key]["1. open"]),
  //         volume: number_format(dataPoints[key]["5. volume"]),
  //       };
  //     })
  //     .sort((a, b) => {
  //       return new Date(a.dateTime) - new Date(b.dateTime);
  //     });

  //   // return setIntradayArray(lastRefreshDate, initialData, interval);
  //   return initialData
  //   // NO:: MODIFY IN SET INTRADAY ARRAY
  // }, [dataPoints]);
  

  const volumeArray = useMemo(() => {
    return sortedData.map((item) => {
      return item.volume;
    });
  }, [sortedData]);

  const openArray = useMemo(() => {
    return sortedData.map((item) => {
      return item.open;
    });
  }, [sortedData]);

  const dateTimeArray = useMemo(() => {
    return sortedData.map((item) => {
      return formatDateTimeLabel(item.dateTime);
    });
  }, [sortedData]);

  const timeLabels = useMemo(() => {
    return dateTimeArray.map((dateTime) => {
      return extractTime(dateTime);
    });
  }, [dateTimeArray]);

  return { sortedData, volumeArray, openArray, dateTimeArray, timeLabels }
}