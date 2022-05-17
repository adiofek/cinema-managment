import { useDispatch } from "react-redux";
import { cinemaActions } from "../../store/store";
import { useState } from "react";

function Edituser({ user, cancel }) {
  const dispatch = useDispatch();

  const [Fname, setFname] = useState(user.firstname);
  const [Lname, setLname] = useState(user.lastname);
  const [Username, setUsername] = useState(user.username);
  const [Sessiontimeout, setSessiontimeout] = useState(user.sessiontimeout);
  const [Permissions, setPermissions] = useState(user.permissions);

  if (Permissions.vs) document.getElementById("vs").checked = true;
  if (Permissions.vm) document.getElementById("vm").checked = true;

  const UpdateUser = () => {
    let UpdatedUser = {
      id: user.id,
      fname: Fname,
      lname: Lname,
      username: Username,
      sessiontimeout: Sessiontimeout,
      createddate: user.createddate,
      permissions: Permissions,
    };
    dispatch(cinemaActions.EDIT_USER(UpdatedUser));
    cancel();
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg bg-gray-100 text-gray-700 mb-8">
        <h2 className="flex justify-center font-semibold text-3xl">Edit User</h2>
      </div>
      <div className=" flex justify-center mb-4">
        <h3 className="flex justify-center ">First Name:</h3>
        <input
          type="text"
          defaultValue={user.firstname}
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setFname(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4">
        <input
          type="text"
          defaultValue={user.lastname}
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4">
        <input
          type="text"
          defaultValue={user.username}
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4">
        <input
          type="text"
          defaultValue={user.sessiontimeout}
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setSessiontimeout(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4">
        <input type="text" value={user.createddate} className="input input-bordered w-full max-w-xs text-lg" />
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
        <div className="mr-5 mt-3">
          <input type="Button" className="btn btn-success mx-2" value="ADD" onClick={UpdateUser} />
          <input type="button" className="btn btn-success mx-2" value="CANCEL" onClick={cancel} />
        </div>
      </div>
    </div>
  );
}

export default Edituser;
