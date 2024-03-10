import axios from "axios";

export interface AxiosError extends Error {
  response: {
    data: {
      message: string;
    };
  };
}

export const api = axios.create({
  baseURL: "http://localhost:3333",
});
