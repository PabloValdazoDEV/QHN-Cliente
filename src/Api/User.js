import api from "./ApiConfig";
import Cookies from "js-cookie";


const getAllUser = async (userContext) => {

  try {
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    if(userContext.role === "COLLABORATOR"){
        const userColaborador = response.data.filter((user)=>user.id === userContext.id)
        return userColaborador;
    }
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

const PutUser = async (data) => {
    try {
        const response = await api.put(`/users/${data.id}`, data, {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            });
        return response.data;
      } catch (error) {
        return { success: false, message: error.response.data.message };
      }
}
const PutUserPassword = async (id, data) => {
    try {
        const response = await api.put(`/users/password/${id}`, data, {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            });
        return response.data;
      } catch (error) {
        return { success: false, message: error.response.data.message };
      }
}

const deleteUser = async (idOldUser, idNewUser) => {
    try {
        await api.put(`/user/delete/${idOldUser}`, {idNewUser}, {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            });
            return 
      } catch (error) {
        return { success: false, message: error.response.data.message };
      }
}

export { getAllUser, PutUser, PutUserPassword, deleteUser };
