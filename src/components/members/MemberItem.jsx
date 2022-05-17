import { useSelector, useDispatch } from "react-redux";
import { cinemaActions } from "../../store/store";

import { useState } from "react";
import PropTypes from "prop-types";
import MoviesWatched from "./MoviesWatched";
import MoviesList from "./MoviesList";

function MemberItem({ member, edit }) {
  const movies = useSelector((state) => state.movies);
  const members = useSelector((state) => state.members);
  const user = useSelector((state) => state.user);
  const subscriptions = useSelector((state) => state.subscriptions);

  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [Selectedmovie, setSelectedmovie] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  const deleteMember = (id) => {
    const NewMembersData = members.filter((element) => element.id !== id);
    dispatch(cinemaActions.DELETE_MEMBER({ members: NewMembersData }));
    deleteSubscriptions(id);
  };

  const deleteSubscriptions = (id) => {
    const NewSubs = subscriptions.filter((subscription) => subscription.memberid !== id);
    dispatch(cinemaActions.DELETE_SUBSCRIPTIONS({ subscriptions: NewSubs }));
  };

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
    <div className="max-w-sm bg-gray-200 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-5">
        <h5 className="mb-1 mt-2 text-xl font-medium text-gray-900 dark:text-white">{member.name}</h5>
        <span className="text-m text-gray-500 dark:text-gray-400">{member.email}</span>
        <span className="text-m text-gray-500 dark:text-gray-400">City: {member.address.city}</span>
      </div>
      <div className="flex justify-center ">
        {user.permissions.includes("Update Subscriptions") && (
          <input type="button" value="Edit" className="btn btn-sm btn-info" onClick={(e) => edit(member)} />
        )}
        {user.permissions.includes("Delete Subscriptions") && (
          <input
            type="button"
            value="Delete"
            className="btn btn-sm btn-info"
            onClick={(e) => deleteMember(member.id)}
          />
        )}
      </div>
      <div className="flex flex-col items-center pb-5">
        <h6 className="mb-1 mt-5 text-xl font-medium text-gray-900 dark:text-white">Movies Watched</h6>
        {<MoviesWatched member={member} />}
      </div>

      <div className="flex flex-col items-center pb-5">
        <strong>Add a movie </strong>
        {<MoviesList selected={handleSelectedMovie} memberid={member.id} />}
        <input type="date" onChange={handleDateChange} />
        <input
          type="button"
          disabled={btnDisabled}
          value="Subscribe"
          className="btn btn-sm btn-info mt-2"
          onClick={(e) => AddSubscription(member.id)}
        />
      </div>
    </div>
  );
}

MemberItem.propTypes = {
  member: PropTypes.object.isRequired,
};

export default MemberItem;
