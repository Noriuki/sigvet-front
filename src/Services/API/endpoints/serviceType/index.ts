import { IServiceType } from "../../../Types";
import {
  createRequest,
  deleteRequest,
  getAllRequest,
  getRequest,
  updateRequest,
} from "../../index";

const _url = `servicetype`;

const serviceTypeRequest = {
  create: (data: IServiceType) => createRequest(_url, data),
  getAll: (id: number) => getAllRequest(_url, id),
  get: (id: number) => getRequest(_url, id),
  delete: (id: number) => deleteRequest(_url, id),
  update: (id: number, data: IServiceType) => updateRequest(_url, id, data),
};

export default serviceTypeRequest;
