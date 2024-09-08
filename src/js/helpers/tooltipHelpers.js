import { convertToAMPM } from "./dateTimeHelpers";


export function formatMonthDay(inputDate) {
  // Split the input date into year, month, and day
  var parts = inputDate.split("-");
  var month = parts[1];
  var day = parts[2];

  // Define an array of month names
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the month name from the month number
  var monthName = monthNames[parseInt(month) - 1];

  // Return the formatted date string
  return monthName + " " + parseInt(day);
}

export function formatDateTimeLabel(dateTime) {
  const date = dateTime.split(" ")[0];
  const time = dateTime.split(" ")[1];
  return `${formatMonthDay(date)}, ${convertToAMPM(time)} UTC-5`;
}

export function getPropValue(array, prop, index) {
  return array[index][prop];
}
