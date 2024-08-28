export function formatDateForIntradayRange(date) {
  // Adjust for Eastern Time Zone (EST)
  var estOffset = -5 * 60; // Eastern Standard Time is UTC-5
  var estTime = new Date(date.getTime() + estOffset * 60 * 1000);

  // Check if it's Saturday (6) or Sunday (0)
  var dayOfWeek = estTime.getDay();
  if (dayOfWeek === 0) { // Sunday
      estTime.setDate(estTime.getDate() - 2); // Set to Friday (two days ago)
  } else if (dayOfWeek === 6) { // Saturday
      estTime.setDate(estTime.getDate() - 1); // Set to Friday (one day ago)
  }

  // Get the components of the date
  var year = estTime.getFullYear();
  var month = padZeroes(estTime.getMonth() + 1); // Months are 0-indexed
  var day = padZeroes(estTime.getDate());

  // Format the date as yyyy-mm-dd
  var formattedDate = year + "-" + month + "-" + day;

  return formattedDate;
}

function padZeroes(number) {
  return (number < 10 ? '0' : '') + number;
}

// MODIFY THIS.
// add argument: interval which can be 1D, 1W, 1M, 1Y


export function setIntradayArray(latestTradingDay, dataArray, interval) {
  // TODO: check if market is open to determine trading day

  let startIndex, endIndex;

  // may need a useContext for the interval


  if (interval === "1W") {
    startIndex = dataArray.findIndex(data => data.dateTime === `2024-08-19 09:30:00`)
    endIndex = dataArray.findIndex(data => data.dateTime === `2024-08-23 16:00:00`)
    const roll = dataArray.slice(startIndex, endIndex + 1)

    // only do this if "1W"
    const cole = roll.filter((item) => {
      const time = item.dateTime.split(" ")[1]
      const minute = time.split(":")[1]

      if (minute === "30" || minute === "00") {
        return item;
      }
    })

    return cole;


  } else if (interval === "1M") {
    startIndex = dataArray.findIndex(data => data.dateTime === `2024-08-01 09:30:00`)
    endIndex = dataArray.findIndex(data => data.dateTime === `2024-08-23 16:00:00`)

    const john = dataArray.slice(startIndex, endIndex + 1)

    const ron = john.filter((item) => {
      const time = item.dateTime.split(" ")[1]

      if (time === "16:00:00") {
        return item ;
      }
    })

    return ron;

  } else {
    startIndex = dataArray.findIndex(data => data.dateTime === `${latestTradingDay} 09:30:00`)
    endIndex = dataArray.findIndex(data => data.dateTime === `${latestTradingDay} 16:00:00`)
    

    return dataArray.slice(startIndex, endIndex + 1)
  }

}


export function convertToAMPM(time24) {
  // Split the military time into hours and minutes
  var timeArray = time24.split(':');
  var hours = parseInt(timeArray[0]);
  var minutes = parseInt(timeArray[1]);

  // Determine whether it's AM or PM
  var period = (hours >= 12) ? 'PM' : 'AM';

  // Convert hours from military to AM/PM format
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  // Add leading zero to minutes if needed
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  // Return the formatted time
  return hours + ':' + minutes + period;
}


export function afterHours(interval) {
  const timestamps = [];
  const startTime = new Date();
  startTime.setHours(16, interval, 0, 0); // Set start time to 4:01 PM

  const endTime = new Date();
  endTime.setHours(20, 0, 0, 0); // Set end time to 8:00 PM

  while (startTime < endTime) {
      let hours = startTime.getHours();
      let minutes = startTime.getMinutes();
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // Handle midnight as 12 AM
      minutes = minutes < 10 ? '0' + minutes : minutes;
      let timeString = hours + ':' + minutes + ampm;
      timestamps.push(timeString);
      startTime.setTime(startTime.getTime() + interval * 60000); // Add interval minutes
  }

  return timestamps;
}


export function formatMonthDay(inputDate, interval) {
  // Split the input date into year, month, and day
  var parts = inputDate.split('-');
  var month = parts[1];
  var day = parts[2];

  // Define an array of month names
  var monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
  ];

  // Get the month name from the month number
  var monthName = monthNames[parseInt(month) - 1];

  // Return the formatted date string
  return monthName + ' ' + parseInt(day);
}

export function formatDateTimeLabel(dateTime) {
  const date = dateTime.split(" ")[0];
  const time = dateTime.split(" ")[1];
  return `${formatMonthDay(date)}, ${convertToAMPM(time)} UTC-5`;
}


export function extractTime(dateTimeStr) {
  // Regular expression to match the time part
  var timeRegex = /\d{1,2}:\d{2}[AP]M/;

  // Extracting the time part using regex
  var timeMatch = dateTimeStr.match(timeRegex);

  // Returning the matched time
  return timeMatch ? timeMatch[0] : null;
}


export function endsWithFullHour(timeString) {
  // Check if the time ends with ":00" before the AM/PM part
  return timeString.includes(":00") && timeString.split(":")[1].startsWith("00");
}

export function isFullHourDivisibleByThree(timeString) {
  // Check if the time ends with ":00"
  if (endsWithFullHour(timeString)) {
    // Extract the hour part from the time string
    let hourPart = timeString.split(":")[0];
    let period = timeString.slice(-2); // AM or PM

    // Convert the hour to a 24-hour format integer
    let hour = parseInt(hourPart, 10);
    if (period === "PM" && hour !== 12) {
      hour += 12;
    }
    if (period === "AM" && hour === 12) {
      hour = 0;
    }

    // Check if the hour is divisible by 3
    return hour % 3 === 0;
  }
  return false;
}