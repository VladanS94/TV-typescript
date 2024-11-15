import React, { useEffect, useState } from "react";
import Stack from "../Stack";
import SingleMovie from "../../pages/SignleMovie/SingleMovie";
import { useRecoilState } from "recoil";
import { focusMovieState, FocusStateEnum } from "../../state/atoms/FocusState";
import "./Movie.css";
import { useMovieNavigation } from "../../hooks/MovieHelper/useMovieNavigation";

interface MovieType {
  title: string;
  id: number;
  img: string;
  poster_path: string;
}

const Movie = ({ data, title, row, setRow, isActiveRow }: any) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const [movieID, setMovieID] = useState<MovieType | null>(null);

  const [focus, setFocus] = useRecoilState(focusMovieState);

  const openModal = (movie: MovieType) => {
    setSelectedMovie(movie);
    setShowModal(true);
    setMovieID(movie);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const { col, setCol, showModal, setShowModal, movieRefs } =
    useMovieNavigation(data, row, setRow, isActiveRow, openModal);

  useEffect(() => {
    if (
      focus === FocusStateEnum.MOVIES &&
      isActiveRow &&
      movieRefs.current[col]
    ) {
      movieRefs.current[col]!.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [isActiveRow, col, row, focus]);

  useEffect(() => {
    if (focus === FocusStateEnum.MOVIES && col === -1) {
      setCol(0);
    }
    if (focus === FocusStateEnum.SIDEMENU) {
      setCol(-1);
    }
  }, [focus, col]);

  return (
    <div className="movie-wrapper">
      <h1 className="movie-title">{title}</h1>
      <Stack orientation="horizontal">
        {data?.map((movie: MovieType, index: number) => (
          <div
            key={movie.id}
            ref={(el) => (movieRefs.current[index] = el)}
            style={{
              border:
                isActiveRow && col === index ? "4px solid yellow" : "none",
              display:
                index >= Math.max(0, col - 3) && index < col + 9
                  ? "flex"
                  : "none",
              alignItems: "center",
              borderRadius: "10px",
              scale: isActiveRow && col === index ? "1.01" : "none",
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
