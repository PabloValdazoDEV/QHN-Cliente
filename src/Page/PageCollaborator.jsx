import { useNavigate } from "react-router";
import { tryLogout } from "../Api/Auth";
import { fetchUser, user } from "../Context/User";
import { useAtom, useSetAtom } from "jotai";

const PageCollaborator = () => {
    const navigate = useNavigate();
    const refetchUser = useSetAtom(fetchUser)
    const [userContext] = useAtom(user)
  return (
    <>
      <h1>Page Colaborator</h1>
      <button
        onClick={() => {
          tryLogout()
          navigate("/")
          refetchUser()
        }}
      >
        LogOut
      </button>
    </>
  );
};

export default PageCollaborator;
