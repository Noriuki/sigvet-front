import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import externalRequest from "../../Services/API/endpoints/external";
import petOwnerRequest from "../../Services/API/endpoints/petOwner";
import { getClinicId } from "../../Services/Auth";
import { usePet } from "../../Services/Contexts/PetContext";
import { IPet, IPetOwner } from "../../Services/Types";

const usePetOwnerInfo = (id: string) => {
  const navigate = useNavigate();
  const { petOwnerDataStatus } = usePet();

  const [petOwnerInfo, setPetOwnerInfo] = useState<IPetOwner>({
    clinicId: getClinicId(),
    firstName: "",
    lastName: "",
    cpf: "",
    cellphone: "",
    telephone: "",
    email: "",
    address: {
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      localidade: "",
      uf: "",
    },
  });
  const [petList, setPetList] = useState<IPet[]>([]);
  const [appointmentList, setAppointmentList] = useState([]);
  /* load data */
  useEffect(() => {
    if (petOwnerDataStatus !== "create") {
      loadPetOwner();
      loadPetList();
      loadAppointmentList();
    }
    return () => resetPetOwnerInfo();
  }, []);

  const loadPetOwner = async () => {
    const res = await petOwnerRequest.get(parseInt(id as string));

    setPetOwnerInfo({
      ...res.result,
      address: JSON.parse(res.result.address),
    });
  };
  const loadPetList = async () => {
    const res = await petOwnerRequest.getPetList(parseInt(id as string));
    setPetList(res.result);
  };
  const loadAppointmentList = async () => {
    const res = await petOwnerRequest.getAppointmentList(
      parseInt(id as string)
    );
    setAppointmentList(res.result);
  };
  /* edit data */
  const handleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setPetOwnerInfo((oldState: any) => ({ ...oldState, [name]: value }));
  };

  const handleAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "cep") {
      let cep = value.replace(/\D/g, "");
      if (cep.length === 8) {
        let newAdressInfo = await externalRequest.getAddress(cep);

        setPetOwnerInfo((oldState: any) => ({
          ...oldState,
          address: { ...newAdressInfo },
        }));
      }
    } else {
      let newAdressInfo = { ...petOwnerInfo.address, [name]: value };
      setPetOwnerInfo((oldState: any) => ({
        ...oldState,
        address: { ...newAdressInfo },
      }));
    }
  };

  const resetPetOwnerInfo = () => {
    setPetOwnerInfo({
      clinicId: getClinicId(),
      firstName: "",
      lastName: "",
      cpf: "",
      cellphone: "",
      telephone: "",
      email: "",
      address: {
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        localidade: "",
        uf: "",
      },
    });
    setPetList([]);
  };
  /* save data */
  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postBody = {
      ...petOwnerInfo,
      address: JSON.stringify(petOwnerInfo.address),
    };
    if (petOwnerDataStatus === "create") {
      const res = await petOwnerRequest.create(postBody);

      if (res.success === true) {
        Swal.fire({
          icon: "success",
          title: "Adicionado com sucesso!",
          text: "Cliente cadastrado.",
        });
      }
    } else if (petOwnerDataStatus === "edit") {
      const res = await petOwnerRequest.update(
        parseInt(id as string),
        postBody
      );

      if (res.success === true) {
        Swal.fire({
          icon: "success",
          title: "Atualizado com sucesso!",
          text: "Cliente atualizado.",
        });
      }
    }
    navigate(-1);
  };

  return {
    petOwnerDataStatus,
    petOwnerInfo,
    setPetOwnerInfo,
    handleSave,
    handleInfoChange,
    handleAddressChange,
    petList,
    setPetList,
    appointmentList,
    setAppointmentList,
  };
};

export default usePetOwnerInfo;
