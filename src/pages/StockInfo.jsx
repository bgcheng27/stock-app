/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

This page is a demonstration of using the alphavantage api

The demo endpoints are used to test api calls after my free trial has ended

Author: Brian Cheng

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { BasicCard } from "../components/card-components/BasicCard";
import { Table } from "../components/table-compenents/Table";
import { TableRow } from "../components/table-compenents/TableRow";

import { useLoaderData } from "react-router-dom";
import {
  camelize,
  formatDateForTable,
  formatKMBT,
  number_format,
  toPercentValue,
  twoDecimal,
} from "../js/formatters";
import { StockAreaChart } from "../components/chart-components/StockAreaChart";

import { fetchStockData } from "../js/hooks/fetchStockData";
import { useSortedMarketData } from "../js/hooks/useSortedMarketData";
import { useFinancials } from "../js/hooks/useFinancials";
import { DropdownMenu } from "../components/DropdownMenu";
import {
  intervalTypeDisplayTextArray,
  statementDisplayTextArray,
} from "../js/data/financialsConfig";
import { ERROR_MESSAGES } from "../js/mockData";
import { formatDateTimeLabel } from "../js/dateHelpers";
import { OverviewRow } from "../components/OverviewRow";
import { useState } from "react";
import { useIntervalArrays } from "../js/hooks/useIntervalArrays";

const NUM_INTERVALS = 3;
const IS_DEMO = true;

function StockInfo() {
  const {
    incomeStatementData,
    balanceSheetData,
    cashFlowData,
    symbol,
    dataPoints,
    quoteData,
    description,
    companyName,
    overview,
    lastRefreshDate,
    lastRefreshFull,
    error,
  } = useLoaderData();

  const {
    PERatio: peRatio,
    MarketCapitalization: marketCap,
    DividendYield: dividendYield,
    Exchange: primaryExchange,
  } = overview;

  if (incomeStatementData["Information"]) {
    throw new Error(ERROR_MESSAGES.FAILED_TO_RETRIEVE_DATA);
  }

  if (symbol == undefined) {
    throw new Error(ERROR_MESSAGES.SYMBOL_NOT_FOUND);
  }

  if (error) {
    throw new Error(error);
  }

  const { oneDayArray, oneWeekArray, oneMonthArray } = useIntervalArrays(lastRefreshDate, dataPoints);
  console.log(dataPoints)


  const [arr, setArr] = useState(oneDayArray)
  const [prevCloseState, setPrevCloseState] = useState(quoteData["08. previous close"])
  const [intervalText, setIntervalText] = useState("1D")


  const { financials, toggleIntervalType, displayFinancialStatement } =
    useFinancials(incomeStatementData, balanceSheetData, cashFlowData);

  const { volumeArray, openArray, dateTimeArray, timeLabels } =
    useSortedMarketData(arr);


  return (
    <>
      <h1 className="h3 mb-1 text-gray-800">
        {companyName} ({symbol})
      </h1>
      <p>Last Closing: {formatDateTimeLabel(lastRefreshFull)}</p>

      <button
        onClick={() => {
          setArr(oneDayArray)
          setPrevCloseState(quoteData["08. previous close"])
          setIntervalText("1D")
        }}
        className="btn btn-primary">1D</button>
      <button onClick={() => { 
        setArr(oneWeekArray) 
        setPrevCloseState(undefined)
        setIntervalText("1W")
        }} className="btn btn-danger">1W</button>
      <button onClick={() => {
        setArr(oneMonthArray)
        setPrevCloseState(undefined)
        setIntervalText("1M")
      }} className="btn btn-success">1M</button>



      {/* Area Chart */}
      <div className="row">
        <div className="col-xl-8 col-lg-6">
          {/* Stock Area Chart */}
          <BasicCard title={intervalText} styleClasses="chart-padding">
            <StockAreaChart
              config={{
                xTimeLabels: timeLabels,
                xLabels: dateTimeArray,
                xData: openArray,
                xVolume: volumeArray,
                previousClose: prevCloseState
              }}
            />
          </BasicCard>
        </div>

        {/* Stock Info: (Open, Close, High, etc.) */}
        <div className="col-xl-4 col-lg-6">
          <BasicCard title="Quote">
            <OverviewRow
              label="Previous Close"
              value={`$${twoDecimal(quoteData["08. previous close"])}`}
            />
            <OverviewRow
              label="Open"
              value={`$${twoDecimal(quoteData["02. open"])}`}
            />
            <OverviewRow
              label="Day Range"
              value={`$${twoDecimal(quoteData["04. low"])} - $${twoDecimal(
                quoteData["03. high"]
              )}`}
            />
            <OverviewRow
              label="Volume"
              value={number_format(quoteData["06. volume"])}
            />
            <OverviewRow label="Market Cap" value={formatKMBT(marketCap)} />
            <OverviewRow label="P/E Ratio" value={peRatio} />
            <OverviewRow
              label="Dividend Yield"
              value={`${toPercentValue(dividendYield)}%`}
            />
            <OverviewRow label="Primary Exchange" value={primaryExchange} />
          </BasicCard>
        </div>
      </div>

      {/* Set Financial State Menu */}
      <h1 className="h3 mb-0 text-gray-800 mb-4">Financials</h1>
      <div className="row">
        <div className="col-xl-8 col-lg-6 d-flex mb-3">
          <DropdownMenu
            color="primary"
            options={statementDisplayTextArray}
            fn={displayFinancialStatement}
          ></DropdownMenu>

          <DropdownMenu
            color="secondary"
            options={intervalTypeDisplayTextArray}
            fn={toggleIntervalType}
          ></DropdownMenu>
        </div>
      </div>

      {/* Financial Statements */}
      <div className="row">
        <div className="col-xl-8 col-lg-6">
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
        <div className="col-xl-4 col-lg-6">
          <BasicCard title="About">
            <p>
              {description}{" "}
              <a href={`https://en.wikipedia.org/wiki/${symbol}`}>Wikipedia</a>
            </p>
          </BasicCard>
        </div>
      </div>
    </>
  );
}

async function loader({ request: { signal }, params: { symbol } }) {
  try {
    return fetchStockData(IS_DEMO, signal, symbol);
  } catch (error) {
    return { error: error.message };
  }
}

export const stockInfoRoute = {
  loader,
  element: <StockInfo />,
};
