import { IAddress, IPetOwner } from "../../../Types";
import {
  createRequest,
  deleteRequest,
  getAllRequest,
  getRequest,
  updateRequest,
} from "../../index";

const _url = `owner`;

interface IPetOwnerRequest extends Omit<IPetOwner, "address"> {
  address: IAddress | string;
}

const petOwnerRequest = {
  create: (data: IPetOwnerRequest) => createRequest(_url, data),
  getAll: (id: number) => getAllRequest(_url, id),
  get: (id: number) => getRequest(_url, id),
  getPetList: (id: number) => getRequest(`animal/getAllByOwnerId`, id),
  getAppointmentList: (id: number) =>
    getRequest(`appointment/getAllByUserId`, id),
  delete: (id: number) => deleteRequest(_url, id),
  update: (id: number, data: IPetOwnerRequest) => updateRequest(_url, id, data),
};

export default petOwnerRequest;
