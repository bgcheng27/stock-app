/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

This page is a demonstration of using the alphavantage api

The demo endpoints are used to test api calls after my free trial has ended

Author: Brian Cheng

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { financialsDemo, getFinancials } from "../api/financials";
import { Table } from "../components/table-compenents/Table";
import { BasicCard } from "../components/card-components/BasicCard";

import { useLoaderData } from "react-router-dom";
import { useReducer, useMemo } from "react";

import { FINANCIALS } from "../api/financials";
import { TableRow } from "../components/table-compenents/TableRow";
import {
  camelize,
  formatDateForTable,
  number_format,
  twoDecimal,
} from "../js/formatters";
import { MyAreaChart } from "../components/chart-components/MyAreaChart";
import {
  getQuote,
  getQuoteDemo,
  getTimeSeries,
  getTimeSeriesDemo,
} from "../api/marketData";
import {
  extractTime,
  formatDateTimeLabel,
  setIntradayArray,
} from "../js/dateHelpers";
import { HttpError } from "../errors/HttpError";
import { ERROR_MESSAGES } from "../js/mockData";

const INCOME_STATEMENT_LABELS = [
  "Total Revenue",
  "Cost of Revenue",
  "Gross Profit",
  "Operating Expenses",
  "Net Income",
];
const BALANCE_SHEET_LABELS = ["Total Assets", "Total Liabilities"];
const CASH_FLOW_LABELS = [
  "Operating Cashflow",
  "Cashflow From Investment",
  "Cashflow From Financing",
];


const TABLE_CONFIG = {
  // interval type
  ANNUAL: "annualReports",
  QUARTERLY: "quarterlyReports",

  // financial statement
  INCOME_STATMENT: "INCOME_STATEMENT",
  BALANCE_SHEET: "BALANCE_SHEET",
  CASH_FLOW: "CASH_FLOW",
};

const NUM_INTERVALS = 3;

const IS_DEMO = true;

const GRAPH_INTERVAL = IS_DEMO ? "5min" : "1min";

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

function StockInfo() {
  const {
    incomeStatementData,
    balanceSheetData,
    cashFlowData,
    symbol,
    dataPoints,
    quoteData,
    error,
  } = useLoaderData();

  if (error) {
    throw new Error(error);
  }

  // if symbol does not exist, throw 404
  const [financials, dispatch] = useReducer(reducer, {
    cardTitle: "Income Statement",
    currentLabelList: INCOME_STATEMENT_LABELS,
    currentData: incomeStatementData,
    intervalType: "annualReports",
  });

  // Create a useMemo hook to sort out the data points
  const sortedData = useMemo(() => {
    const initialData = Object.keys(dataPoints)
      .map((key) => {
        return {
          dateTime: key,
          open: twoDecimal(dataPoints[key]["1. open"]),
          volume: number_format(dataPoints[key]["5. volume"]),
        };
      })
      .sort((a, b) => {
        return new Date(a.dateTime) - new Date(b.dateTime);
      });

    return setIntradayArray(quoteData["07. latest trading day"], initialData);
  }, [dataPoints]);

  const volumeArray = useMemo(() => {
    return sortedData.map((item) => {
      return item.volume;
    });
  }, [sortedData]);

  const openArray = useMemo(() => {
    return sortedData.map((item) => {
      return item.open;
    });
  }, [sortedData]);

  const dateTimeArray = useMemo(() => {
    return sortedData.map((item) => {
      return formatDateTimeLabel(item.dateTime);
    });
  }, [sortedData]);

  const timeLabels = useMemo(() => {
    return dateTimeArray.map((dateTime) => {
      return extractTime(dateTime);
    });
  }, [dateTimeArray]);

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

  return (
    <>
      <h1 className="h3 mb-0 text-gray-800 mb-4">{symbol}</h1>

      <div className="row">
        <div className="col-xl-8 col-lg-5">
          <BasicCard title={symbol}>
            <MyAreaChart
              xTimeLabels={timeLabels}
              xLabels={dateTimeArray}
              xData={openArray}
              xVolume={volumeArray}
              previousClose={quoteData["08. previous close"]}
            />
          </BasicCard>
        </div>
        <div className="col-xl-4 col-lg-2">
          <BasicCard title="Quote">
            <div className="d-flex justify-content-between">
              <span>Previous Close:</span>
              <span>${twoDecimal(quoteData["08. previous close"])}</span>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <span>Open:</span>
              <span>${twoDecimal(quoteData["02. open"])}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Day Range:</span>
              <span>
                ${twoDecimal(quoteData["04. low"])} - $
                {twoDecimal(quoteData["03. high"])}
              </span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Volume:</span>
              <span>{number_format(quoteData["06. volume"])}</span>
            </div>
          </BasicCard>
        </div>
      </div>

      <h1 className="h3 mb-0 text-gray-800 mb-4">Financials</h1>
      <div className="row d-flex flex-row justify-content-between">
        <div className="col-xl-8 col-lg-5">
        <div>
          <button
            onClick={() =>
              displayFinancialStatement(TABLE_CONFIG.INCOME_STATMENT)
            }
            className="btn btn-danger mb-3"
          >
            Income Statement
          </button>
          <button
            onClick={() =>
              displayFinancialStatement(TABLE_CONFIG.BALANCE_SHEET)
            }
            className="btn btn-warning mb-3"
          >
            Balance Sheet
          </button>
          <button
            onClick={() => displayFinancialStatement(TABLE_CONFIG.CASH_FLOW)}
            className="btn btn-success mb-3"
          >
            Cash Flow Statement
          </button>
        </div>

        <div>
          <button
            onClick={() => toggleIntervalType(TABLE_CONFIG.ANNUAL)}
            className="btn btn-primary mb-3"
          >
            Annual
          </button>
          <button
            onClick={() => toggleIntervalType(TABLE_CONFIG.QUARTERLY)}
            className="btn btn-secondary mb-3"
          >
            Quarterly
          </button>
        </div>
        </div>
      </div>

      {/* Financial Statements */}
      <div className="row">
        <div className="col-xl-8 col-lg-5">
          <BasicCard
            title={`${financials.cardTitle} (${
              financials.intervalType === "annualReports"
                ? "Annual"
                : "Quarterly"
            })`}
          >
            {/* <Table /> */}
            <Table>
              <thead>
                <tr>
                  <th>Breakdown</th>
                  {financials.currentData[financials.intervalType]
                    .slice(0, NUM_INTERVALS)
                    .map((report) => {
                      return (
                        <th key={crypto.randomUUID()}>
                          {formatDateForTable(report.fiscalDateEnding)}
                        </th>
                      );
                    })}
                </tr>
              </thead>

              <tbody>
                {financials.currentLabelList.map((label, index) => {
                  return (
                    <TableRow key={index} label={label}>
                      {financials.currentData[financials.intervalType]
                        .slice(0, NUM_INTERVALS)
                        .map((report) => {
                          return (
                            <td key={crypto.randomUUID()}>{`$${number_format(
                              report[camelize(label)]
                            )}`}</td>
                          );
                        })}
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>
          </BasicCard>
        </div>
      </div>
    </>
  );
}

async function loader({ request: { signal }, params: { symbol } }) {
  try {
    let incomeStatementData,
      balanceSheetData,
      cashFlowData,
      marketData,
      quoteData;

    if (IS_DEMO) {
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
  } catch (error) {
    console.log("Error: ", error);

    return { error: error.message };
  }
}

export const stockInfoRoute = {
  loader,
  element: <StockInfo />,
};
