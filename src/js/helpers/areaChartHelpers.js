import { useMemo } from "react";


const INTERVAL_MAP = {
  "1D": 1,
  "1W": 5,
  "1M": 30,
}


export function setIntradayArray(latestTradingDay, dataArray, interval) {
  const startDate = getIntervalStartDate(dataArray, INTERVAL_MAP[interval]);
  const startIndex = dataArray.findIndex(data => data.dateTime === `${startDate} 09:30:00`)
  const endIndex = dataArray.findIndex(data => data.dateTime === `${latestTradingDay} 16:00:00`)
  const initialArray = dataArray.slice(startIndex, endIndex + 1)


  if (interval === "1W") {
    return initialArray.filter((item) => {
      const time = item.dateTime.split(" ")[1]
      const minute = time.split(":")[1]

      if (minute === "30" || minute === "00") {
        return item;
      }
    })
  } else if (interval === "1M") {
    return initialArray.filter((item) => {
      const time = item.dateTime.split(" ")[1]

      if (time === "16:00:00") {
        return item ;
      }
    })
  } else {
    return initialArray
  }

}


export function getIntervalStartDate(dataArray, daysAgo) {
  const isoDateArray = useMemo(() => {
    return dataArray.map((item) => {
      return item.dateTime.split(" ")[0]
    })
  }, [dataArray])

  
  const uniqueDates = new Set();
  
  for (let i = isoDateArray.length - 1; i >= 0; i--) {
    uniqueDates.add(isoDateArray[i]);

    if (uniqueDates.size === daysAgo) {
      return isoDateArray[i];
    }
  }

  // in case we don't reach (1M will be on the margin), we just return the start of the array we received
  return isoDateArray[0];
}


