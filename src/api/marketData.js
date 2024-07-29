import { baseApi } from "./baseApi";


export function getTimeSeries(func, symbol, interval, extendedHours = "false", outputSize = "compact", options) {
  return baseApi.get(`/query?function=${func}&symbol=${symbol}&interval=${interval}&extendedHours=${extendedHours}&outputsize=${outputSize}&apikey=${import.meta.env.VITE_API_KEY_2}`, options).then(res => res.data)
}

export function getQuote(symbol, options) {
  return baseApi.get(`/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${import.meta.env.VITE_API_KEY_2}`, options).then(res => res.data)
}

export function getTimeSeriesDemo(options) {
  return baseApi.get("/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo", options).then(res => res.data)
}

export function getQuoteDemo(options) {
  return baseApi.get("/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo", options).then(res => res.data)
}