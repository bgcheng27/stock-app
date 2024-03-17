import { baseApi } from "./baseApi"

export function search(input, options) {
  return baseApi.get(`query?function=SYMBOL_SEARCH&keywords=${input}&apikey=demo`, options).then(res => res.data)
}

export function searchDemo(options) {
    return baseApi.get(`query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo`, options).then(res => res.data)
  }