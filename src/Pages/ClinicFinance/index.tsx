import { GridColDef } from "@mui/x-data-grid";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import ContentContainer from "../../Components/ContentContainer";
import DisplayCard from "../../Components/DisplayCard";
import Layout from "../../Layout";
import { useVeterinary } from "../../Services/Contexts/VeterinaryClinicContext";
interface Props {
  children?: React.ReactNode;
}
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ClinicFinance: React.FC<Props> = (props) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.35,
      },
    },
  };

  const { financeData, financeGraphData } = useVeterinary();

  return (
    <Layout>
      <ContentContainer overflow="visible">
        <ContentContainer overflow="visible" height="35%" width="100%">
          <DisplayCard
            title="Receita total"
            value={`R$ ${
              Math.fround(financeData.totalRevenueOfMonth).toFixed(2) || 0
            }`}
          />
          <DisplayCard
            title="Média por consulta"
            value={`R$ ${
              Math.fround(financeData.averageAppointmentPriceOfMonth).toFixed(
                2
              ) || 0
            }`}
          />
          <DisplayCard
            title="Média por serviço"
            value={`R$ ${
              Math.fround(financeData.averageServicePriceOfMonth).toFixed(2) ||
              0
            }`}
          />
        </ContentContainer>
        <ContentContainer height="60%" padding="1rem" shadow>
          <Line data={financeGraphData} options={options} />
        </ContentContainer>
      </ContentContainer>
    </Layout>
  );
};

export default ClinicFinance;
