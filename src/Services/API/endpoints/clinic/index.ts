import { getRequest } from './../../index';

const _url = 'clinic';

const dashUrl = `${_url}/dash/home`
const financeUrl = `${_url}/dash/finance`

export const clinicRequest = {
  getClinicInfo: (id:number) => getRequest(_url, id),
  getDashboardData: (id: number) => getRequest(dashUrl, id),
  getFinanceData: (id: number) => getRequest(financeUrl, id),
}
