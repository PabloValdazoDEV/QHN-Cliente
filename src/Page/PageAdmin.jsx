import { useNavigate } from "react-router";
import { tryLogout } from "../Api/Auth";

const PageAdmin = () => {
    const navigate = useNavigate();
  return (
    <>
      <h1>Page Admin</h1>
      <button
        onClick={() => {
          tryLogout()
          navigate("/")
        }}
      >
        LogOut
      </button>
    </>
  );
};

export default PageAdmin;
