import React, { useEffect, useRef, useState } from "react";
import Stack from "../Stack";
import SingleMovie from "../../pages/SignleMovie/SingleMovie";
import { useRecoilState } from "recoil";
import { focusState } from "../../state/atoms/FocusState";
import {
  activeMenuState,
  selectedItemState,
} from "../../state/atoms/ActiveItemState";
import { toggleMenu } from "../../utils/helpers";
import { MovieType } from "../../types/MovieTypes";

const Movie = ({ data, title, row, setRow, isActiveRow }: any) => {
  const [col, setCol] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const [movieID, setMovieID] = useState<MovieType | null>(null);

  const [focus, setFocus] = useRecoilState(focusState);
  const [activeMenuItem, setActiveMenuItem] = useRecoilState(activeMenuState);
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);

  const movieRefs = useRef<(HTMLDivElement | null)[]>([]);

  const openModal = (movie: MovieType) => {
    setSelectedMovie(movie);
    setShowModal(true);
    setMovieID(movie);
  };

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
        col < data.slice(0, 11).length - 1 && setCol(col + 1);
      } else if (e.key === "ArrowLeft") {
        col !== -1 && setCol(col - 1);
        if (col === 0) {
          setFocus("sidemenu");
          toggleMenu(setActiveMenuItem);
        }
      } else if (e.key === "Enter") {
        openModal(data[col]);
      } else if (e.key === "Escape" && showModal) {
        closeModal();
      }
    };

    if (isActiveRow && focus === "movies") {
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
    toggleMenu,
    setRow,
    setFocus,
    data,
    showModal,
    setSelectedItem,
  ]);

  useEffect(() => {
    if (focus === "movies" && isActiveRow && movieRefs.current[col]) {
      movieRefs.current[col]!.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [isActiveRow, col, row, focus]);

  useEffect(() => {
    if (focus === "movies" && col === -1) {
      setCol(0);
    }
  }, [focus, col]);

  return (
    <div className="movie-wrapper">
      <h1>{title}</h1>
      <Stack orientation="horizontal">
        {data?.slice(0, 11).map((movie: MovieType, index: number) => (
          <div
            key={movie.id}
            ref={(el) => (movieRefs.current[index] = el)}
            style={{
              border:
                isActiveRow && col === index ? "4px solid yellow" : "none",
              margin: "5px 0",
              display: "flex",
              alignItems: "center",
              borderRadius: "10px",
              scale: isActiveRow && col === index ? "1.1" : "none",
              transition:
                isActiveRow && col === index ? "0.2s ease-in" : "none",
            }}
            onClick={() => openModal(movie)}
          >
            <img
              className="movie-img"
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </Stack>
      {showModal && (
        <div className="modal">
          <SingleMovie
            movieData={selectedMovie}
            onClose={closeModal}
            movie={movieID}
            showModal={showModal}
            closeModal={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default Movie;
