import api from "./ApiConfig";
import Cookies from "js-cookie";

const tryLogin = async (data) => {
  try {
    const response = await api.post("/login", data);

    if (response.data.token) {
      Cookies.set("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
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

const tryMe = async (token) => {
  try {
    const response = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("Usuario desde /me:", response.data);
    return response.data;

  } catch (error) {
    console.error("Error en /me:", error.response?.data || error.message);
    return null;
  }
};


export { tryLogin, tryRegister, tryLogout, tryMe };
