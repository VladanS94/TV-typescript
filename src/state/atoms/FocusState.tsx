import { atom } from "recoil";

export enum FocusStateEnum {
  SIDEMENU = "sidemenu",
  MOVIES = "movies",
}

export const focusMovieState = atom<FocusStateEnum>({
  key: "focusState",
  default: FocusStateEnum.SIDEMENU,
});
