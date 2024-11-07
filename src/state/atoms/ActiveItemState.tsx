import { atom } from "recoil";

export const activeMenuState = atom({
  key: "activeMenuState",
  default: false,
});

export const selectedItemState = atom({
  key: "selectedItemState",
  default: 0,
});
