import React from "react";
import Layout from "../../Layout";
import AppointmentTable from "./AppointmentTable";
interface Props {
  children?: React.ReactNode;
}

const Appointment: React.FC<Props> = (props) => {
  return (
    <Layout>
      <AppointmentTable />
    </Layout>
  );
};
export default Appointment;
