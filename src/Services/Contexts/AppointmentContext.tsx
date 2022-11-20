import React, { createContext, useContext, useEffect, useState } from "react";
import apiService from "../API";
import appointmentRequest from "../API/endpoints/appointment";
import serviceTypeRequest from "../API/endpoints/serviceType";
import petRequest from "../API/endpoints/pet";
import { getClinicId } from "../Auth";
import {
  IAppointment,
  ISelectService,
  IServiceType,
  TDataStatus,
} from "../Types";

interface IContext {
  appointmentDataStatus: TDataStatus;
  setAppointmentDataStatus: React.Dispatch<React.SetStateAction<TDataStatus>>;
  appointmentServiceDataStatus: TDataStatus;
  setAppointmentServiceDataStatus: React.Dispatch<
    React.SetStateAction<TDataStatus>
  >;
  serviceTypeDataStatus: TDataStatus;
  setServiceTypeDataStatus: React.Dispatch<React.SetStateAction<TDataStatus>>;
  serviceTypeCategory: "Cirurgy" | "Exam" | "Product" | "Petshop";
  setServiceTypeCategory: React.Dispatch<
    React.SetStateAction<"Cirurgy" | "Exam" | "Product" | "Petshop">
  >;
  appointmentServiceCategory: "Cirurgy" | "Exam" | "Product" | "Petshop";
  setAppointmentServiceCategory: React.Dispatch<
    React.SetStateAction<"Cirurgy" | "Exam" | "Product" | "Petshop">
  >;
  appointmentList: IAppointment[];
  setAppointmentList: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  loadAppointmentSelectList: () => Promise<any>;
  templateList: IServiceType[];
  setTemplateList: React.Dispatch<React.SetStateAction<IServiceType[]>>;
  loadTemplateList: () => Promise<void>;
  appointment: IAppointment;
  setAppointment: React.Dispatch<React.SetStateAction<IAppointment>>;
}

export const AppointmentContext = createContext<IContext>({} as IContext);

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error(
      "useAppointment deve ser usado dentro de AppointmentProvider"
    );
  }

  return context;
}

export function AppointmentProvider(props: any) {
  const { children } = props;
  /* APPOINTMENT */
  const [appointmentDataStatus, setAppointmentDataStatus] =
    useState<TDataStatus>("create");
  const [appointmentList, setAppointmentList] = useState<IAppointment[]>([]);
  /* APPOINTMENT SERVICE */
  const [appointmentServiceDataStatus, setAppointmentServiceDataStatus] =
    useState<TDataStatus>("create");
  const [appointmentServiceCategory, setAppointmentServiceCategory] = useState<
    "Cirurgy" | "Exam" | "Product" | "Petshop"
  >("Exam");
  const [serviceTypeDataStatus, setServiceTypeDataStatus] =
    useState<TDataStatus>("create");
  /* SERVICE TYPE */
  const [serviceTypeCategory, setServiceTypeCategory] = useState<
    "Cirurgy" | "Exam" | "Product" | "Petshop"
  >("Exam");
  const [appointment, setAppointment] = useState<IAppointment>(
    {} as IAppointment
  );
  const [templateList, setTemplateList] = useState<IServiceType[]>([]);
  /* FUNCTIONS */
  const loadAppointmentSelectList = async () => {
    const clinicId = getClinicId();

    if (clinicId) {
      let appointmentList = await appointmentRequest.getAll(clinicId);
      setAppointmentList(appointmentList.result);
    }
  };
  const loadTemplateList = async () => {
    const clinicId = getClinicId();
    if (clinicId) {
      const res = await serviceTypeRequest.getAll(clinicId);
      setTemplateList(res.result);
    }
  };

  useEffect(() => {
    loadTemplateList();
  }, []);

  return (
    <AppointmentContext.Provider
      value={{
        appointmentDataStatus,
        setAppointmentDataStatus,
        appointmentServiceDataStatus,
        setAppointmentServiceDataStatus,
        serviceTypeDataStatus,
        setServiceTypeDataStatus,
        serviceTypeCategory,
        setServiceTypeCategory,
        appointmentServiceCategory,
        setAppointmentServiceCategory,
        loadAppointmentSelectList,
        appointmentList,
        setAppointmentList,
        templateList,
        setTemplateList,
        loadTemplateList,
        appointment,
        setAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
