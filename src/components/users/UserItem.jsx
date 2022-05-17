import { useSelector, useDispatch } from "react-redux";
import { cinemaActions } from '../../store/store'

import PropTypes from "prop-types";

function UserItem({ user,edit }) {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const deleteUser = (id) => {
    let NewUsers = users.filter((user) => user.id !== id);
    dispatch(cinemaActions.DELETE_USER({ users: NewUsers }));
  };

  return (
    <div className="max-w-md mx-auto bg-gray-200 rounded-lg border-2 border-black shadow-md dark:bg-gray-800 dark:border-gray-700 mb-5">
      <div className="flex flex-col items-left pb-2">
        <span className="text-m">Name: {user.firstname + " " + user.lastname}</span>
        <span className="text-m">Username: {user.username}</span>
        <span className="text-m">Session Time Out: {user.sessiontimeout}</span>
        <span className="text-m">Created data: {user.createddate}</span>
        <span className="text-m">Permissions: {user.permissions.toString()}</span>
      </div>
      <div className="flex justify-start ">
        <input type="button" value="Edit" className="btn btn-sm btn-info" onClick={(e) => edit(user)} />
        <input type="button" value="Delete" className="btn btn-sm btn-info " onClick={(e) => deleteUser(user.id)} />
      </div>
    </div>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
