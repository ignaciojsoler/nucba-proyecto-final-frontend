/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_API_URL; 

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(API_URL + "/auth", {
      email,
      password,
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const signUp = async (
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(
      API_URL + "/auth/signup",
      {
        name,
        email,
        password,
        role
      },
      {
        timeout: 5000,
      }
    );
    return response;
  } catch (err: any) {
    console.log(err.response)
    return err.response;
  }
};
