import { useSelector, useDispatch } from "react-redux";
import { cinemaActions } from "../../store/store";

function Welcome() {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const ChangeUserDemo = (username) => {
    dispatch(cinemaActions.SWITCH_USER(username));
  };

  let UsersList = users.map((user) => {
    return <option key={user.id}>{user.username}</option>;
  });

  return (
    <div>
      <div className="container mx-auto mb-8 mt-8">
        <div className="flex justify-center text-xl font-bold align-middle mb-2">
          {user.firstname !== undefined && `Welcome ${user.firstname + " " + user.lastname}`}
        </div>
        <div className="container mx-auto mt-4 text-gray-400">
          <div className="flex justify-center align-middle">
            <span className=" mr-2"> Switch User(DEMO)</span>
            <select onChange={(e) => ChangeUserDemo(e.target.value)}>{UsersList}</select>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Welcome;
