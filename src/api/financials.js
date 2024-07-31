import { baseApi } from "./baseApi";


export function financialsDemo(func, options) {
  return baseApi.get(`/query?function=${func}&symbol=IBM&apikey=demo`, options).then(res => res.data);
}