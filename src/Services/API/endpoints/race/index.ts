import { getAllRequest, getRequest } from "../../index";

const _url = `race`;

const raceRequest = {
  getAll: (id: number) => getAllRequest(_url, id),
  get: (id: number) => getRequest(_url, id),
};

export default raceRequest;
