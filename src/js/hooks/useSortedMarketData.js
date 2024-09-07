import { useMemo } from "react";
import { extractTime } from "../dateHelpers";
import { formatDateTimeLabel } from "../tooltipHelpers";


export function useSortedMarketData(sortedData) {
  const openArray = useMemo(() => {
    return sortedData.map((item) => {
      return item.open;
    });
  }, [sortedData]);

  const timeLabels = useMemo(() => {
    return sortedData.map((item) => {
      const dateTime = formatDateTimeLabel(item.dateTime);
      return extractTime(dateTime);
    });
  }, [sortedData]);
  
  return { sortedData, openArray, timeLabels }
}