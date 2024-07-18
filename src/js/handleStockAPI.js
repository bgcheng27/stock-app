import { FINANCIALS, financialsDemo, getFinancials } from "../api/financials";
import { getQuote, getQuoteDemo, getTimeSeries, getTimeSeriesDemo } from "../api/marketData";


export async function fetchStockData(isDemo, signal, symbol) {
  let incomeStatementData,
    balanceSheetData,
    cashFlowData,
    marketData,
    quoteData;

  const GRAPH_INTERVAL = isDemo ? "5min" : "1min";
  
  if (isDemo) {
    incomeStatementData = financialsDemo(FINANCIALS.INCOME_STATEMENT, {
      signal,
    });
    balanceSheetData = financialsDemo(FINANCIALS.BALANCE_SHEET, { signal });
    cashFlowData = financialsDemo(FINANCIALS.CASH_FLOW, { signal });
    marketData = await getTimeSeriesDemo({ signal });
    quoteData = await getQuoteDemo({ signal });
  } else {
    incomeStatementData = await getFinancials(
      FINANCIALS.INCOME_STATEMENT,
      symbol.toUpperCase(),
      { signal }
    );
    balanceSheetData = await getFinancials(
      FINANCIALS.BALANCE_SHEET,
      symbol.toUpperCase(),
      { signal }
    );
    cashFlowData = await getFinancials(
      FINANCIALS.CASH_FLOW,
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
  }

  if (marketData["Information"] || quoteData["Information"]) {
    throw new Error(ERROR_MESSAGES.FAILED_TO_RETRIEVE_DATA);
  }

  return {
    incomeStatementData: await incomeStatementData,
    balanceSheetData: await balanceSheetData,
    cashFlowData: await cashFlowData,

    symbol: marketData["Meta Data"]["2. Symbol"],
    dataPoints: marketData[`Time Series (${GRAPH_INTERVAL})`],
    quoteData: quoteData["Global Quote"],
  };
}
