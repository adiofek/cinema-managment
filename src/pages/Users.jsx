import { useSelector } from "react-redux";
import { useState } from "react";
import Edituser from "../components/users/Edituser";
import Adduser from "../components/users/Adduser";
import UserItem from "../components/users/UserItem";

function Users() {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [USER, setUSER] = useState("");

  const cancelAdd = () => {
    setAdd(false);
  };

  const cancelEdit = () => {
    setEdit(false);
  };

  const editUser = (user) => {
    setEdit(true);
    setUSER(user);
  };

  if (user.username === undefined) window.location.href = "/main";

  return (
    <div>
      {user.username === "Admin@gmail.com" ? (
        <div>
          {add && <Adduser cancel={cancelAdd} />}
          {edit && <Edituser user={USER} cancel={cancelEdit} />}
          {!add && !edit && (
            <div>
              <div className=" flex justify-center mb-4 ">
                <button className="btn mr-2" disabled>
                  All Users
                </button>

                <button className="btn" onClick={(e) => setAdd(true)}>
                  Add User
                </button>
              </div>

              <div>
                {users.length > 0 && users.map((user) => <UserItem key={user.id} user={user} edit={editUser} />)}
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Users;
