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

export function setIntradayArray(latestTradingDay, dataArray) {
  // TODO: check if market is open to determine trading day

  let startIndex = dataArray.findIndex(data => data.dateTime === `${latestTradingDay} 09:30:00`)
  let endIndex = dataArray.findIndex(data => data.dateTime === `${latestTradingDay} 16:00:00`)

  // if no start index: start slice at -100
  if (startIndex === -1) {
    startIndex = -300;
  }

  // if no end index: just slice from the start index
  if (endIndex === -1) {
    return dataArray.slice(startIndex)
  }

  return dataArray.slice(startIndex, endIndex + 1)
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