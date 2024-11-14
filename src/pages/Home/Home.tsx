import React, { useEffect, useState } from "react";
import Movie from "../../components/Movie/Movie";
import { useRecoilState } from "recoil";
import { focusMovieState, FocusStateEnum } from "../../state/atoms/FocusState";
import SideMenu from "../../components/SideMenu/SideMenu";
import "./Home.css";
import { SideMenuProps } from "../../types/CurrentModalType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const Home = ({ setActivePage, activePage }: SideMenuProps) => {
  const [row, setRow] = useState(0);
  const [focus, setFocus] = useRecoilState(focusMovieState);

  const {
    data: topRatedMovies,
    isLoading: isTopRated,
    error: errorTopRated,
  } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
      );
      return res.data.results;
    },
  });
  const {
    data: horrorMovies,
    isLoading: isLoadingHorror,
    error: errorHorror,
  } = useQuery({
    queryKey: ["horrorMovies"],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=1?&with_genres=14`
      );

      return res.data.results;
    },
  });
  const {
    data: popularMovies,
    isLoading: isPopular,
    error: errorPopular,
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      return res.data.results;
    },
  });

  useEffect(() => {
    if (focus === FocusStateEnum.MOVIES) {
      setRow(0);
    }
  }, [focus]);

  if (errorTopRated)
    return (
      <p>Error loading horror movies: {(errorTopRated as Error).message}</p>
    );
  if (errorHorror)
    return <p>Error loading horror movies: {(errorHorror as Error).message}</p>;
  if (errorPopular)
    return (
      <p>Error loading popular movies: {(errorPopular as Error).message}</p>
    );

  return (
    <div className="home-page">
      <SideMenu activePage={activePage} setActivePage={setActivePage} />

      <div className="right-side">
        <Movie
          title="Top Rated"
          data={topRatedMovies}
          column={0}
          row={row}
          isActiveRow={row === 0}
          setRow={setRow}
        />
        <Movie
          title="Horror"
          data={horrorMovies}
          column={1}
          row={row}
          isActiveRow={row === 1}
          setRow={setRow}
        />
        <Movie
          title="Popular"
          data={popularMovies}
          column={2}
          row={row}
          isActiveRow={row === 2}
          setRow={setRow}
        />
      </div>
    </div>
  );
};

export default Home;
