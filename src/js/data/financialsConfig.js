const FINANCIALS_CONFIG = {
  INTERVAL_TYPE: {
    ANNUAL: {
      displayText: "Annual",
      apiCall: "annualReports",
    },
    QUARTERLY: {
      displayText: "Quarterly",
      apiCall: "quarterlyReports",
    },
  },

  STATEMENT: {
    INCOME_STATEMENT: {
      displayText: "Income Statement",
      apiCall: "INCOME_STATEMENT",
      labels: [
        "Total Revenue",
        "Cost of Revenue",
        "Gross Profit",
        "Operating Expenses",
        "Net Income",
      ],
    },
    BALANCE_SHEET: {
      displayText: "Balance Sheet",
      apiCall: "BALANCE_SHEET",
      labels: ["Total Assets", "Total Liabilities"],
    },
    CASH_FLOW: {
      displayText: "Cash Flow",
      apiCall: "CASH_FLOW",
      labels: [
        "Operating Cashflow",
        "Cashflow From Investment",
        "Cashflow From Financing",
      ],
    },
  },
};


export const { ANNUAL, QUARTERLY } = FINANCIALS_CONFIG.INTERVAL_TYPE;
export const { INCOME_STATEMENT, BALANCE_SHEET, CASH_FLOW } =
  FINANCIALS_CONFIG.STATEMENT;


export const statementDisplayTextArray = Object.keys(
  FINANCIALS_CONFIG.STATEMENT
).map((key) => FINANCIALS_CONFIG.STATEMENT[key].displayText);


export const intervalTypeDisplayTextArray = Object.keys(
  FINANCIALS_CONFIG.INTERVAL_TYPE
).map((key) => FINANCIALS_CONFIG.INTERVAL_TYPE[key].displayText);


export const apiKeyVal = {
  "Annual": "annualReports",
  "Quarterly": "quarterlyReports",
  "Income Statement": "INCOME_STATEMENT",
  "Balance Sheet": "BALANCE_SHEET",
  "Cash Flow": "CASH_FLOW"
}