import { useState } from "react";
import { useDispatch } from "react-redux";

import { cinemaActions } from "../../store/store";

function Editmember({ member, cancel }) {
  const dispatch = useDispatch();

  const [Name, setName] = useState(member.name);
  const [Email, setEmail] = useState(member.email);
  const [City, setCity] = useState(member.address.city);

  const UpdateMember = () => {
    let UpdatedMember = {
      id: member.id,
      username: member.username,
      name: Name,
      email: Email,
      address: {
        street: member.address.street,
        city: City,
      },
    };

    dispatch(cinemaActions.EDIT_MEMBER(UpdatedMember));
    cancel();
  };
  return (
    <div className="w-screen">
      <div className="p-5 shadow-lg rounded-lg bg-gray-100 text-gray-700 mb-8">
        <h2 className="flex justify-center font-semibold text-3xl">Edit Member</h2>
      </div>
      <div className=" flex justify-center mb-4">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs text-lg"
          defaultValue={member.name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs text-lg"
          defaultValue={member.email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className=" flex justify-center mb-4">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs text-lg"
          defaultValue={member.address.city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className=" flex justify-center  ">
        <div className="mr-5">
          <input type="button" className="btn btn-success" value="SAVE" onClick={UpdateMember} />
        </div>
        <input type="button" className="btn btn-success" value="CANCEL" onClick={cancel} />
      </div>
    </div>
  );
}

export default Editmember;
