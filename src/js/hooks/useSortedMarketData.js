import { useMemo } from "react";
import { extractTime, formatDateTimeLabel, setIntradayArray } from "../dateHelpers";
import { number_format, twoDecimal } from "../formatters";

export function useSortedMarketData(dataPoints, quoteData) {
  const sortedData = useMemo(() => {
    const initialData = Object.keys(dataPoints)
      .map((key) => {
        return {
          dateTime: key,
          open: twoDecimal(dataPoints[key]["1. open"]),
          volume: number_format(dataPoints[key]["5. volume"]),
        };
      })
      .sort((a, b) => {
        return new Date(a.dateTime) - new Date(b.dateTime);
      });

    return setIntradayArray(quoteData["07. latest trading day"], initialData);
  }, [dataPoints]);

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