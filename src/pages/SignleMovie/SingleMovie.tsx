import React, { useCallback, useEffect, useRef, useState } from "react";
import play from "../../assets/play.svg";
import favorite from "../../assets/favorite.svg";
import "./SingleMovie.css";

const SingleMoviePage = ({ movie, onClose, showModal, closeModal }: any) => {
  const [focused, setFocused] = useState(false);

  const playButtonRef = useRef<HTMLButtonElement>(null);
  const favoriteButtonRef = useRef<HTMLButtonElement>(null);
  const infoSectionRef = useRef<HTMLDivElement>(null);
  const discoverSectionRef = useRef<HTMLDivElement>(null);

  const handleKeyNavigation = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && showModal) {
        closeModal();
      }
      if (e.key === "ArrowRight") {
        if (document.activeElement === playButtonRef.current) {
          favoriteButtonRef.current?.focus();
        }
      } else if (e.key === "ArrowLeft") {
        if (document.activeElement === favoriteButtonRef.current) {
          playButtonRef.current?.focus();
        }
      } else if (e.key === "ArrowDown") {
        if (document.activeElement === playButtonRef.current) {
          infoSectionRef.current?.focus();
        } else if (document.activeElement === favoriteButtonRef.current) {
          infoSectionRef.current?.focus();
        } else if (document.activeElement === infoSectionRef.current) {
          discoverSectionRef.current?.focus();
        }
      } else if (e.key === "ArrowUp") {
        if (document.activeElement === discoverSectionRef.current) {
          infoSectionRef.current?.focus();
        } else if (document.activeElement === infoSectionRef.current) {
          playButtonRef.current?.focus();
        }
      }
    },
    [closeModal, showModal]
  );

  const handleInfoFocus = () => setFocused(true);
  const handleInfoBlur = () => setFocused(false);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyNavigation);

    playButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyNavigation);
    };
  }, [handleKeyNavigation]);

  return (
    <div className="single-movie modal-content">
      <div className={`modal-wraper ${focused ? "shrink" : ""}`}>
        <img
          className="single-movie-img"
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt={movie.title}
        />
        <div className="play-section">
          <p>{movie?.release_date?.slice(0, 4)}</p>
          <h1>{movie.title}</h1>
          <div className="play-btn">
            <button ref={playButtonRef}>
              <img className="play" src={play} alt="..." /> Jetzt reinhoren
            </button>
            <button ref={favoriteButtonRef} className="favorite">
              <img src={favorite} alt="..." />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div
          ref={infoSectionRef}
          className={`informations ${focused ? "focused" : ""}`}
          tabIndex={0}
          onFocus={handleInfoFocus}
          onBlur={handleInfoBlur}
        >
          <h1>Informationen:</h1>
          <p>{movie.overview}</p>
        </div>
        <div
          ref={discoverSectionRef}
          className={`mehr ${focused ? "focused" : ""}`}
          onFocus={handleInfoFocus}
          onBlur={handleInfoBlur}
          tabIndex={0}
        >
          <h1>Mehr entdecken:</h1>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleMoviePage;
