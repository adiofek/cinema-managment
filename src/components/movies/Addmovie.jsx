import { useSelector, useDispatch } from "react-redux";
import { cinemaActions } from "../../store/store";
import { useState } from "react";

function Addmovie({ cancel }) {
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const [Name, setName] = useState("");
  const [Genres, setGenres] = useState("");
  const [Imageurl, setImageurl] = useState("");
  const [Premiered, setPremiered] = useState("");
  const [Rating, setRating] = useState("");

  const PostMovie = () => {
    if (Name.length < 2 || Imageurl.length < 2 || Premiered.length < 2 || Genres.length < 2)
      alert("Please enter all details ");
    else {
      let GenArray = Genres.split(/,/);
      let NewMovie = {
        id: movies[movies.length - 1].id + 1,
        name: Name,
        genres: GenArray,
        image: {
          medium: Imageurl,
        },
        premiered: Premiered,
        rating: {
          average: Rating,
        },
      };
      dispatch(cinemaActions.ADD_MOVIE(NewMovie));
      cancel();
    }
  };

  return (
    <div className="w-screen">
      <div className="p-5 shadow-lg rounded-lg bg-gray-100 text-gray-700 mb-8">
        <h2 className="flex justify-center font-semibold text-3xl">Add Movie</h2>
      </div>
      <div className=" flex justify-center mb-4">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className=" flex justify-center mb-4">
        <input
          type="text"
          placeholder="Genres"
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setGenres(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4 text-xl ">
        <input
          type="text"
          placeholder="Image URL"
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setImageurl(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4 ">
        <input
          type="text"
          placeholder="Premiered"
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setPremiered(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4 ">
        <input
          type="text"
          placeholder="Rating"
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setRating(e.target.value)}
        />
      </div>

      <div className=" flex justify-center mb-5  ">
        <div className="mr-5">
          <input type="button" className="btn btn-success" value="ADD" onClick={PostMovie} />
        </div>
        <input type="button" className="btn btn-success" value="CANCEL" onClick={cancel} />
      </div>
    </div>
  );
}

export default Addmovie;
