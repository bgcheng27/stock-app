import axios from "axios";

export const baseApi = axios.create({ baseURL: "https://www.alphavantage.co" })