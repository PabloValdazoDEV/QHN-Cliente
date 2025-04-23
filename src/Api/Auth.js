
import api from "./ApiConfig";
import Cookies from "js-cookie";

const tryLogin = async (data) => {
  try {
    console.log(data)
    const response = await api.post("/login", data);

    if (response.data.token) {
      Cookies.set("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    return { success: false, message: "Error desconocido" };
  }
};

const tryRegister = async (data) => {
    try {
      await api.post("/register", data);
    } catch (error) {
      console.error(
        "Error en el registro:",
        error.response?.data || error.message
      );
    }
  };
  
  const tryLogout = async () => {
    Cookies.remove("token");
  };



export {
    tryLogin,
    tryRegister,
    tryLogout
  };