import { useMemo } from "react";
import { setIntradayArray } from "../helpers/areaChartHelpers";
import { number_format, twoDecimal } from "../helpers/numberHelpers";

export function useIntervalArrays(lastTradingDay, dataPoints) {
  const sortedData = useMemo(() => {
    const initialData = Object.keys(dataPoints)
      .map((key) => {
        return {
          dateTime: key,
          open: twoDecimal(dataPoints[key]["1. open"]),
          volume: number_format(dataPoints[key]["5. volume"]),
        };
      })
      .filter((data) => {
        const date = new Date(data.dateTime);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        // Include only times between 09:30 and 16:00
        if ((hours > 9 || (hours === 9 && minutes >= 30)) && (hours < 16 || (hours === 16 && minutes === 0))) {
          return true;
        }
        return false;
      })
      .sort((a, b) => {
        return new Date(a.dateTime) - new Date(b.dateTime);
      });

    return initialData;
  }, [dataPoints]);
  
  


  const oneDayArray = setIntradayArray(lastTradingDay, sortedData, "1D");
  const oneWeekArray = setIntradayArray(lastTradingDay, sortedData, "1W");
  const oneMonthArray = setIntradayArray(lastTradingDay, sortedData, "1M");

  return { oneDayArray, oneWeekArray, oneMonthArray };
}
