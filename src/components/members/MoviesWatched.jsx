import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MoviesWatched({ member }) {
  const subscriptions = useSelector((state) => state.subscriptions);
  const movies = useSelector((state) => state.movies);

  let FilterMember = subscriptions.filter((subscription) => subscription.memberid === member.id);

  let Movies = "";
  FilterMember.length === 1 &&
    (Movies = FilterMember[0].movies.map((movie) => {
      let Movie = movies.filter((element) => element.id === movie.movieid);
      let MovieName = Movie[0].name;
      return (
        <li key={movie.movieid}>
          {" "}
          <Link to={`/movies/${MovieName}`} className=" text-base text-blue-600 underline ">
            {MovieName}
          </Link>{" "}
          ,{movie.date}{" "}
        </li>
      );
    }));
  return (
    <div>
      <ul>{Movies}</ul>
    </div>
  );
}
export default MoviesWatched;
