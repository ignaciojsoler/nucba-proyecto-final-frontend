/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(API_URL + "/auth/login", {
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
  role: string
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(
      API_URL + "/auth/signup",
      {
        name,
        email,
        password,
        role,
      },
      {
        timeout: 5000,
      }
    );
    return response;
  } catch (err: any) {
    console.log(err.response);
    return err.response;
  }
};

export const verifyAccount = async (
  email: string,
  verificationCode: string
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(API_URL + `/auth/verify`, {
      email,
      verificationCode,
    });
    return response;
  } catch (err: any) {
    console.log(err.response);
    return err.response;
  }
};

export const getWorkers = async (queryParams?: {
  occupation?: string | null;
}): Promise<AxiosResponse> => {
  try {
    let url = API_URL + "/worker";

    if (queryParams && queryParams.occupation !== null) {
      url += `?occupation=${queryParams.occupation}`;
    }

    console.log("url", url);

    const response: AxiosResponse = await axios.get(url);
    return response;
  } catch (err: any) {
    console.log(err.response);
    return err.response;
  }
};

export const getWorkerById = async (
  workerId: string
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.get(
      API_URL + `/worker/${workerId}`
    );
    return response;
  } catch (err: any) {
    console.log(err.response);
    return err.response;
  }
};

export const getServices = async (queryParams?: {
  category?: string | null;
}): Promise<AxiosResponse> => {
  try {
    let url = API_URL + "/services";

    if (queryParams && queryParams.category !== null) {
      url += `?category=${queryParams.category}`;
    }

    const response: AxiosResponse = await axios.get(url);

    return response;
  } catch (err: any) {
    console.log(err.response);
    return err.response;
  }
};

export const getServiceById = async (
  serviceId: string
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.get(
      API_URL + `/services/${serviceId}`
    );
    return response;
  } catch (err: any) {
    console.log(err.response);
    return err.response;
  }
};

export const saveServiceAsFavorite = async (
  token: string,
  userId: string,
  serviceId: string
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(
      API_URL + `/favorites`,
      {
        userId,
        serviceId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (err: any) {
    console.log(err.response);
    return err.response;
  }
};

export const getUserFavoritesServices = async (
  token: string,
  userId: string
) => {
  try {
    const response: AxiosResponse = await axios.get(
      API_URL + `/favorites/${userId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (err: any) {
    console.log(err.response);
    return err.response;
  }
};
