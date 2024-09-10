import { financialsDemo } from "../../api/financials";
import { getQuoteDemo, getTimeSeriesDemo, getOverviewDemo } from "../../api/marketData";
import { INCOME_STATEMENT, BALANCE_SHEET, CASH_FLOW } from "../data/financialsConfig"


export async function fetchStockData(signal) {
  let 
    expectedSymbol,
    lastRefreshDate,
    lastRefreshFull;

    let incomeStatementData = financialsDemo(INCOME_STATEMENT.apiCall, {
      signal,
    });
    let balanceSheetData = financialsDemo(BALANCE_SHEET.apiCall, { signal });
    let cashFlowData = financialsDemo(CASH_FLOW.apiCall, { signal });
    let marketData = await getTimeSeriesDemo({ signal });
    let quoteData = await getQuoteDemo({ signal });
    let overview = await getOverviewDemo({ signal })

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
    dataPoints: marketData[`Time Series (5min)`],
    quoteData: quoteData["Global Quote"],
    description: overview["Description"],
    companyName: overview["Name"],
    overview,
    lastRefreshDate,
    lastRefreshFull
  };
}
