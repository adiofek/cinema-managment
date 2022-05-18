import { useSelector, useDispatch } from "react-redux";
import { cinemaActions } from "../../store/store";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

function MovieItem({ movie, edit }) {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const user = useSelector((state) => state.user);
  const members = useSelector((state) => state.members);
  const subscriptions = useSelector((state) => state.subscriptions);

  const deleteMovie = (id) => {
    let NewMoviesData = movies.filter((movie) => movie.id !== id);
    dispatch(cinemaActions.DELETE_MOVIE({ movies: NewMoviesData }));
    RemoveMovieFromSubscriptions(id);
  };

  const RemoveMovieFromSubscriptions = (id) => {
    let UpdatedSubs = subscriptions.map((subscription) => {
      let UpdateMovies = subscription.movies.filter((element) => element.movieid !== id);
      return {
        memberid: subscription.memberid,
        movies: UpdateMovies,
      };
    });
    dispatch(cinemaActions.EDIT_SUBSCRIPTIONS({ subscriptions: UpdatedSubs }));
  };

  let MembersWatched = subscriptions.map((subscription) => {
    let MovieWatched = subscription.movies.filter((element) => element.movieid === movie.id);

    if (MovieWatched.length === 1) {
      let member = members.filter((member) => member.id === subscription.memberid);

      return (
        <li key={subscription.memberid}>
          <Link to="/members" className= " text-base font-bold text-blue-600 underline ">{member[0].name} </Link>,{MovieWatched[0].date}
        </li>
      );
    } else return "";
  });

  return (
    <div className=" bg-gray-100 py-4 flex flex-col justify-center sm:py-4">
      <div className="flex justify-between items-start">
        <h2 className="text-3xl font-bold">{movie.name}</h2>
        <div className="bg-yellow-400 font-bold rounded-xl p-2">{movie.rating.average}</div>
      </div>

      <div className="py-3 sm:max-w-xl sm:mx-auto">
        <div className="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl  flex space-x-8">
          <div className=" overflow-visible w-1/2">
            <img className="rounded-3xl shadow-lg" src={movie.image.medium} alt="movie" />
          </div>
          <div className="flex flex-col w-2/3 space-y-4">
            <div>
              <div className="text-sm text-gray-400">Premiered</div>
              <div className="text-lg text-gray-800"> {movie.premiered.slice(0, 4)}</div>
              <div>
                <div className="text-sm text-gray-400">Genres</div>
                <div className="text-lg text-gray-800"> {movie.genres.toString()}</div>
              </div>
              <p className=" text-gray-400 max-h-40 overflow-y-hidden"> Members watched:</p>
              <div className="movies_smallborder">
                <ul>{MembersWatched}</ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-start">
          {user.permissions.includes("Update Movies") && (
            <input type="button" className="btn btn-sm btn-info mt-2" value="Edit" onClick={(e) => edit(movie)} />
          )}

          {user.permissions.includes("Delete Movies") && (
            <input
              type="button"
              className="btn btn-sm btn-info mt-2 "
              value="Delete"
              onClick={(e) => {
                deleteMovie(movie.id);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieItem;
