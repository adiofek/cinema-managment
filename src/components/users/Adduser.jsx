import { useSelector,useDispatch } from "react-redux";
import { cinemaActions } from "../../store/store";
import { useState } from "react";

function Adduser({ cancel }) {
  const users = useSelector(state =>state.users);
  const dispatch = useDispatch()

  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Username, setUsername] = useState("");
  const [Sessiontimeout, setSessiontimeout] = useState("");
  const [Permissions, setPermissions] = useState([]);

  const PostUser = () => {
    const date = new Date().toLocaleDateString();
    let NewUser = {
      id: users[users.length - 1].id + 1,
      firstname: Fname,
      lastname: Lname,
      createddate: date,
      username: Username,
      sessiontimeout: Sessiontimeout,
      permissions: Permissions,
    };
    dispatch(cinemaActions.ADD_USERS(NewUser));
    cancel();
  };

  if (Permissions.includes("View Subscriptions")) document.getElementById("vs").checked = true;
  if (Permissions.includes("View Movies")) document.getElementById("vm").checked = true;

  return (
    <div className="w-screen">
      <div className="p-5 shadow-lg rounded-lg bg-gray-100 text-gray-700 mb-8">
        <h2 className="flex justify-center font-semibold text-3xl">Add User</h2>
      </div>
      <div className=" flex justify-center mb-4">
        <input
          type="text"
          placeholder="First Name"
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setFname(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4">
        <input
          type="text"
          placeholder="Last Name"
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4">
        <input
          type="text"
          placeholder="User Name"
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4">
        <input
          type="text"
          placeholder="Session Time Out (Minutes)"
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setSessiontimeout(e.target.value)}
        />
      </div>
      <div class="flex justify-center">
        <div>
          <div class="form-check">
            <div className=" flex justify-center mb-2 text-2xl">PERMISSIONS</div>
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              id="vs"
              onChange={(e) => {
                e.target.checked
                  ? setPermissions((Permissions) => [...Permissions, "View Subscriptions"])
                  : setPermissions(Permissions.filter((permission) => permission !== "View Subscriptions"));
              }}
            />
            View Subscriptions
          </div>
          <div class="form-check">
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  Permissions.includes("View Subscriptions")
                    ? setPermissions((Permissions) => [...Permissions, "Create Subscriptions"])
                    : setPermissions((Permissions) => [...Permissions, "Create Subscriptions", "View Subscriptions"]);
                } else setPermissions(Permissions.filter((permission) => permission !== "Create Subscriptions"));
              }}
            />
            Create Subscriptions
          </div>
          <div class="form-check">
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  Permissions.includes("View Subscriptions")
                    ? setPermissions((Permissions) => [...Permissions, "Delete Subscriptions"])
                    : setPermissions((Permissions) => [...Permissions, "Delete Subscriptions", "View Subscriptions"]);
                } else setPermissions(Permissions.filter((permission) => permission !== "Delete Subscriptions"));
              }}
            />
            Delete Subscriptions
          </div>
          <div class="form-check">
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  Permissions.includes("View Subscriptions")
                    ? setPermissions((Permissions) => [...Permissions, "Update Subscriptions"])
                    : setPermissions((Permissions) => [...Permissions, "Update Subscriptions", "View Subscriptions"]);
                } else setPermissions(Permissions.filter((permission) => permission !== "Update Subscriptions"));
              }}
            />
            Update Subscriptions
          </div>
          <div class="form-check">
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              id="vm"
              onChange={(e) => {
                e.target.checked
                  ? setPermissions((Permissions) => [...Permissions, "View Movies"])
                  : setPermissions(Permissions.filter((permission) => permission !== "View Movies"));
              }}
            />
            View Movies
          </div>
          <div class="form-check">
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  Permissions.includes("View Movies")
                    ? setPermissions((Permissions) => [...Permissions, "Create Movies"])
                    : setPermissions((Permissions) => [...Permissions, "Create Movies", "View Movies"]);
                } else setPermissions(Permissions.filter((permission) => permission !== "Create Movies"));
              }}
            />
            Create Movies
          </div>
          <div class="form-check">
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  Permissions.includes("View Movies")
                    ? setPermissions((Permissions) => [...Permissions, "Delete Movies"])
                    : setPermissions((Permissions) => [...Permissions, "Delete Movies", "View Movies"]);
                } else setPermissions(Permissions.filter((permission) => permission !== "Delete Movies"));
              }}
            />
            Delete Movies
          </div>
          <div class="form-check">
            <input
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  Permissions.includes("View Movies")
                    ? setPermissions((Permissions) => [...Permissions, "Update Movies"])
                    : setPermissions((Permissions) => [...Permissions, "Update Movies", "View Movies"]);
                } else setPermissions(Permissions.filter((permission) => permission !== "Update Movies"));
              }}
            />
            Update Movies
          </div>
        </div>
      </div>

      <div className=" flex justify-center  ">
        <div className="mt-3 mb-3">
          <input type="Button" className="btn btn-success mx-2" value="ADD" onClick={PostUser} />
          <input type="button" className="btn btn-success mx-2" value="CANCEL" onClick={cancel} />
        </div>
      </div>
    </div>
  );
}

export default Adduser;
