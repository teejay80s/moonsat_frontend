import { axiosInstance } from "../../../axios-Instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { errorAlert, successAlert, toastOptions } from "../../../utils";
import { AuthContext } from "../../../context";
import { getLoginToken, setLoginToken } from "../../../storage";
import { useContext } from "react";
import { queryKeys } from "../../../react-query/constants";
import { toast } from "react-toastify";

async function userRegister(formData) {
  const data = await axiosInstance({
    url: "/auth/register",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

async function getMe() {
  const data = await axiosInstance({
    url: "/auth/me",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function userLogin(formData) {
  const data = await axiosInstance({
    url: "/auth/login",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

export function useRegister() {
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => userRegister(formData),
    onSuccess: (data) => {
      successAlert("Registration Successful");
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

export function useLogin() {
  const authCtx = useContext(AuthContext);
  const { mutate, isError, error, isSuccess, reset } = useMutation({
    mutationFn: (formData) => userLogin(formData),
    onSuccess: (data) => {
      successAlert("Login Successful");
      setLoginToken(data?.token);
      authCtx.authenticate(data?.token);
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset };
}

export function useGetMe() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.user],
    queryFn: () => getMe(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}
