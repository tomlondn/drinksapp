import axios from "redaxios";

export const fetchApi = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
  params: {},
});
