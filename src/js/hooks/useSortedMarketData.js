import { useMemo } from "react";
import { extractTime, formatDateTimeLabel, setIntradayArray } from "../dateHelpers";
import { number_format, twoDecimal } from "../formatters";


export function useSortedMarketData(sortedData) {
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