import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios/config";
import { useLocalStorage } from "react-use";
import axios from "axios";
import { LoginPayload } from "../types/LogInTypes";

const usePost = () => {
  const [token, setToken] = useLocalStorage("token", null);

  const mutation = useMutation(
    async ({ url, payload }: { url: string; payload: LoginPayload }) => {
      const response = await axiosInstance.post(url, payload);
      setToken(response.data.token);
      return response.data;
    },
    {
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            throw new Error("Invalid email or password.");
          } else {
            throw new Error("An error occurred. Please try again.");
          }
        } else {
          throw new Error("An unexpected error occurred.");
        }
      },
    }
  );

  const logIn = (url: string, payload: LoginPayload) => {
    mutation.mutate({ url, payload });
  };

  return {
    logIn,
    data: mutation.data,
    loading: mutation.isLoading,
    error: mutation.error ? (mutation.error as Error).message : null,
  };
};

export default usePost;
