import { atom } from "recoil";

export const activePageState = atom({
  key: "activePageState",
  default: "home",
});
