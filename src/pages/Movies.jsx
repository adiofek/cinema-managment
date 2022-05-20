import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Addmovie from "../components/movies/Addmovie";
import Editmovie from "../components/movies/Editmovie";
import { useParams, useNavigate } from "react-router-dom";
import MovieItem from "../components/movies/MovieItem";
import Spinner from "../components/layout/Spinner";

function Movies() {
  const movies = useSelector((state) => state.movies);
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loadingmovies);
  const [edit, setEdit] = useState(false);
  const [Movie, setMovie] = useState("");
  const [add, setAdd] = useState(false);
  const [SearchText, setSearchText] = useState("");
  const [search, setSearch] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const MovieParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    user.permissions.includes("Create Movies") ? setIsDisabled(false) : setIsDisabled(true);
  }, [user]);

  const cancelAdd = () => {
    setAdd(false);
  };

  const cancelEdit = () => {
    setEdit(false);
  };

  const editMovie = (movie) => {
    setEdit(true);
    setMovie(movie);
  };

  if(movies.length===0) window.location.href = "/main";


  if (!loading) {
    return (
      <div>
        {user.permissions.includes("View Movies") ? (
          <div>
            {add && user.permissions.includes("Create Movies") && <Addmovie cancel={cancelAdd} />}
            {edit && user.permissions.includes("Update Movies") && <Editmovie movie={Movie} cancel={cancelEdit} />}
            {!add && !edit && (
              <div>
                <div className="flex justify-center mb-4 ">
                  <input
                    type="text"
                    className="input input-bordered focus:outline-none rounded-none rounded-bl-lg rounded-tl-lg w-full max-w-xs text-lg"
                    placeholder="Search Movie"
                    onChange={(e) => setSearchText(e.target.value)}
                    value={SearchText}
                  />
                  {!search && MovieParams.id === undefined ? (
                    <input
                      type="button"
                      className="btn rounded-none rounded-br-lg rounded-tr-lg"
                      value="Go"
                      onClick={(e) => setSearch(true)}
                    />
                  ) : (
                    <input
                      type="button"
                      className="btn rounded-none rounded-br-lg rounded-tr-lg"
                      value="Clear"
                      onClick={(e) => {
                        setSearch(false);
                        setSearchText("");
                        navigate("/movies");
                      }}
                    />
                  )}
                </div>

                <div className=" flex justify-center mb-4 ">
                  <button className="btn mr-2" disabled>
                    {" "}
                    All Movies
                  </button>
                  <button className="btn" disabled={isDisabled} onClick={(e) => setAdd(true)}>
                    Add Movie
                  </button>
                </div>

                <div className=" grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md-grid-cols-2 mx-4">
                  {movies.map((movie) =>
                    MovieParams.id === undefined ? (
                      !search ? (
                        <MovieItem key={movie.id} movie={movie} edit={editMovie} />
                      ) : (
                        movie.name.includes(SearchText) && <MovieItem key={movie.id} movie={movie} edit={editMovie} />
                      )
                    ) : (
                      movie.name.includes(MovieParams.id) && <MovieItem key={movie.id} movie={movie} edit={editMovie} />
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default Movies;
