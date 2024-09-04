import { useMemo } from "react";

export function getIntervalStartDate(dataArray, daysAgo) {
  const isoDateArray = useMemo(() => {
    return dataArray.map((item) => {
      return item.dateTime.split(" ")[0]
    })
  }, [dataArray])
  
  const uniqueDates = new Set();
  
  // Iterate through the dateTimeArray in reverse
  for (let i = isoDateArray.length - 1; i >= 0; i--) {
    // Add the current date to the Set
    uniqueDates.add(isoDateArray[i]);

    // If the Set size reaches the desired number of days, return the date
    if (uniqueDates.size === daysAgo) {
      return isoDateArray[i];
    }
  }

  return isoDateArray[0];
}
