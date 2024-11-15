import { useEffect, useState, useRef } from "react";
import { focusMovieState, FocusStateEnum } from "../../state/atoms/FocusState";
import { useRecoilState } from "recoil";
import {
  activeMenuState,
  selectedItemState,
} from "../../state/atoms/ActiveItemState";

interface MovieType {
  title: string;
  id: number;
  img: string;
  poster_path: string;
}

export const useMovieNavigation = (
  data: MovieType[],
  row: number,
  setRow: (row: number) => void,
  isActiveRow: boolean,
  openModal: (movie: MovieType) => void
) => {
  const [col, setCol] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const movieRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [focus, setFocus] = useRecoilState(focusMovieState);
  const [activeMenuItem, setActiveMenuItem] = useRecoilState(activeMenuState);
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showModal) return;

      if (e.key === "ArrowDown") {
        row !== 2 && setRow(row + 1);
      } else if (e.key === "ArrowUp") {
        row !== 0 && setRow(row - 1);
      } else if (e.key === "ArrowRight") {
        if (col < data.length - 1) {
          setCol((prev) => (prev < data.length - 1 ? prev + 1 : prev));
          if (col >= 2 && col < data.length - 3) {
            setCol(col + 1);
          }
        }
      } else if (e.key === "ArrowLeft") {
        if (col > 0) {
          setCol((prev) => (prev > 0 ? prev - 1 : prev));
          if (col <= data.length - 3 && col > 2) {
            setCol(col - 1);
          }
        }
        if (col === 0) {
          setFocus(FocusStateEnum.SIDEMENU);
          setActiveMenuItem(!activeMenuItem);
        }
      } else if (e.key === "Enter") {
        openModal(data[col]);
      } else if (e.key === "Escape" && showModal) {
        closeModal();
      }
    };

    if (isActiveRow && focus === FocusStateEnum.MOVIES) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    col,
    row,
    isActiveRow,
    focus,
    setRow,
    setFocus,
    data,
    showModal,
    setSelectedItem,
  ]);

  return { col, setCol, showModal, setShowModal, movieRefs };
};
