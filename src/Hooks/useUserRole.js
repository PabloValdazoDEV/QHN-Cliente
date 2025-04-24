import { useAtomValue } from "jotai";
import { user } from "../Context/User";

export const useUserRole = () => {
    const userContext = useAtomValue(user);
    // console.log(userContext)
  
    if (userContext === null) return { role: null, loading: false }; // no logueado
    if (userContext === undefined) return { role: undefined, loading: true }; // aún cargando
  
    return { role: userContext.role, loading: false };
  };
  