export const USER_STOCKS = ["GOOG", "HD", "JPM", "JNJ", "TSLA", "NVDA"]

export const ERROR_MESSAGES = {
  SYMBOL_NOT_FOUND: "Symbol Not Found",
  UNDEFINED_SYMBOL: "Cannot read properties of undefined (reading '2. Symbol')",
  FAILED_TO_RETRIEVE_DATA: "Failed to retrieve Data",
}

export const INCOME_STATEMENT_LABELS = [
  "Total Revenue",
  "Cost of Revenue",
  "Gross Profit",
  "Operating Expenses",
  "Net Income",
];
export const BALANCE_SHEET_LABELS = ["Total Assets", "Total Liabilities"];

export const CASH_FLOW_LABELS = [
  "Operating Cashflow",
  "Cashflow From Investment",
  "Cashflow From Financing",
];

export function parseErrorMessage(message) {
  return `Error: ${message}`
}