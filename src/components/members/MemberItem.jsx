import { useSelector, useDispatch } from "react-redux";
import { cinemaActions } from "../../store/store";
import { useState } from "react";
import PropTypes from "prop-types";
import MoviesWatched from "./MoviesWatched";
import Subscribe from "./Subscribe";

function MemberItem({ member, edit }) {
  const members = useSelector((state) => state.members);
  const user = useSelector((state) => state.user);
  const subscriptions = useSelector((state) => state.subscriptions);

  const dispatch = useDispatch();

  const [subscribe, setSubscribe] = useState(false);

  const deleteMember = (id) => {
    const NewMembersData = members.filter((element) => element.id !== id);
    dispatch(cinemaActions.DELETE_MEMBER({ members: NewMembersData }));
    deleteSubscriptions(id);
  };

  const deleteSubscriptions = (id) => {
    const NewSubs = subscriptions.filter((subscription) => subscription.memberid !== id);
    dispatch(cinemaActions.DELETE_SUBSCRIPTIONS({ subscriptions: NewSubs }));
  };

  return (
    <div className=" flex flex-col px-7 py-7 items-center bg-gray-100  rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <span className="text-xl font-medium text-gray-700 dark:text-white">{member.name}</span>
      <div className="text-base mt-2 mb-2">
        <span className="block text-center">{member.email}</span>
        <span className="block text-center"> City:{member.address.city}</span>
      </div>

      <div className="flex justify-center ">
        {user.permissions.includes("Update Subscriptions") && (
          <input type="button" value="Edit" className="btn btn-sm btn-accent" onClick={(e) => edit(member)} />
        )}
        {user.permissions.includes("Delete Subscriptions") && (
          <input
            type="button"
            value="Delete"
            className="btn btn-sm btn-error"
            onClick={(e) => deleteMember(member.id)}
          />
        )}
      </div>
      <div className="flex flex-col items-center pb-5">
        <h6 className="mb-4 mt-4 text-xl font-medium text-gray-900 dark:text-white">Movies Watched</h6>
        <input
          type="button"
          className="btn btn-sm btn-accent mb-2"
          value="Subscribe to new movie"
          onClick={(e) => setSubscribe(!subscribe)}
        />
        {subscribe && <Subscribe member={member} />}
        {<MoviesWatched member={member} />}
      </div>
    </div>
  );
}

MemberItem.propTypes = {
  member: PropTypes.object.isRequired,
};

export default MemberItem;
