import { MenuItem, TextField } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ContentContainer from "../../../Components/ContentContainer";
import appointmentRequest from "../../../Services/API/endpoints/appointment";
import { EnumPaymentStatus } from "../../../Services/Types";
import { formatCurrency } from "../../../Services/Utils";
import useAppointmentInfo from "../useAppointmentInfo";
import ServiceCard from "./ServiceCard";

interface IProps {
  children?: React.ReactNode;
  serviceList?: any[];
}

const AppointmentFinanceTab: React.FC<IProps> = ({ serviceList }) => {
  const { id } = useParams();
  const { appointmentDataStatus, appointmentInfo, loadAppointment } =
    useAppointmentInfo(id || null);

  const handlePaymentStatusChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const res = await appointmentRequest.update(parseInt(id as string), {
      ...appointmentInfo,
      [name]: value,
    });
    if (res.success === true) {
      Swal.fire({
        icon: "success",
        title: "Atualizado com sucesso!",
        text: "Consulta atualizada.",
      });
      loadAppointment();
    }
  };

  return (
    <ContentContainer padding="1rem" alignItems="flex-start">
      <ContentContainer
        flexDirection="column"
        padding="1rem"
        width="30%"
        height="50%"
        justifyContent="space-around"
        shadow
      >
        <TextField
          label="Pagamento"
          name="payment_status"
          disabled={appointmentDataStatus === "view"}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          value={appointmentInfo.payment_status}
          onChange={handlePaymentStatusChange}
          style={{ width: "100%" }}
          select
        >
          <MenuItem value="0">{EnumPaymentStatus[0]}</MenuItem>
          <MenuItem value="1">{EnumPaymentStatus[1]}</MenuItem>
          <MenuItem value="2">{EnumPaymentStatus[2]}</MenuItem>
        </TextField>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <h5 style={{ fontSize: "1.2rem", margin: "5px 0" }}>Valor total</h5>
          <h5 style={{ fontSize: "1.2rem", margin: "5px 0" }}>
            {formatCurrency(parseFloat(appointmentInfo.price as string))}
          </h5>
        </div>
      </ContentContainer>

      <ContentContainer width="68%" padding="1rem" shadow alignContent="start">
        {!!serviceList?.length &&
          serviceList.map((service) => (
            <ServiceCard
              key={service.id}
              serviceName={service?.serviceType.name}
              serviceStatus={service?.status}
              serviceVeterinary={`${service?.appointment?.user.firstName} ${service?.appointment?.user.lastName}`}
              servicePatient={service?.appointment?.animal.name}
              serviceDate={service?.date}
              serviceValue={service?.price}
            />
          ))}
      </ContentContainer>
    </ContentContainer>
  );
};
export default AppointmentFinanceTab;
