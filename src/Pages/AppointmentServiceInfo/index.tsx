import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import React from "react";
import CustomPanel from "../../Components/CustomPanel";
import Layout from "../../Layout";
import { useAppointment } from "../../Services/Contexts/AppointmentContext";
import AppointmentServiceInfoTab from "./AppointmentServiceInfoTab";
import SpaIcon from "@mui/icons-material/Spa";
interface Props {
  children?: React.ReactNode;
}

const AppointmentServiceInfo: React.FC<Props> = (props) => {
  const { appointmentServiceCategory } = useAppointment();
  return (
    <Layout>
      {appointmentServiceCategory === "Exam" && (
        <CustomPanel
          tabsHeader={[{ icon: <ScienceOutlinedIcon />, label: "exame" }]}
          tabsContent={[<AppointmentServiceInfoTab />]}
        />
      )}
      {appointmentServiceCategory === "Cirurgy" && (
        <CustomPanel
          tabsHeader={[{ icon: <HealingOutlinedIcon />, label: "cirurgia" }]}
          tabsContent={[<AppointmentServiceInfoTab />]}
        />
      )}
      {appointmentServiceCategory === "Product" && (
        <CustomPanel
          tabsHeader={[{ icon: <VaccinesOutlinedIcon />, label: "produto" }]}
          tabsContent={[<AppointmentServiceInfoTab />]}
        />
      )}
      {appointmentServiceCategory === "Petshop" && (
        <CustomPanel
          tabsHeader={[{ icon: <SpaIcon />, label: "petshop" }]}
          tabsContent={[<AppointmentServiceInfoTab />]}
        />
      )}
    </Layout>
  );
};
export default AppointmentServiceInfo;
