import { format, intervalToDuration } from "date-fns";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import petRequest from "../../Services/API/endpoints/pet";
import { getClinicId } from "../../Services/Auth";
import { usePet } from "../../Services/Contexts/PetContext";
import { IPet } from "../../Services/Types";

const usePetInfo = (id: string | null) => {
  const navigate = useNavigate();
  const { petDataStatus, loadPetOwnerSelectList, speciesList, raceList } =
    usePet();
  const [petOwnerSelect, setPetOwnerSelect] = useState<any[]>([]);
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [appointmentList, setAppointmentList] = useState<any[]>([]);
  const [petInfo, setPetInfo] = useState<IPet>({
    clinicId: getClinicId(),
    name: "",
    sex: "",
    castrated: false,
    age: "",
    birthDate: null,
    speciesId: "",
    raceId: "",
    size: "",
    fur: "",
    ownerId: "",
  });

  /* load data */
  useEffect(() => {
    if (petDataStatus !== "create") {
      loadPet();
    }
    loadPetOwnerList();
    loadServiceList();
    loadAppointmentList();
    return () => resetPetInfo();
  }, []);

  const loadPet = async () => {
    const res = await petRequest.get(parseInt(id as string));

    setPetInfo(res.result);
  };
  const loadPetOwnerList = async () => {
    const list = await loadPetOwnerSelectList();
    setPetOwnerSelect(list);
  };
  const loadServiceList = async () => {
    const list = await petRequest.getServiceList(parseInt(id as string));
    setServiceList(list);
  };
  const loadAppointmentList = async () => {
    const list = await petRequest.getAppointmentList(parseInt(id as string));
    setAppointmentList(list);
  };
  /* edit data */
  const handleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPetInfo((oldState: any) => ({ ...oldState, [name]: value }));
  };
  const handleDateChange = (value: string | null) => {
    const newDate = new Date(value as string);
    const dateNow = new Date().setHours(0, 0, 0, 0);
    const interval = intervalToDuration({ start: newDate, end: dateNow });
    const intervalInMonths =
      (interval?.years || 0) / 12 + (interval?.months || 0);

    if (intervalInMonths >= 1)
      setPetInfo((oldState: any) => ({
        ...oldState,
        birthDate: value as string,
        age: Number((intervalInMonths / 12).toFixed(1)),
      }));
    else Swal.fire("Data inválida!");
  };
  const resetPetInfo = () => {
    setPetInfo({
      name: "",
      sex: "",
      castrated: false,
      age: "",
      birthDate: null,
      speciesId: "",
      raceId: "",
      size: "",
      fur: "",
      ownerId: "",
      clinicId: getClinicId(),
    });
  };
  /* save data */
  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postBody = {
      ...petInfo,
      birthDate: petInfo?.birthDate
        ? format(new Date(petInfo?.birthDate as string), "yyyy-MM-dd")
        : null,
      age: parseFloat(petInfo?.age as string),
    };
    if (petDataStatus === "create") {
      const res = await petRequest.create(postBody);

      if (res.success === true) {
        Swal.fire({
          icon: "success",
          title: "Adicionado com sucesso!",
          text: "Animal cadastrado.",
        });
      }
    } else if (petDataStatus === "edit") {
      const res = await petRequest.update(parseInt(id as string), postBody);

      if (res.success === true) {
        Swal.fire({
          icon: "success",
          title: "Atualizado com sucesso!",
          text: "Animal atualizado.",
        });
      }
    }
    navigate(-1);
  };

  return {
    petDataStatus,
    loadPetOwnerSelectList,
    speciesList,
    raceList,
    petInfo,
    setPetInfo,
    handleInfoChange,
    handleDateChange,
    handleSave,
    petOwnerSelect,
    setPetOwnerSelect,
    serviceList,
    setServiceList,
    appointmentList,
    setAppointmentList,
  };
};

export default usePetInfo;
