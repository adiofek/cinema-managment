import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import Spinner from "../components/layout/Spinner";
import Addmember from "../components/members/Addmember";
import Editmember from "../components/members/Editmember";
import MemberItem from "../components/members/MemberItem";

function Members() {
  const members = useSelector((state) => state.members);
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);

  const [add, setAdd] = useState(false);
  const [Member, setMember] = useState("");
  const [edit, setEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    user.permissions.includes("Create Subscriptions") ? setIsDisabled(false) : setIsDisabled(true);
  }, [user]);
  
  const cancelEdit = () => {
    setEdit(false);
  };

  const cancelAdd = () => {
    setAdd(false);
  };

  const editMember = (member) => {
    setEdit(true);
    setMember(member);
  };

  if (!loading) {
    return (
      <div>
        {user.permissions.includes("View Subscriptions") ? (
          <div>
            {add && user.permissions.includes("Create Subscriptions") && <Addmember cancel={cancelAdd} />}
            {edit && user.permissions.includes("Update Subscriptions") && <Editmember member={Member} cancel={cancelEdit} />}
            {!add && !edit && (
              <div>
                <div className=" flex justify-center mb-8 ">
                  <button className="btn mr-2" disabled>
                    {" "}
                    All Members
                  </button>

                  <button className="btn" disabled={isDisabled} onClick={(e) => setAdd(true)}>
                    Add Member
                  </button>
                </div>
                <div className=" grid grid-cols-1 gap-12 xl:grid-cols-4 lg:grid-cols-3 md-grid-cols-2">
                  {members.map((member) => (
                    <MemberItem key={member.id} member={member} edit={editMember} />
                  ))}
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

export default Members;
