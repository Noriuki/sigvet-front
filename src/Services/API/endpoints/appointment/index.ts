import { IAppointment } from "../../../Types";
import apiService, {
  authHeader,
  createRequest,
  deleteRequest,
  getAllRequest,
  getRequest,
  updateRequest,
} from "../../index";

const _url = `appointment`;

const appointmentRequest = {
  create: (data: IAppointment) => createRequest(_url, data),
  getAll: async (clincId: number): Promise<any> => {
    const reqRes = await apiService.get(`${_url}/all/detail/${clincId}`, {
      headers: authHeader(),
    });
    return reqRes?.data;
  },
  get: async (id: number, clincId: number): Promise<any> => {
    const reqRes = await apiService.get(`${_url}/detail/${id}/${clincId}`, {
      headers: authHeader(),
    });
    return reqRes?.data;
  },
  getServiceList: (id: number) =>
    getRequest(`service/getAllByAppointmentId`, id),
  delete: (id: number) => deleteRequest(_url, id),
  update: (id: number, data: IAppointment) => updateRequest(_url, id, data),
};

export default appointmentRequest;
