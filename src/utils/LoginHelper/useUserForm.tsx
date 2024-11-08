import { useState } from "react";
import usePost from "../../hooks/usePost";

interface User {
  email: string;
  password: string;
}

export const useUserForm = (setCurrentModal: (modal: string) => void) => {
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { logIn } = usePost();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await logIn("/", user);

    setUser({ email: "", password: "" });
    setCurrentModal("home");
  };

  return { user, error, loading, handleInputChange, handleSubmit };
};
