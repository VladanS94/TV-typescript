import { useState } from "react";

interface User {
  email: string;
  password: string;
}

export const useUserForm = (setCurrentModal: (modal: string) => void) => {
  const [user, setUser] = useState<User>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.email && user.password) {
      const users = JSON.parse(localStorage.getItem("User") || "[]");

      const newUser = {
        id: users.length + 1,
        email: user.email,
        password: user.password,
      };

      users.push(newUser);
      localStorage.setItem("User", JSON.stringify(users));

      alert("Sign up successful! User stored in local storage.");
      setUser({ email: "", password: "" });
    } else {
      alert("Please fill out both fields.");
    }
    setCurrentModal("login");
  };

  return { user, handleChange, handleSubmit };
};
