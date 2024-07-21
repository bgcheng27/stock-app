import { useReducer } from "react";
import {
  BALANCE_SHEET_LABELS,
  CASH_FLOW_LABELS,
  INCOME_STATEMENT_LABELS,
} from "../mockData";


export const TABLE_CONFIG = {
  // interval type
  ANNUAL: "annualReports",
  QUARTERLY: "quarterlyReports",

  // financial statement
  INCOME_STATMENT: "INCOME_STATEMENT",
  BALANCE_SHEET: "BALANCE_SHEET",
  CASH_FLOW: "CASH_FLOW",
};


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
    cardTitle: "Income Statement",
    currentLabelList: INCOME_STATEMENT_LABELS,
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
      case TABLE_CONFIG.INCOME_STATMENT:
        cardTitle = "Income Statement";
        currentData = incomeStatementData;
        currentLabelList = INCOME_STATEMENT_LABELS;
        break;
      case TABLE_CONFIG.BALANCE_SHEET:
        cardTitle = "Balance Sheet";
        currentData = balanceSheetData;
        currentLabelList = BALANCE_SHEET_LABELS;
        break;
      case TABLE_CONFIG.CASH_FLOW:
        cardTitle = "Cash Flow";
        currentData = cashFlowData;
        currentLabelList = CASH_FLOW_LABELS;
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
