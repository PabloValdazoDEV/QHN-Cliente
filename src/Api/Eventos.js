import api from "./ApiConfig";
import Cookies from "js-cookie";

const eventUploadImage = async (formData) => {
  try {
    const response = await api.post("/api/eventos/upload", formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message || "Error de red",
    };
  }
};
const eventUpload = async (formData) => {
  try {
    const response = await api.post("/api/eventos", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    if (response.request.status !== 200) {
      return { message: "Error al guardar el evento" };
    }
    return { message: "Evento guardado" };
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message || "Error de red",
    };
  }
};

const getAllEventos = async (params = {}) => {
  try {
    const response = await api.get("/api/eventos", { params });
    return response.data; 
  } catch (error) {
    return {
      success: false,
      eventos: [],
      total: 0,
      message: error.response.data.message || "Error de red",
    };
  }
};

const getAllEventosCollaborator = async (id, params = {}) => {
  try {
    const response = await api.get(`/api/eventos/collaborator/${id}`, { params });
    return response.data; 
  } catch (error) {
    return {
      success: false,
      eventos: [],
      total: 0,
      message: error.response.data.message || "Error de red",
    };
  }
};


const getEventById = async (id) => {
  try {
    const response = await api.get(`/api/eventos/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message || "Error de red",
    };
  }
};

const eventUpdate = async (id, formData) => {
  try {
    const response = await api.put(`/api/eventos/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    if (response.status !== 200) {
      return { message: "Error al actualizar el evento" };
    }
    return { message: "Evento actualizado", evento: response.data.evento };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error de red",
    };
  }
};

const deleteEvent = async (id) => {
  try {
    await api.delete(`/api/eventos/${id}`);
    return { message: "Evento borrado" };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error de red",
    };
  }
};

const updateEventVerified = async (data) =>{
try {
  await api.put(`/api/eventos/verified/${data.id}`, data);
  return { message: "Evento verificado" };
} catch (error) {
  return {
    success: false,
    message: error.response?.data?.message || "Error de red",
  };
}
}

const getAllEventosUser = async () =>{
  try {
    const response = await api.get(`/api/eventos/user`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error de red",
    };
  }
}
const getAllEventosUserLast = async () =>{
  try {
    const response = await api.get(`/api/eventos/user/last`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error de red",
    };
  }
}

const getEventosUser = async () =>{
  try {
    const response = await api.get(`/api/eventos/user`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error de red",
    };
  }
}

const getEventosSlug = async (city, category, name) =>{
  try {
    const response = await api.get(`/api/eventos/event/${city}/${category}/${name}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error de red",
    };
  }
}

export const getEventosPorCiudad = async (city) => {
  const response = await api.get(`/api/eventos/ciudad/${city}`);
  return response.data;
};

export const getEventosPorCiudadYCategoria = async (city, category) => {
  const response = await api.get(`/api/eventos/ciudad/${city}/${category}`);
  return response.data;
};



export {
  eventUploadImage,
  eventUpload,
  getAllEventos,
  getEventById,
  eventUpdate,
  deleteEvent,
  updateEventVerified,
  getAllEventosCollaborator,
  getAllEventosUser,
  getEventosUser,
  getAllEventosUserLast,
  getEventosSlug
};
