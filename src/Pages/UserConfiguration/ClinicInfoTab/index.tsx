import React from "react";
import { useParams } from "react-router-dom";
import useUserConfiguration from "../useUserConfiguration";
import ClinicInfoCard from "./ClinicInfoCard";
interface IProps {
  children?: React.ReactNode;
}

const ClinicInfoTab: React.FC<IProps> = () => {
  const { id } = useParams();
  const { clinicInfo, clinicAddress } = useUserConfiguration(id || null);

  return (
    <ClinicInfoCard clinicInfo={clinicInfo} clinicAddress={clinicAddress} />
  );
};
export default ClinicInfoTab;
