import { financialsDemo, getFinancials } from "../../api/financials";
import { getQuote, getQuoteDemo, getTimeSeries, getTimeSeriesDemo, getOverview, getOverviewDemo } from "../../api/marketData";
import { INCOME_STATEMENT, BALANCE_SHEET, CASH_FLOW } from "../data/financialsConfig"

// maybe a custom hook
export async function fetchStockData(isDemo, signal, symbol) {
  let incomeStatementData,
    balanceSheetData,
    cashFlowData,
    marketData,
    quoteData,
    overview,
    expectedSymbol,
    lastRefreshDate,
    lastRefreshFull;

  const GRAPH_INTERVAL = isDemo ? "5min" : "1min";
  
  if (isDemo) {
    incomeStatementData = financialsDemo(INCOME_STATEMENT.apiCall, {
      signal,
    });
    balanceSheetData = financialsDemo(BALANCE_SHEET.apiCall, { signal });
    cashFlowData = financialsDemo(CASH_FLOW.apiCall, { signal });
    marketData = await getTimeSeriesDemo({ signal });
    quoteData = await getQuoteDemo({ signal });
    overview = await getOverviewDemo({ signal })
  } else {
    incomeStatementData = getFinancials(
      INCOME_STATEMENT.apiCall,
      symbol.toUpperCase(),
      { signal }
    );
    balanceSheetData = getFinancials(
      BALANCE_SHEET.apiCall,
      symbol.toUpperCase(),
      { signal }
    );
    cashFlowData = await getFinancials(
      CASH_FLOW.apiCall,
      symbol.toUpperCase(),
      { signal }
    );
    marketData = await getTimeSeries(
      "TIME_SERIES_INTRADAY",
      symbol.toUpperCase(),
      GRAPH_INTERVAL,
      "false",
      "full",
      { signal }
    );
    quoteData = await getQuote(symbol.toUpperCase(), { signal });
    overview = await getOverview(symbol.toUpperCase(), { signal })
  }

  if (marketData["Meta Data"]) {
    expectedSymbol = marketData["Meta Data"]["2. Symbol"]
    lastRefreshDate = marketData["Meta Data"]["3. Last Refreshed"].split(" ")[0]
    lastRefreshFull = marketData["Meta Data"]["3. Last Refreshed"]
  } else {
    expectedSymbol = undefined
  }


  return {
    incomeStatementData: await incomeStatementData,
    balanceSheetData: await balanceSheetData,
    cashFlowData: await cashFlowData,
    symbol: expectedSymbol,
    dataPoints: marketData[`Time Series (${GRAPH_INTERVAL})`],
    quoteData: quoteData["Global Quote"],
    description: overview["Description"],
    companyName: overview["Name"],
    overview,
    lastRefreshDate,
    lastRefreshFull
  };
}
