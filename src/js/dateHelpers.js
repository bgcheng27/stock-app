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