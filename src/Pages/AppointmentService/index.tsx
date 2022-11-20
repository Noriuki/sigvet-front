import React from "react";
import Layout from "../../Layout";
import AppointmentServiceTable from "./AppointmentServiceTable";
interface Props {
  children?: React.ReactNode;
}

const AppointmentService: React.FC<Props> = (props) => {
  return (
    <Layout>
      <AppointmentServiceTable />
    </Layout>
  );
};
export default AppointmentService;
