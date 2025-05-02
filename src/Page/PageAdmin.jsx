import { useNavigate } from "react-router";
import { tryLogout } from "../Api/Auth";
import { fetchUser, user } from "../Context/User";
import { useAtom, useSetAtom } from "jotai";
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";

const PageAdmin = () => {
  const navigate = useNavigate();
  const refetchUser = useSetAtom(fetchUser);
  const [userContext] = useAtom(user);
  return (
    <>
      <h1>Page Admin</h1>
      <ButtonGeneral
        onClick={() => {
          navigate("/crear-evento");
        }}
        children="Crear evento"
      />
      <ButtonGeneral
        onClick={() => {
          navigate("/dashboard/eventos");
        }}
        children="Dash Board Eventos"
      />
      <ButtonGeneral
        onClick={() => {
          tryLogout();
          navigate("/");
          refetchUser();
        }}
        children="LogOut"
      />
    </>
  );
};

export default PageAdmin;
