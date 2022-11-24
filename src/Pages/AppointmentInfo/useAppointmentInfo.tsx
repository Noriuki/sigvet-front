import { isBefore } from "date-fns";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import appointmentRequest from "../../Services/API/endpoints/appointment";
import { getClinicId } from "../../Services/Auth";
import { useAppointment } from "../../Services/Contexts/AppointmentContext";
import { usePet } from "../../Services/Contexts/PetContext";
import { useVeterinary } from "../../Services/Contexts/VeterinaryClinicContext";
import {
  EnumPaymentStatus,
  EnumStatus,
  IAppointment,
} from "../../Services/Types";

const useAppointmentInfo = (id: string | null) => {
  const navigate = useNavigate();
  const { appointmentDataStatus } = useAppointment();
  const { veterinaryList } = useVeterinary();
  const { petSelectList } = usePet();
  const [appointmentInfo, setAppointmentInfo] = useState<IAppointment>({
    clinicId: getClinicId(),
    animalId: null,
    userId: null,
    date: "",
    status: EnumStatus.Aberto,
    topic: "",
    notes: "",
    base_price: 0,
    price: 0,
    payment_status: EnumPaymentStatus.Aberto,
    serviceTypes: [],
  });
  const [serviceList, setServiceList] = useState<any[]>([]);
  /* load data */
  useEffect(() => {
    if (appointmentDataStatus !== "create") {
      loadAppointment();
      loadServiceList();
    }
    return () => resetAppointmentInfo();
  }, []);

  const loadAppointment = async () => {
    const clinicId = getClinicId();
    if (clinicId) {
      const { result } = await appointmentRequest.get(
        parseInt(id as string),
        clinicId
      );
      setAppointmentInfo(result);
    }
  };

  const loadServiceList = async () => {
    const result = await appointmentRequest.getServiceList(
      parseInt(id as string)
    );
    setServiceList(result);
  };

  /* edit data */
  const handleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setAppointmentInfo((oldState) => ({ ...oldState, [name]: value }));
  };
  const handleText = (text: string) => {
    setAppointmentInfo((oldState) => ({ ...oldState, notes: text }));
  };
  const handleDateChange = (value: string | null) => {
    const DateNow = new Date().setHours(0, 0, 0, 0);
    const SelectDate = new Date(value as string);

    if (!isBefore(SelectDate, DateNow)) {
      setAppointmentInfo((oldState) => ({
        ...oldState,
        date: value as string,
      }));
    } else {
      Swal.fire({ title: "Data inválida!", icon: "warning" });
    }
  };

  const resetAppointmentInfo = () => {
    setAppointmentInfo({
      clinicId: getClinicId(),
      animalId: null,
      userId: null,
      date: "",
      status: EnumStatus.Aberto,
      topic: "",
      notes: "",
      price: 0,
      base_price: 0,
      payment_status: EnumPaymentStatus.Aberto,
      serviceTypes: [],
    });
  };
  /* save data */
  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (appointmentDataStatus === "create") {
      appointmentInfo.base_price = parseFloat(
        appointmentInfo.base_price as string
      );
      appointmentInfo.price = appointmentInfo.base_price;
      const res = await appointmentRequest.create(appointmentInfo);

      if (res.success === true) {
        Swal.fire({
          icon: "success",
          title: "Adicionado com sucesso!",
          text: "Consulta cadastrada.",
        });
      }
    } else if (appointmentDataStatus === "edit") {
      appointmentInfo.base_price = parseFloat(
        appointmentInfo.base_price as string
      );
      appointmentInfo.price = parseFloat(appointmentInfo.price as string);
      const res = await appointmentRequest.update(
        parseInt(id as string),
        appointmentInfo
      );

      if (res.success === true) {
        Swal.fire({
          icon: "success",
          title: "Atualizado com sucesso!",
          text: "Consulta atualizada.",
        });
      }
    }
    navigate(-1);
  };
  return {
    appointmentDataStatus,
    veterinaryList,
    petSelectList,
    appointmentInfo,
    setAppointmentInfo,
    handleText,
    handleInfoChange,
    handleDateChange,
    handleSave,
    setServiceList,
    serviceList,
    loadAppointment,
  };
};

export default useAppointmentInfo;
