import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cinemaActions } from "../store/store";
import { useEffect } from "react";
import film from "../components/layout/assets/film.jpg";
import moviesimage from "../components/layout/assets/moviesimage.jpg";
import Spinner from "../components/layout/Spinner";

import utils from "../utils";

const MOVIES_URL = "https://api.tvmaze.com/shows";
const MEMBERS_URL = "https://jsonplaceholder.typicode.com/users";

function Main() {
  const dispatch = useDispatch();
  const loadingMovies = useSelector((state) => state.loadingmovies);
  const loadingMembers = useSelector((state) => state.loadingmembers);

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

  if (!loadingMovies && !loadingMembers) {
    return (
      <div>
        <div className=" flex  justify-center text-center sm:hidden">
          <img src={moviesimage} alt="Loading..." />
        </div>
        <div className="hidden sm:flex justify-center text-center ">
          <img src={film} alt="Loading..." />
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}
export default Main;
