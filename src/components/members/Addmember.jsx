import { useSelector, useDispatch } from "react-redux";
import { cinemaActions } from "../../store/store";

import { useState } from "react";

function Addmember({ cancel }) {
  const members = useSelector((state) => state.members);
  const dispatch = useDispatch();

  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [City, setCity] = useState();

  const PostMember = () => {
    if (Name.length < 2 || Email.length < 2 || City.length < 2) alert("Please enter full details ");
    else {
      let NewMember = {
        id: members[members.length - 1].id + 1,
        name: Name,
        email: Email,
        address: {
          city: City,
        },
      };
      dispatch(cinemaActions.ADD_MEMBER(NewMember));
      cancel();
    }
  };

  return (
    <div className="w-screen">
      <div className="p-5 shadow-lg rounded-lg bg-gray-100 text-gray-700 mb-8">
        <h2 className="flex justify-center font-semibold text-3xl">Add Member</h2>
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
          placeholder="Email"
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className=" flex justify-center mb-4">
        <input
          type="text"
          placeholder="City"
          className="input input-bordered w-full max-w-xs text-lg"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-5  ">
        <div className="mr-5">
          <input type="button" className="btn btn-success" value="ADD" onClick={PostMember} />
        </div>
        <input type="button" className="btn btn-success" value="CANCEL" onClick={cancel} />
      </div>
    </div>
  );
}

export default Addmember;
