import { format } from "date-fns";
import React from "react";
import ContentContainer from "../../../../Components/ContentContainer";
import { formatCurrency } from "../../../../Services/Utils";
import { EnumStatus } from "../../../../Services/Types";
interface IProps {
  children?: React.ReactNode;
  serviceName: string;
  servicePatient: string;
  serviceStatus: string;
  serviceDate: string;
  serviceVeterinary: string;
  serviceValue: number;
}

const ServiceCard: React.FC<IProps> = ({
  serviceName,
  servicePatient,
  serviceStatus,
  serviceDate,
  serviceVeterinary,
  serviceValue,
}) => {
  return (
    <ContentContainer
      height="30%"
      shadow
      padding="1rem 2rem"
      margin="0.5rem 0"
      justifyContent="space-around"
      alignContent="space-around"
    >
      <h4 style={{ width: "30%", margin: 0 }}>Serviço: {serviceName}</h4>
      <h4 style={{ width: "35%", margin: 0, textAlign: "center" }}>
        Responsavel: {serviceVeterinary}
      </h4>
      <h4 style={{ width: "35%", margin: 0, textAlign: "end" }}>
        Paciente: {servicePatient}
      </h4>

      <h4 style={{ width: "30%", margin: 0 }}>
        Situação: {EnumStatus[serviceStatus as keyof typeof EnumStatus]}
      </h4>
      <h4 style={{ width: "35%", margin: 0, textAlign: "center" }}>
        Data: {format(new Date(serviceDate as string), "dd/MM/yyyy HH:mm")}
      </h4>
      <h4 style={{ width: "35%", margin: 0, textAlign: "end" }}>
        Valor: {formatCurrency(serviceValue)}
      </h4>
    </ContentContainer>
  );
};
export default ServiceCard;
