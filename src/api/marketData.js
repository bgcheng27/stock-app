import { baseApi } from "./baseApi";


export function getTimeSeriesDemo(options) {
  return baseApi.get("/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo", options).then(res => res.data)
}

export function getQuoteDemo(options) {
  return baseApi.get("/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo", options).then(res => res.data)
}

export function getOverviewDemo(options) {
  return baseApi.get("/query?function=OVERVIEW&symbol=IBM&apikey=demo", options).then(res => res.data)
}