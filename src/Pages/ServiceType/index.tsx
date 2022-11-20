import React from "react";
import Layout from "../../Layout";
import ServiceTypeTable from "./ServiceTypeTable";

interface IProps {
  children?: React.ReactNode;
}

const ServiceType: React.FC<IProps> = () => {
  return (
    <Layout>
      <ServiceTypeTable />
    </Layout>
  );
};
export default ServiceType;
