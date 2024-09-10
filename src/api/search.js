import { baseApi } from "./baseApi";

export function searchDemo(keywords, options) {
  return baseApi.get(`/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=demo`, options).then(res => res.data)
}

export function search(keywords, options) {
  return baseApi.get(`/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${import.meta.env.VITE_API_KEY_2}`, options).then(res => res.data)
}