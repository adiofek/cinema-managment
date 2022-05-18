import { useDispatch } from "react-redux";
import { cinemaActions } from "../../store/store";

import { useState } from "react";

function Editmovie({ movie, cancel }) {
  const dispatch = useDispatch();

  const [Name, setName] = useState(movie.name);
  const [Genres, setGenres] = useState(movie.genres);
  const [Imageurl, setImageurl] = useState(movie.image.medium);
  const [Premiered, setPremiered] = useState(movie.premiered);
  const [Rating, setRating] = useState(movie.rating.average);

  const UpdateMovie = () => {
    let GenArray = Genres.toString().split(/,/);
    let UpdatedMovie = {
      id: movie.id,
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

    dispatch(cinemaActions.EDIT_MOVIE(UpdatedMovie));
    cancel();
  };
  return (
    <div className="w-screen">
      <div className="p-5 shadow-lg rounded-lg bg-gray-100 text-gray-700 mb-8">
        <h2 className="flex justify-center font-semibold text-3xl">Edit Movie</h2>
      </div>
      <div className=" flex justify-center mb-4">
        <input
          type="text"
          defaultValue={movie.name}
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className=" flex justify-center mb-4">
        <input
          type="text"
          defaultValue={movie.image.medium}
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setImageurl(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4 text-xl ">
        <input
          type="text"
          defaultValue={movie.genres}
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setGenres(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4 ">
        <input
          type="text"
          defaultValue={movie.premiered}
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setPremiered(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4">
        <input
          type="text"
          defaultValue={movie.rating.average}
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setRating(e.target.value)}
        />
      </div>

      <div className=" flex justify-center  ">
        <div className="mr-5">
          <input type="button" className="btn btn-success" value="SAVE" onClick={UpdateMovie} />
        </div>
        <input type="button" className="btn btn-success" value="CANCEL" onClick={cancel} />
      </div>
    </div>
  );
}

export default Editmovie;
