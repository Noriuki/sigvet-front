import { IPet } from "../../../Types";
import apiService, {
  authHeader,
  createRequest,
  deleteRequest,
  getAllRequest,
  getRequest,
  updateRequest,
} from "../../index";

const _url = `animal`;

const petRequest = {
  create: (data: IPet) => createRequest(_url, data),
  getAll: async (clincId: number): Promise<any> => {
    const reqRes = await apiService.get(`${_url}/getall/${clincId}`, {
      headers: authHeader(),
    });
    return reqRes?.data;
  },
  get: (id: number) => getRequest(`${_url}/detail`, id),
  getServiceList: (id: number) => getRequest(`service/getAllByAnimalId`, id),
  getAppointmentList: (id: number) =>
    getRequest(`appointment/getAllByAnimalId`, id),
  delete: (id: number) => deleteRequest(_url, id),
  update: (id: number, data: IPet) => updateRequest(_url, id, data),
};

export default petRequest;
