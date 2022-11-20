import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import serviceTypeRequest from "../../Services/API/endpoints/serviceType";
import { getClinicId } from "../../Services/Auth";
import { useAppointment } from "../../Services/Contexts/AppointmentContext";
import { IServiceType } from "../../Services/Types";

const useServiceType = (id: string | null) => {
  const navigate = useNavigate();
  const { serviceTypeCategory } = useAppointment();
  const { serviceTypeDataStatus, loadTemplateList } = useAppointment();
  const [serviceTypeInfo, setServiceTypeInfo] = useState<IServiceType>({
    clinicId: getClinicId() as number,
    name: "",
    category: serviceTypeCategory,
    notes: "",
    defaultPrice: 0,
  });
  /* load data */
  useEffect(() => {
    if (serviceTypeDataStatus !== "create") {
      loadServiceType();
    }
    return () => resetServiceTypeInfo();
  }, []);
  const loadServiceType = async () => {
    const res = await serviceTypeRequest.get(parseInt(id as string));
    setServiceTypeInfo(res.result);
  };
  /* edit data */
  const handleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "defaultPrice") {
      setServiceTypeInfo((oldState: any) => ({
        ...oldState,
        [name]: parseFloat(value),
      }));
    } else {
      setServiceTypeInfo((oldState: any) => ({
        ...oldState,
        [name]: value,
      }));
    }
  };
  const handleText = (text: string) => {
    setServiceTypeInfo((oldState: any) => ({ ...oldState, notes: text }));
  };
  const resetServiceTypeInfo = () => {
    setServiceTypeInfo({
      clinicId: getClinicId(),
      name: "",
      category: serviceTypeCategory,
      notes: "",
      defaultPrice: 0,
    });
  };
  /* save data */
  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (serviceTypeDataStatus === "create") {
      const res = await serviceTypeRequest.create(serviceTypeInfo);

      if (res.success === true) {
        Swal.fire({
          icon: "success",
          title: "Adicionado com sucesso!",
          text: "Serviço cadastrado!",
        });
      }
    } else if (serviceTypeDataStatus === "edit") {
      const res = await serviceTypeRequest.update(
        parseInt(id as string),
        serviceTypeInfo
      );

      if (res.success === true) {
        Swal.fire({
          icon: "success",
          title: "Atualizado com sucesso!",
          text: "Serviço atualizada.",
        });
      }
    }
    loadTemplateList();
    navigate(-1);
  };

  return {
    serviceTypeCategory,
    serviceTypeDataStatus,
    loadTemplateList,
    serviceTypeInfo,
    setServiceTypeInfo,
    handleInfoChange,
    handleText,
    handleSave,
  };
};

export default useServiceType;
