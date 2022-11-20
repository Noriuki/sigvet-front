import { IAppointment } from "../../../Types";
import {
  createRequest,
  deleteRequest,
  getAllRequest,
  getRequest,
  updateRequest,
} from "../../index";

const _url = `appointment`;

const appointmentRequest = {
  create: (data: IAppointment) => createRequest(_url, data),
  getAll: (id: number) => getAllRequest(_url, id),
  get: (id: number) => getRequest(`${_url}/detail`, id),
  getServiceList: (id: number) =>
    getRequest(`service/getAllByAppointmentId`, id),
  delete: (id: number) => deleteRequest(_url, id),
  update: (id: number, data: IAppointment) => updateRequest(_url, id, data),
};

export default appointmentRequest;
