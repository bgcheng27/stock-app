export const USER_STOCKS = ["GOOG", "HD", "JPM", "JNJ", "TSLA", "NVDA"]

export const ERROR_MESSAGES = {
  SYMBOL_NOT_FOUND: "Symbol Not Found",
  UNDEFINED_SYMBOL: "Cannot read properties of undefined (reading '2. Symbol')",
  FAILED_TO_RETRIEVE_DATA: "Failed to retrieve Data",
}

export function formatErrorMessage(message) {
  return `Error: ${message}`
}