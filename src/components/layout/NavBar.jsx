import { useSelector } from "react-redux";
import { FaCameraRetro } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NavBar() {
  const user = useSelector((state) => state.user);

  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="navbar mb-10 shadow-lg bg-neutral text-neutral-content">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>

          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content text-primary mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user.permissions !== undefined && user.permissions.includes("View Movies") && (
              <li>
                <Link to="/movies" className="btn btn-ghost btn-sm rounded-btn">
                  Movies
                </Link>{" "}
              </li>
            )}

            {user.permissions !== undefined && user.permissions.includes("View Subscriptions") && (
              <li>
                <Link to="/members" className="btn btn-ghost btn-sm rounded-btn">
                  Subscriptions
                </Link>{" "}
              </li>
            )}
            {user.username === "Admin@gmail.com" && (
              <li>
                <Link to="/users" className="btn btn-ghost btn-sm rounded-btn">
                  Users
                </Link>{" "}
              </li>
            )}
            <li>
              <Link to="/login" className="btn btn-ghost btn-sm rounded-btn" onClick={logout}>
                Log Out
              </Link>
            </li>
          </ul>
        </div>
          <div className="flex-none justify-center sm:justify-start px-2 mx-2">
            <FaCameraRetro className=" inline pr-2 text-2xl  " />
            <Link to="/main" className="  text-xl font-bold align-middle ">
              Movies App
            </Link>
        </div>
      </div>

      <div className="navbar-end hidden sm:flex ">
        <div className=" flex justify-end">
          {user.permissions !== undefined && user.permissions.includes("View Movies") && (
            <Link to="/movies" className="btn btn-ghost btn-sm rounded-btn">
              Movies
            </Link>
          )}

          {user.permissions !== undefined && user.permissions.includes("View Subscriptions") && (
            <Link to="/members" className="btn btn-ghost btn-sm rounded-btn">
              Subscriptions
            </Link>
          )}

          {user.username === "Admin@gmail.com" && (
            <Link to="/users" className="btn btn-ghost btn-sm rounded-btn">
              Users
            </Link>
          )}

          <Link to="/login" className="btn btn-ghost btn-sm rounded-btn" onClick={logout}>
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
}

NavBar.defaultProps = {
  title: "Cinema Management",
};

NavBar.propTypes = {
  title: PropTypes.string,
};
export default NavBar;
