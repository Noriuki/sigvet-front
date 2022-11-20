import { IUser } from "./../../../Types/index";
import {
  createRequest,
  deleteRequest,
  getAllRequest,
  getRequest,
  updateRequest,
} from "../../index";

const _url = `user`;

const userRequest = {
  create: (data: IUser) => createRequest(_url, data),
  getAll: (id: number) => getAllRequest(_url, id),
  get: (id: number) => getRequest(_url, id),
  delete: (id: number) => deleteRequest(_url, id),
  update: (id: number, data: IUser) => updateRequest(_url, id, data),
};

export default userRequest;
