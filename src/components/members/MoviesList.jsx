import { useSelector } from "react-redux";

function MoviesList({ selected, memberid }) {
  
  const subscriptions = useSelector((state) => state.subscriptions);
  const movies = useSelector((state) => state.movies);

  let Subscription = subscriptions.filter((subscription) => subscription.memberid === memberid);

  let UnWatchedMovies = movies;

  if (Subscription.length > 0) {
    let WatchedMovies = Subscription[0].movies.map((movie) => movie.movieid);
    UnWatchedMovies = movies.filter((movie) => !WatchedMovies.includes(movie.id));
  }

  let MoviesList = UnWatchedMovies.map((movie) => {
    return (
      <option key={movie.id} className="">
        {movie.name}
      </option>
    );
  });

  return (
    <div>
      <select onChange={(e) => selected(e.target.value)}>
      <option disabled selected>Choose a Movie</option>
        {MoviesList}
        </select>
    </div>
  );
}
export default MoviesList;
