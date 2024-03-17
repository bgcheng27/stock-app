/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

This page provides information on a company's three primary financial statements:
  - Income Statement
  - Balance Statement
  - Cash Flow Statement

Here, users will also be able to calculate the following to determine if the
company is worth investing in:
  - Liquidity
  - Net Profit Margin

Author: Brian Cheng

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { getFinancials } from "../api/financials";
import { useLoaderData } from "react-router-dom";

import { MyPieChart } from "../components/chart-components/MyPieChart";
import { MyAreaChart } from "../components/chart-components/MyAreaChart";

export function Quant() {
  const datarr = useLoaderData();
  console.log(datarr);

  return (
    <>
      <MyAreaChart />
    </>
  )
}

async function loader({ request: { signal } }) {
  //   return await getIncomeStatement({ signal });
}

export const quantRoute = {
  //   loader,
  element: <Quant />,
};
