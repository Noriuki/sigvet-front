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

const Home: React.FC<Props> = (props) => {
  const { homeData, homeGraphData } = useVeterinary();

  return (
    <Layout>
      <ContentContainer overflow="visible">
        <ContentContainer overflow="visible" height="35%" width="100%">
          <DisplayCard
            title="Novos Pacientes (mês atual)"
            value={homeData.animalsOfMonth}
            percentage={homeData?.animalsPercentage}
          />
          <DisplayCard
            title="Consultas (mês atual)"
            value={homeData.appointmentsOfMonth}
            percentage={homeData?.appointmentPercentage}
          />
          <DisplayCard
            title="Serviços (mês atual)"
            value={homeData.servicesOfMonth}
            percentage={homeData?.servicePercentage}
          />
        </ContentContainer>
        <ContentContainer height="60%" padding="1rem" shadow>
          <Line
            data={homeGraphData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                line: {
                  tension: 0.35,
                },
              },
            }}
          />
        </ContentContainer>
      </ContentContainer>
    </Layout>
  );
};
export default Home;
