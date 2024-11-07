import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Movie from "../../components/Movie/Movie";
import { useRecoilState } from "recoil";
import { focusState } from "../../state/atoms/FocusState";
import SideMenu from "../../components/SideMenu/SideMenu";
import "./Home.css";

const apiKey = process.env.REACT_APP_API_KEY;

const Home = ({ setCurrentModal }: any) => {
  const [activeMenuItem] = useState(0);
  const [row, setRow] = useState(0);
  const [focus, setFocus] = useRecoilState(focusState);

  // const { toggleMenu, focus, setFocus } = useUserContext();

  const { data: topRatedMovies } = useFetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
  );
  const { data: horrorMovies } = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=1?&with_genres=14`
  );
  const { data: popularMovies } = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
  );

  useEffect(() => {
    if (focus === "movies") {
      setRow(0);
    }
  }, [focus]);

  return (
    <div className="home-page">
      <SideMenu
        activeMenuItem={activeMenuItem}
        setCurrentModal={setCurrentModal}
      />

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
