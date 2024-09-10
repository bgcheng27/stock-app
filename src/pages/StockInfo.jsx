/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

This page is a demonstration of using the alphavantage api

The demo endpoints are used to test api calls after my free trial has ended

Author: Brian Cheng

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  intervalTypeDisplayTextArray,
  statementDisplayTextArray,
} from "../js/data/financialsConfig";

// Components
import { BasicCard } from "../components/BasicCard";
import { DropdownMenu } from "../components/DropdownMenu";
import { OverviewRow } from "../components/OverviewRow";
import { StockAreaChart } from "../components/StockAreaChart";
import { Table } from "../components/table-compenents/Table";
import { TableRow } from "../components/table-compenents/TableRow";


// Helpers
import {
  formatKMBT,
  number_format,
  toPercentValue,
  twoDecimal,
} from "../js/helpers/numberHelpers";
import {
  camelize,
  formatDateForTable
} from "../js/helpers/tableHelpers";
import { formatDateTimeLabel } from "../js/helpers/tooltipHelpers";


// Hooks
import { fetchStockData } from "../js/hooks/fetchStockData";
import { useFinancials } from "../js/hooks/useFinancials";
import { useIntervalArrays } from "../js/hooks/useIntervalArrays";
import { handleErrors } from "../js/errorHandler";


const TABLE_COLUMNS = 3;


function StockInfo() {
  const apiData = useLoaderData();
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
  } = apiData;

  handleErrors(apiData)

  const {
    PERatio: peRatio,
    MarketCapitalization: marketCap,
    DividendYield: dividendYield,
    Exchange: primaryExchange,
  } = overview;

  const { oneDayArray, oneWeekArray, oneMonthArray } = useIntervalArrays(lastRefreshDate, dataPoints);
  const [graph, setGraph] = useState({ array: oneDayArray, prevClose: quoteData["08. previous close"], text: "1D" })

  const { financials, toggleIntervalType, displayFinancialStatement } =
    useFinancials(incomeStatementData, balanceSheetData, cashFlowData);


  return (
    <>
      {/* Header */}
      <h1 className="h3 mb-1 text-gray-800">
        {companyName} ({symbol})
      </h1>
      <p>Last Closing: {formatDateTimeLabel(lastRefreshFull)}</p>


      {/* Interval Type Buttons */}
      <button
        onClick={() => {
          setGraph((prev) => {
            return {...prev, array: oneDayArray, prevClose: quoteData["08. previous close"], text: "1D"}
          })
        }}
        className="btn btn-primary">1D</button>
      <button onClick={() => { 
        setGraph((prev) => {
          return {...prev, array: oneWeekArray, prevClose: undefined, text: "1W"}
        })
        }} className="btn btn-danger">1W</button>
      <button onClick={() => {
        setGraph((prev) => {
          return {...prev, array: oneMonthArray, prevClose: undefined, text: "1M"}
        })
      }} className="btn btn-success">1M</button>


      {/* First Row */}
      <div className="row">
        {/* Stock Area Chart */}
        <div className="col-xl-8 col-lg-6">
          <BasicCard title={graph.text} styleClasses="chart-padding">
            <StockAreaChart
              config={{
                graphArray: graph.array,
                previousClose: graph.prevClose
              }}
              intervalText={graph.text}
            />
          </BasicCard>
        </div>

        {/* Quote Data */}
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


      {/* Second Row */}
      <div className="row">
        {/* Financial Statements */}
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
                    .slice(0, TABLE_COLUMNS)
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
                        .slice(0, TABLE_COLUMNS)
                        .map((report) => {
                          return (
                            <td key={crypto.randomUUID()}>{`${number_format(
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

        {/* About Section */}
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

async function loader({ request: { signal }}) {
  try {
    return fetchStockData(signal);
  } catch (error) {
    return { error: error.message };
  }
}

export const stockInfoRoute = {
  loader,
  element: <StockInfo />,
};
