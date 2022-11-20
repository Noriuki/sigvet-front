import React from "react";
import Layout from "../../Layout";
import PetOwnerTable from "./PetOwnerTable";

interface IProps {
  children?: React.ReactNode;
}

const PetOwner: React.FC<IProps> = (props) => {
  return (
    <Layout>
      <PetOwnerTable />
    </Layout>
  );
};

export default PetOwner;
