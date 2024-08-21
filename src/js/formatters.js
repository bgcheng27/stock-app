export function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + "").replace(",", "").replace(" ", "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

export function twoDecimal(number) {
  number = typeof number === "string" ? parseFloat(number) : number;
  return Number(Math.round(number + "e2") + "e-2").toFixed(2);
}

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

export function toPercentValue(num) {
  return (Number(num) * 100).toFixed(2);
}

export function formatKMBT(num) {
  // Ensure the input is a number
  if (typeof num === "string") {
    num = parseFloat(num);
  }

  // Handle large numbers with suffixes
  const suffixes = ["", "K", "M", "B", "T"];
  let suffixIndex = 0;

  // Adjust the number and find the correct suffix
  while (num >= 1000 && suffixIndex < suffixes.length - 1) {
    num /= 1000;
    suffixIndex++;
  }

  // Limit to 2 decimal places
  num = num.toFixed(2);

  // Remove unnecessary zeros after the decimal
  num = parseFloat(num);

  return num + suffixes[suffixIndex];
}
