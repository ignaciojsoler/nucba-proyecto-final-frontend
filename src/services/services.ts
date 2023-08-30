/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { Service } from "../interfaces/interfaces";

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

export const getUsers = async (
  role: string = "worker",
  queryParams?: {
    occupation?: string | null;
  }
): Promise<AxiosResponse> => {
  try {
    let url = API_URL + "/user";

    if (role) {
      url += `?role=${role}`;
    }

    if (queryParams && queryParams.occupation !== null) {
      url += `&occupation=${queryParams.occupation}`;
    }

    const response: AxiosResponse = await axios.get(url);
    return response;
  } catch (err: any) {
    console.log(err.response);
    return err.response;
  }
};

export const getUserById = async (userId: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.get(
      API_URL + `/user/${userId}`
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

export const createNewService = async (
  token: string,
  title: string,
  description: string,
  category: string,
  hourlyRate: number | string
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(
      API_URL + `/services`,
      {
        title,
        description,
        category,
        hourlyRate,
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

export const updateService = async (
  token: string,
  service: Service
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.put(
      API_URL + `/services/${service.id}`,
      {
        service,
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

export const removeServiceFromFavorites = async (
  favoriteId: string,
  token: string
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.delete(
      API_URL + `/favorites/${favoriteId}`,
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
