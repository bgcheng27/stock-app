export function formatDateForTable(inputDate) {
  var parts = inputDate.split("-");

  var formattedDate = new Date(parts[0], parts[1] - 1, parts[2]);

  var month = formattedDate.getMonth() + 1;
  var day = formattedDate.getDate();
  var year = formattedDate.getFullYear();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  return month + "/" + day + "/" + year;
}


export function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}
