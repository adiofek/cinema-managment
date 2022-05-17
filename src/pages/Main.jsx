import { useDispatch } from "react-redux";
import { cinemaActions } from "../store/store";
import { useEffect } from "react";
import film from "../components/layout/assets/film.jpg";
import utils from "../utils";

const MOVIES_URL = "https://api.tvmaze.com/shows";
const MEMBERS_URL = "https://jsonplaceholder.typicode.com/users";

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cinemaActions.SET_USER());
    dispatch(cinemaActions.SET_LOADING());
    const getMoviesData = async () => {
      const moviesData = await getMovies();
      dispatch(cinemaActions.GET_MOVIES(moviesData));
    };
    const getMembersData = async () => {
      const membersData = await getMembers();
      dispatch(cinemaActions.GET_MEMBERS(membersData));
    };
    getMoviesData();
    getMembersData();
  }, [dispatch]);

  const getMembers = async () => {
    const resp = await utils.get(MEMBERS_URL);
    return { members: resp.data };
  };
  const getMovies = async () => {
    const resp = await utils.get(MOVIES_URL);
    return { movies: resp.data };
  };

  return (
    <div>
      <img width={1000} className="text-center mx-auto" src={film} alt="Loading..." />
    </div>
  );
}
export default Main;
