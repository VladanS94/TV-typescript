import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../axios/config";
import { useSetRecoilState } from "recoil";
import { activeToken } from "../../state/atoms/tokenState";

interface User {
  email: string;
  password: string;
}

export const useUserForm = (setActivePage: (modal: string) => void) => {
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setToken = useSetRecoilState(activeToken);

  const loginMutation = useMutation(
    async (user: User) => {
      const response = await axiosInstance.post<{ token: string }>("/", user);
      return response.data;
    },
    {
      onSuccess: ({ token }) => {
        setToken(token);
        localStorage.setItem("token", token);
        setActivePage("home");
        setLoading(false);
      },
      onError: (error) => {
        setError("Failed to log in. Please check your credentials.");
        setLoading(false);
      },
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    loginMutation.mutate(user);
  };

  return { user, error, loading, handleInputChange, handleSubmit };
};
