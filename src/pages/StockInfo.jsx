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
  number_format,
  twoDecimal,
} from "../js/formatters";
import { MyAreaChart } from "../components/chart-components/MyAreaChart";


import { fetchStockData } from "../js/hooks/fetchStockData";
import { useSortedMarketData } from "../js/hooks/useSortedMarketData";
import { useFinancials } from "../js/hooks/useFinancials";
import { TABLE_CONFIG } from "../js/hooks/useFinancials";


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
    error,
  } = useLoaderData();


  if (error) {
    throw new Error(error);
  }


  const { financials, toggleIntervalType, displayFinancialStatement } = useFinancials(incomeStatementData, balanceSheetData, cashFlowData);
  const { volumeArray, openArray, dateTimeArray, timeLabels } = useSortedMarketData(dataPoints, quoteData)


  return (
    <>
      <h1 className="h3 mb-0 text-gray-800 mb-4">{symbol}</h1>

      {/* Area Chart */}
      <div className="row">
        <div className="col-xl-8 col-lg-5">

          {/* Stock Area Chart */}
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

        {/* Stock Info: (Open, Close, High, etc.) */}
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

      {/* Set Financial State Menu */}
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
    return fetchStockData(IS_DEMO, signal, symbol);
  } catch (error) {
    return { error: error.message };
  }
}

export const stockInfoRoute = {
  loader,
  element: <StockInfo />,
};
