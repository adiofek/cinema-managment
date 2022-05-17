import { useSelector } from "react-redux";

function MoviesWatched({ member }) {
  
  const subscriptions = useSelector((state) => state.subscriptions);
  const movies = useSelector((state) => state.movies);

  let FilterMember = subscriptions.filter((subscription) => subscription.memberid === member.id);

  let Movies = "";
  FilterMember.length === 1 &&
    (Movies = FilterMember[0].movies.map((movie) => {
      let Movie = movies.filter((element) => element.id === movie.movieid);
      return (
        <li key={movie.movieid}>
          {" "}
          {Movie[0].name},{movie.date}{" "}
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
