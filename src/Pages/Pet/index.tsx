import React from "react";
import Layout from "../../Layout";
import PetTable from "./PetTable";
interface Props {
  children?: React.ReactNode;
}

const Pet: React.FC<Props> = (props) => {
  return (
    <Layout>
      <PetTable />
    </Layout>
  );
};
export default Pet;
