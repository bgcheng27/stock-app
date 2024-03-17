import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const pieData = {
  labels: ["Red", "Blue", "Green"],
  datasets: [
    {
      label: "# of Votes",
      data: [22, 19, 3],
      backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
      hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    },
  ],
};

const options = {
  maintainAspectRatio: false,

  legend: {
    display: false,
  },

  cutout: 90,

  plugins: {
    tooltip: {
      backgroundColor: "rgb(255,255,255)",
      titleColor: "#858796",
      bodyColor: "#858796",

      borderColor: "#dddfeb",
      borderWidth: 1,
      padding: 10,
      displayColors: false,
      caretPadding: 10,
    },
  },
};

export function MyPieChart() {
  return (
    <>
      <div className="chart-pie pt-4 pb-2">
        <Doughnut
          data={pieData}
          options={options}
          className="chartjs-render-monitor"
        />
      </div>
      
      <div className="mt-4 text-center small">
        <span className="mr-2">
          <i className="fas fa-circle text-primary"></i> Direct
        </span>
        <span className="mr-2">
          <i className="fas fa-circle text-success"></i> Social
        </span>
        <span className="mr-2">
          <i className="fas fa-circle text-info"></i> Referral
        </span>
      </div>
    </>
  );
}
