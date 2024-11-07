import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MovieData } from "../types/FetchTypes";

const fetchMovies = async (url: string) => {
  const response = await axios.get(url);
  return response.data.results;
};

const useFetch = (url: string) => {
  const { data, error, isLoading } = useQuery<MovieData[], Error>({
    queryKey: ["movies", url],
    queryFn: () => fetchMovies(url),
  });

  return {
    data: data || [],
    error,
    loading: isLoading,
  };
};

export default useFetch;
