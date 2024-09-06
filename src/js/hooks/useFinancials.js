import { useReducer } from "react";
import { INCOME_STATEMENT, BALANCE_SHEET, CASH_FLOW } from "../data/financialsConfig";


function reducer(financials, { type, payload }) {
  switch (type) {
    case "SET_INTERVAL_TYPE":
      return {
        ...financials,
        intervalType: payload.intervalType,
      };
    case "DISPLAY_FINANCIAL_STATEMENT":
      return {
        ...financials,
        cardTitle: payload.cardTitle,
        currentData: payload.currentData,
        currentLabelList: payload.currentLabelList,
      };
    default:
      return financials;
  }
}

export function useFinancials(
  incomeStatementData,
  balanceSheetData,
  cashFlowData
) {

  const [financials, dispatch] = useReducer(reducer, {
    cardTitle: INCOME_STATEMENT.displayText,
    currentLabelList: INCOME_STATEMENT.labels,
    currentData: incomeStatementData,
    intervalType: "annualReports",
  });

  function toggleIntervalType(type) {
    dispatch({
      type: "SET_INTERVAL_TYPE",
      payload: {
        intervalType: type,
      },
    });
  }

  function displayFinancialStatement(type) {
    let cardTitle;
    let currentData;
    let currentLabelList;

    switch (type) {
      case INCOME_STATEMENT.apiCall:
        cardTitle = INCOME_STATEMENT.displayText;
        currentLabelList = INCOME_STATEMENT.labels;
        currentData = incomeStatementData;
        break;
      case BALANCE_SHEET.apiCall:
        cardTitle = BALANCE_SHEET.displayText;
        currentLabelList = BALANCE_SHEET.labels;
        currentData = balanceSheetData;
        break;
      case CASH_FLOW.apiCall:
        cardTitle = CASH_FLOW.displayText
        currentLabelList = CASH_FLOW.labels
        currentData = cashFlowData;
        break;
      default:
        break;
    }

    dispatch({
      type: "DISPLAY_FINANCIAL_STATEMENT",
      payload: {
        cardTitle,
        currentData,
        currentLabelList,
      },
    });
  }

  return { financials, toggleIntervalType, displayFinancialStatement };
}
