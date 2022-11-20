import { formatISO, isBefore } from "date-fns";
import { FormEvent, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import appointmentServiceRequest from "../../Services/API/endpoints/appointmentService";
import { getClinicId, getCurrentUser } from "../../Services/Auth";
import { useAppointment } from "../../Services/Contexts/AppointmentContext";
import { EnumStatus, IServiceType } from "../../Services/Types";

const useAppointmentServiceInfo = (id: string | null) => {
  const navigate = useNavigate();
  const {
    appointmentServiceDataStatus,
    appointment,
    templateList,
    appointmentServiceCategory,
  } = useAppointment();
  const [template, setTemplate] = useState<any>(null);
  const [appointmentServiceInfo, setAppointmentServiceInfo] = useState<any>({
    clinicId: getClinicId(),
    date: "",
    serviceTypeId: 0,
    status: EnumStatus.Aberto,
    notes: "",
    price: 0,
  });

  /* load data */
  useLayoutEffect(() => {
    if (appointmentServiceDataStatus !== "create") {
      loadAppointmentService();
    } else {
      loadAppointment();
    }
    return () => resetServiceTypeInfo();
  }, []);

  const loadAppointmentService = async () => {
    const appointmentService = await appointmentServiceRequest.get(
      parseInt(id as string)
    );

    setAppointmentServiceInfo(appointmentService.result);
  };

  const loadAppointment = async () => {
    setAppointmentServiceInfo((oldState: any) => ({
      ...oldState,
      appointmentId: appointment?.id,
      appointment,
    }));
  };
  const handleMailService = async () => {
    const user = getCurrentUser();

    const res = await appointmentServiceRequest.mail({
      id: appointmentServiceInfo?.id,
      email: user?.email,
    });

    if (res.success === true) {
      Swal.fire({
        icon: "success",
        title: "Relatório enviado!",
        text: "Verifique sua caixa de entrada",
      });
    }
  };
  /* edit data */
  const handleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setAppointmentServiceInfo((oldState: any) => ({
      ...oldState,
      [name]: value,
    }));
  };
  const handleText = (text: string) => {
    setAppointmentServiceInfo((oldState: any) => ({
      ...oldState,
      notes: text,
    }));
  };
  const handleDateChange = (value: string | null) => {
    const DateNow = new Date().setHours(0, 0, 0, 0);
    const SelectDate = new Date(value as string);

    if (!isBefore(SelectDate, DateNow)) {
      setAppointmentServiceInfo((oldState: any) => ({
        ...oldState,
        date: value as string,
      }));
    } else {
      Swal.fire({ title: "Data inválida!", icon: "warning" });
    }
  };
  const handleTemplate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const select = templateList.find((el: IServiceType) => {
      return el.id === parseInt(e.target.value);
    });
    setTemplate(select);
    handleSelectTemplate(select as IServiceType);
  };

  const handleSelectTemplate = (template: IServiceType) => {
    const notes = template.notes;
    const price = template.defaultPrice;
    const serviceTypeId = template.id as number;

    setAppointmentServiceInfo((oldState: any) => ({
      ...oldState,
      notes,
      price,
      serviceTypeId,
    }));
  };

  const handleTemplateProduct = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const select = templateList.find((el: IServiceType) => {
      return el.id === parseInt(e.target.value);
    });

    setTemplate(select);
    handleSelectTemplateProduct(select as IServiceType);
  };

  const handleSelectTemplateProduct = (template: IServiceType) => {
    const name = template.name;
    const price = template.defaultPrice;
    const serviceTypeId = template.id as number;
    setAppointmentServiceInfo((oldState: any) => ({
      ...oldState,
      name,
      price,
      serviceTypeId,
    }));
  };

  const resetServiceTypeInfo = () => {
    setAppointmentServiceInfo({
      clinicId: getClinicId(),
      date: "",
      serviceTypeId: 1,
      status: EnumStatus.Aberto,
      notes: "",
      price: 0,
    });
  };
  /* save data */
  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    appointmentServiceInfo.price = parseFloat(appointmentServiceInfo.price);
    if (
      appointmentServiceCategory === "Product" ||
      appointmentServiceCategory === "Petshop"
    ) {
      appointmentServiceInfo.date = formatISO(new Date());
    }
    if (appointmentServiceDataStatus === "create") {
      const res = await appointmentServiceRequest.create(
        appointmentServiceInfo
      );

      if (res.success === true) {
        Swal.fire({
          icon: "success",
          title: "Adicionado com sucesso!",
          text: "Serviço cadastrado.",
        });
      }
    } else if (appointmentServiceDataStatus === "edit") {
      const res = await appointmentServiceRequest.update(
        parseInt(id as string),
        appointmentServiceInfo
      );

      if (res.success === true) {
        Swal.fire({
          icon: "success",
          title: "Atualizado com sucesso!",
          text: "Serviço atualizado.",
        });
      }
    }
    navigate(-1);
  };

  return {
    appointmentServiceDataStatus,
    appointmentServiceInfo,
    setAppointmentServiceInfo,
    handleInfoChange,
    handleText,
    handleDateChange,
    handleSave,
    templateList,
    handleTemplate,
    template,
    appointmentServiceCategory,
    handleTemplateProduct,
    handleSelectTemplateProduct,
    handleMailService,
  };
};

export default useAppointmentServiceInfo;
