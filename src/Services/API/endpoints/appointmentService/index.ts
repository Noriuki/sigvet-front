import { IAppointmentService } from "../../../Types";
import {
  createRequest,
  deleteRequest,
  getAllRequest,
  getRequest,
  updateRequest,
} from "../../index";

const _url = `service`;

const appointmentServiceRequest = {
  create: (data: IAppointmentService) => createRequest(_url, data),
  mail: (data: any) => createRequest(`${_url}/mail`, data),
  getAll: (id: number) => getAllRequest(_url, id),
  get: (id: number) => getRequest(`${_url}/detail`, id),
  delete: (id: number) => deleteRequest(_url, id),
  update: (id: number, data: IAppointmentService) =>
    updateRequest(_url, id, data),
};

export default appointmentServiceRequest;
