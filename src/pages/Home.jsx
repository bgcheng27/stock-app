import { DropdownCard } from "../components/card-components/DropdownCard";
import { MyPieChart } from "../components/chart-components/MyPieChart";
import { BasicCard } from "../components/card-components/BasicCard";

export function Home() {
  return (
    <>
      <h1>Home</h1>
      <DropdownCard title="Asset Allocation">
        <MyPieChart />
      </DropdownCard>
      <BasicCard title="Basic Card">
        Troll
      </BasicCard>
    </>
  );
}

export const homeRoute = {
  element: <Home />
}
