import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import React from "react";
import { useParams } from "react-router-dom";
import CustomPanel from "../../Components/CustomPanel";
import Layout from "../../Layout";
import AppointmentFinanceTab from "./AppointmentFinanceTab";
import AppointmentInfoTab from "./AppointmentInfoTab";
import AppointmentServiceTab from "./AppointmentServiceTab";
import useAppointmentInfo from "./useAppointmentInfo";
interface Props {
  children?: React.ReactNode;
}

const AppointmentInfo: React.FC<Props> = (props) => {
  const { id } = useParams();
  const { serviceList } = useAppointmentInfo(id || null);
  const tabsHeader = [
    { icon: <PendingActionsIcon />, label: "cliente" },
    { icon: <ScienceOutlinedIcon />, label: "serviços" },
    { icon: <MonetizationOnOutlinedIcon />, label: "financeiro" },
  ];

  const tabsContent = [
    <AppointmentInfoTab />,
    <AppointmentServiceTab serviceList={serviceList} />,
    <AppointmentFinanceTab serviceList={serviceList} />,
  ];

  return (
    <Layout>
      <CustomPanel tabsHeader={tabsHeader} tabsContent={tabsContent} />
    </Layout>
  );
};
export default AppointmentInfo;
