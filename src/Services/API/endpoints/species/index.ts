import { getAllRequest, getRequest } from "../../index";

const _url = `species`;

const speciesRequest = {
  getAll: (id: number) => getAllRequest(_url, id),
  get: (id: number) => getRequest(_url, id),
};

export default speciesRequest;
