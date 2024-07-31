import { financialsDemo } from "../../api/financials";
import {
  getQuoteDemo,
  getTimeSeriesDemo,
  getOverviewDemo,
} from "../../api/marketData";
import {
  INCOME_STATEMENT,
  BALANCE_SHEET,
  CASH_FLOW,
} from "../data/financialsConfig";

// maybe a custom hook
export async function fetchStockData(signal, symbol) {
  let incomeStatementData = financialsDemo(INCOME_STATEMENT.apiCall, {
    signal,
  });
  let balanceSheetData = financialsDemo(BALANCE_SHEET.apiCall, { signal });
  let cashFlowData = financialsDemo(CASH_FLOW.apiCall, { signal });
  let marketData = await getTimeSeriesDemo({ signal });
  let quoteData = await getQuoteDemo({ signal });
  let description = await getOverviewDemo({ signal });

  return {
    incomeStatementData: await incomeStatementData,
    balanceSheetData: await balanceSheetData,
    cashFlowData: await cashFlowData,

    symbol,
    dataPoints: marketData[`Time Series (5min)`],
    quoteData: quoteData["Global Quote"],
    description: description["Description"],
  };
}
