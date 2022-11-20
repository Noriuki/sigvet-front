/* INTERFACES */
export interface IPetOwner {
  id?: string;
  clinicId: number | null;
  firstName: string;
  lastName: string;
  cpf: string;
  cellphone: string;
  telephone?: string;
  email?: string;
  created_at?: string;
  address: IAddress;
}

export interface IAddress {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface IPet {
  id?: number;
  clinicId: number | null;
  name: string;
  owner?: IPetOwner;
  sex: "M" | "F" | "";
  speciesId: number | "";
  raceId: number | "";
  race?: any;
  species?: any;
  ownerId: number | "";
  age: number | string | "";
  size: string;
  castrated: boolean;
  birthDate: string;
  fur: string;
}

export interface IAppointment {
  id?: number | null;
  clinicId?: number | null;
  animalId: number | null;
  userId: number | null;
  user?: IUser;
  animal?: IPet;
  date: string | null;
  status: EnumStatus | string;
  topic: string;
  notes: string;
  price: number | string;
  payment_status: EnumPaymentStatus | string;
  serviceTypes: IServiceType[];
}
export interface IAppointmentService {
  clinicId?: number | null;
  appointmentId?: number | null;
  serviceTypeId: number;
  date: string | null;
  status: EnumStatus | string;
  notes?: string;
  price: number;
}

export interface IServiceType {
  id?: number;
  clinicId?: number | null;
  name: string;
  category: "Exam" | "Cirurgy" | "Product" | "Petshop";
  notes?: string;
  defaultPrice: number;
}

export interface IVeterinaryClinic {
  name: string;
  cnpj: string;
  address: string;
  telephone: string;
  email: string;
}

export interface IUser {
  id?: number;
  clinicId: number | null;
  firstName: string;
  lastName: string;
  crmv?: string;
  role: ROLE;
  email: string;
  password?: string;
  active?: number;
  created_at?: string;
}

export interface IUserSession {
  id: number;
  fullName: string;
  role: ROLE;
  token: string;
  clinicId: number;

  firstName: string;
  lastName: string;
  crmv?: string;

  email: string;
  password?: string;
  active?: number;
  created_at?: string;
}
export interface ISelectService {
  clinicId: number;
  appointmentId: number;
  date: string;
  serviceTypeId: number;
  status: string;
  notes: string;
  price: number;
  template: {
    clinicId: number;
    name: string;
    category: "Cirurgy" | "Exam" | "Product" | "Petshop";
    notes: string;
    defaultPrice: number;
  };
  appointment: {
    appointmentId: number;
    animalId: number;
    animalName: number;
    userId: number;
    veterinaryName: number;
    veterinaryCRMV: number;
  };
}

export interface IDashboardData {
  appointmentsOfMonth: number;
  animalsOfMonth: number;
  servicesOfMonth: number;
  appointmentsOfYear: {
    month: number;
    appointment_count: number;
  }[];
}

export interface IFinanceData {
  totalRevenueOfMonth: number;
  averageAppointmentPriceOfMonth: number;
  averageServicePriceOfMonth: number;
  averageRevenueOfYear: {
    month: number;
    total: number;
  }[];
}

/* ENUMS */
export enum ROLE {
  receptionist = "Recepção",
  doctor = "Veterinário",
  admin = "Administrador",
}

export enum EnumStatus {
  "Aberto",
  "Em andamento",
  "Finalizado",
  "Cancelado",
}

export enum EnumPaymentStatus {
  "Aberto",
  "Pago",
  "Cancelado",
}

export enum EnumServiceType {
  "open" = "Aberto",
  "paid" = "Pago",
  "canceled" = "Cancelado",
}

export enum EnumCategory {
  "Exam" = "Exame",
  "Cirurgy" = "Cirurgia",
  "Product" = "Produto",
  "Petshop" = "Pet Shop",
}

/* TYPES */
export type TDataStatus = "create" | "edit" | "view";
