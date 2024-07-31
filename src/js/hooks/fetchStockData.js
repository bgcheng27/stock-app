import { financialsDemo, getFinancials } from "../../api/financials";
import {
  getQuote,
  getQuoteDemo,
  getTimeSeries,
  getTimeSeriesDemo,
  getOverview,
  getOverviewDemo,
} from "../../api/marketData";
import { ERROR_MESSAGES } from "../mockData";
import {
  INCOME_STATEMENT,
  BALANCE_SHEET,
  CASH_FLOW,
} from "../data/financialsConfig";

// maybe a custom hook
export async function fetchStockData(isDemo, signal, symbol) {
  const GRAPH_INTERVAL = isDemo ? "5min" : "1min";

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
    dataPoints: marketData[`Time Series (${GRAPH_INTERVAL})`],
    quoteData: quoteData["Global Quote"],
    description: description["Description"],
  };
}
