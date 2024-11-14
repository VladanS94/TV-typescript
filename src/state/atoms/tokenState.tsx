import { atom } from "recoil";

export const activeToken = atom({
  key: "activeToken",
  default: localStorage.getItem("token") ?? false,
});
