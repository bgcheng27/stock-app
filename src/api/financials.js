import { baseApi } from "./baseApi";


export function getFinancials(func, symbol, options) {
  return baseApi.get(`/query?function=${func}&symbol=${symbol}&apikey=${import.meta.env.VITE_API_KEY_2}`, options).then(res => res.data);
}

export function financialsDemo(func, options) {
  return baseApi.get(`/query?function=${func}&symbol=IBM&apikey=demo`, options).then(res => res.data);
}