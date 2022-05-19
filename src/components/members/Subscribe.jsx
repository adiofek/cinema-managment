import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MoviesList from "./MoviesList";
import { cinemaActions } from "../../store/store";

function Subscribe({ member }) {
  const movies = useSelector((state) => state.movies);

  const [date, setDate] = useState("");
  const [Selectedmovie, setSelectedmovie] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  const dispatch = useDispatch();

  const handleDateChange = (e) => {
    setDate(e.target.value);
    if (Selectedmovie !== "") setBtnDisabled(false);
  };
  const AddSubscription = (id) => {
    let Movie = movies.filter((movie) => movie.name === Selectedmovie);
    let newSubscription = {
      memberid: id,
      movies: [
        {
          movieid: Movie[0].id,
          date: date,
        },
      ],
    };

    dispatch(cinemaActions.ADD_SUBSCRIPTIONS(newSubscription));
    setSelectedmovie("");
    setDate("");
    setBtnDisabled(true);
  };

  const handleSelectedMovie = (movie) => {
    setSelectedmovie(movie);
    if (date !== "") setBtnDisabled(false);
  };

  return (
    <div className="flex flex-col items-center pb-5">
      <div className="mb-1">
        <strong>Add a movie </strong>
        {<MoviesList selected={handleSelectedMovie} memberid={member.id} />}
      </div>
      <div class="form-control">
        <label class="input-group mb-2">
          <span>Date</span>
          <input type="date" className="input input-bordered" onChange={handleDateChange} />
        </label>
      </div>
      <input
        type="button"
        disabled={btnDisabled}
        value="Subscribe"
        className="btn btn-sm btn-info mt-2"
        onClick={(e) => AddSubscription(member.id)}
      />
    </div>
  );
}
export default Subscribe;
