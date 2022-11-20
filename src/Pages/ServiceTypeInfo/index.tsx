import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import React from "react";
import CustomPanel from "../../Components/CustomPanel";
import Layout from "../../Layout";
import { useAppointment } from "../../Services/Contexts/AppointmentContext";
import ServiceTypeInfoTab from "./ServiceTypeInfoTab";
import SpaIcon from "@mui/icons-material/Spa";
interface Props {
  children?: React.ReactNode;
}

const ServiceTypeInfo: React.FC<Props> = (props) => {
  const { serviceTypeCategory } = useAppointment();
  return (
    <Layout>
      {serviceTypeCategory === "Exam" && (
        <CustomPanel
          tabsHeader={[{ icon: <ScienceOutlinedIcon />, label: "exame" }]}
          tabsContent={[<ServiceTypeInfoTab />]}
        />
      )}
      {serviceTypeCategory === "Cirurgy" && (
        <CustomPanel
          tabsHeader={[{ icon: <HealingOutlinedIcon />, label: "cirurgia" }]}
          tabsContent={[<ServiceTypeInfoTab />]}
        />
      )}
      {serviceTypeCategory === "Product" && (
        <CustomPanel
          tabsHeader={[{ icon: <VaccinesOutlinedIcon />, label: "produto" }]}
          tabsContent={[<ServiceTypeInfoTab />]}
        />
      )}
      {serviceTypeCategory === "Petshop" && (
        <CustomPanel
          tabsHeader={[{ icon: <SpaIcon />, label: "petshop" }]}
          tabsContent={[<ServiceTypeInfoTab />]}
        />
      )}
    </Layout>
  );
};
export default ServiceTypeInfo;
