import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { tryLogout } from "../Api/Auth";
import { fetchUser, user } from "../Context/User";
import { useAtom, useSetAtom } from "jotai";
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";
import { useForm } from "react-hook-form";
import InputGeneral from "../Components/Input/InputGeneral";
import {
  deleteEvent,
  getAllEventos,
  getAllEventosCollaborator,
  updateEventVerified,
} from "../Api/Eventos";
import Modal from "../Components/Modales/Modal";
import InputToggle from "../Components/Input/InputToggle";
import PageCreateEvent from "./PageCreateEvent";
import SelectGeneral from "../Components/Input/SelectGeneral";
import { deleteUser, getAllUser, PutUser, PutUserPassword } from "../Api/User";

const UserManagement = () => {
  const navigate = useNavigate();
  const refetchUser = useSetAtom(fetchUser);
  const [userContext] = useAtom(user);
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState(null);
  const [changePassword, setChangePassword] = useState(false);
  const [messageInfo, setMessageInfo] = useState("");
  const [userSelectDelete, setUserSelectDelete] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (editingUser) {
      setValue("name", editingUser.name);
      setValue("email", editingUser.email);
      setValue("role", editingUser.role === "ADMIN" ? "Admin" : "Colaborador");
      setValue("entity", editingUser.entity);
      setValue(
        "verified",
        editingUser.verified ? "Verificado" : "Sin verificar"
      );
    }
  }, [editingUser, setValue]);

  // Obtener todos los usuarios
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUser(userContext),
  });

  // Mutación para actualizar usuario
  const updateUserMutation = useMutation({
    mutationFn: async (data) => {
      return await PutUser(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      reset();
      setEditingUser(null);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (data) => {
      return await deleteUser(data, userContext.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setUserSelectDelete(null);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async ({ id, newPassword, confirmPassword }) => {
      return await PutUserPassword(id, { newPassword, confirmPassword });
    },
    onSuccess: (data) => {
      if (data.message === "Contraseña actualizada correctamente") {
        setChangePassword(false);
        setEditingUser(null);
        setMessageInfo("");
        reset();
      }

      if (reponse.message !== "Server error") {
        setMessageInfo(reponse.message);
      }
    },
  });

  const onSubmit = (data) => {
    const formatData = {
      ...data,
      role: data.role === "Admin" ? "ADMIN" : "COLLABORATOR",
      verified: data.verified === "Verificado" ? true : false,
      id: editingUser.id,
    };
    updateUserMutation.mutate(formatData);
    // console.log(formatData)
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Gestión de Usuarios</h2>
      {editingUser && (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="my-5 space-y-5">
            <h3>Editando a {editingUser.name}</h3>
            <div className="flex flex-col gap-5">
              <div
                className={`grid gap-5 ${
                  userContext.role === "ADMIN" ? "grid-cols-13" : "grid-cols-9"
                }`}
              >
                <InputGeneral
                  type="text"
                  className="border rounded px-2 py-1 col-span-3"
                  {...register("name", { required: true })}
                />
                <InputGeneral
                  type="email"
                  className="border rounded px-2 py-1 col-span-3"
                  {...register("email", { required: true })}
                />
                <InputGeneral
                  type="text"
                  className="border rounded px-2 py-1 col-span-3"
                  {...register("entity", { required: true })}
                />
                {userContext.role === "ADMIN" && (
                  <>
                    <SelectGeneral
                      name="role"
                      value={watch("role")}
                      onChange={(e) => setValue("role", e.target.value)}
                      options={["Admin", "Colaborador"]}
                      {...register("role", { required: true })}
                      placeholder="Rol"
                      className="col-span-2"
                    />
                    <SelectGeneral
                      name="verified"
                      value={watch("verified")}
                      onChange={(e) => setValue("verified", e.target.value)}
                      options={["Verificado", "Sin verificar"]}
                      {...register("verified", { required: true })}
                      placeholder="Estado"
                      className="col-span-2"
                    />
                  </>
                )}
              </div>
              <div className="flex flex-row gap-5">
                <ButtonGeneral
                  children="Guardar"
                  className="bg-green-500 hover:bg-green-600 text-white"
                  type="submit"
                />
                <ButtonGeneral
                  children="Cancelar"
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => {
                    setEditingUser(null);
                    reset();
                  }}
                />
                {changePassword ? (
                  <ButtonGeneral
                    children="Cancelar cambiar contraseña"
                    className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] text-white"
                    onClick={() => {
                      setChangePassword(false);
                    }}
                  />
                ) : (
                  <ButtonGeneral
                    children="Cambiar contraseña"
                    className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] text-white"
                    onClick={() => {
                      setChangePassword(true);
                    }}
                  />
                )}
              </div>
            </div>
          </form>
          {changePassword && (
            <form
              onSubmit={handleSubmit((data) => {
                if (data.newPassword !== data.confirmPassword) {
                  alert("Las contraseñas no coinciden.");
                  return;
                }

                resetPasswordMutation.mutate({
                  id: editingUser.id,
                  newPassword: data.newPassword,
                  confirmPassword: data.confirmPassword,
                });
              })}
              className="my-5 space-y-5"
            >
              {messageInfo && (
                <div className="text-center bg-red-400 px-4 py-2 rounded-md">
                  <p className=" text-white font-medium ">{messageInfo}</p>
                </div>
              )}
              <div className="flex flex-col gap-5 max-w-md">
                <InputGeneral
                  type="password"
                  placeholder="Nueva contraseña"
                  {...register("newPassword", {
                    required: true,
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{7,}$/gm,
                      message: "La contraseña no cumple los parametros",
                    },
                  })}
                  className="border rounded px-2 py-1"
                />
                <InputGeneral
                  type="password"
                  placeholder="Confirmar contraseña"
                  {...register("confirmPassword", {
                    required: "La confirmación es obligatoria",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{7,}$/gm,
                      message: "La contraseña no cumple los parametros",
                    },
                  })}
                  className="border rounded px-2 py-1"
                />
                <div className="flex flex-row gap-5">
                  <ButtonGeneral
                    type="submit"
                    children="Restablecer contraseña"
                    className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] text-white"
                  />
                </div>
              </div>
            </form>
          )}
        </>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto w-full">
        <form action=""></form>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-normal break-words">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-normal break-words">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-normal break-words">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-normal break-words">
                  {user.entity}
                </td>
                <td className="px-6 py-4 whitespace-normal break-words">
                  {user.verified ? "Verificado" : "Sin verificar"}
                </td>
                <td className="px-6 py-4 whitespace-normal break-words text-sm font-medium flex justify-center items-center">
                  {editingUser === user.id ? (
                    <div className="flex flex-col gap-2 items-center">
                      <ButtonGeneral
                        children="Guardar"
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={handleSubmit}
                      />
                      <ButtonGeneral
                        children="Cancelar"
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => setEditingUser(null)}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-row gap-2 items-center">
                      <ButtonGeneral
                        children="Editar"
                        className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] text-white"
                        onClick={() => setEditingUser(user)}
                      />
                      <ButtonGeneral
                        children="Borrar"
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => setUserSelectDelete(user)}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {userSelectDelete && (
          <Modal
            children={`¿Estás seguro de eliminar al usuario "${userSelectDelete.name}"?`}
            btn_left_text="Cancelar"
            btn_left_onClick={() => setUserSelectDelete(null)}
            btn_right_text="Eliminar"
            btn_right_onClick={() =>
              deleteUserMutation.mutate(userSelectDelete.id)
            }
            btn_right_className="bg-red-500 hover:bg-red-600"
          />
        )}
      </div>
    </div>
  );
};

const EventManagement = () => {
  const navigate = useNavigate();
  const [userContext] = useAtom(user);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const { register, handleSubmit, reset } = useForm();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("evento") || ""
  );
  const [showModal, setShowModal] = useState(false);
  const [eventSelect, setEventSelect] = useState({});

  const {
    mutate,
    data: dataMutation,
    isLoading,
  } = useMutation({
    mutationFn: (params) => {
      if (userContext.role == "ADMIN") {
        return getAllEventos(params);
      } else {
        return getAllEventosCollaborator(userContext.id, params);
      }
    },
  });

  useEffect(() => {
    const params = {};
    if (searchTerm) params.evento = searchTerm;
    params.page = page;
    setSearchParams(params);
    mutate(params);
  }, [page]);

  const search = (data) => {
    const params = {};
    if (data.nombre_evento) {
      params.evento = data.nombre_evento;
      setSearchTerm(data.nombre_evento);
    } else {
      setSearchTerm("");
    }
    params.page = 1;
    setPage(1);
    setSearchParams(params);
    mutate(params);
  };

  const clearSearch = () => {
    reset();
    setSearchTerm("");
    setPage(1);
    setSearchParams({});
    mutate({ page: 1 });
  };

  const refetchData = () => {
    const params = {};
    if (searchTerm) params.evento = searchTerm;
    params.page = page;
    mutate(params);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      setShowModal(false);
      refetchData();
    },
  });

  const verifiedMutation = useMutation({
    mutationFn: updateEventVerified,
    onSuccess: () => {
      refetchData();
    },
  });

  const eventos = dataMutation?.eventos || [];
  const total = dataMutation?.total || 0;
  const totalPages = Math.ceil(total / 10);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Gestión de Eventos/Noticias</h2>

      <form
        onSubmit={handleSubmit(search)}
        className="flex flex-row gap-4 mb-6 items-center"
      >
        <InputGeneral
          placeholder="Buscar por nombre del evento..."
          className="max-w-72"
          {...register("nombre_evento")}
        />
        <ButtonGeneral children="Buscar" type="submit" />
        <ButtonGeneral children="Limpiar" onClick={clearSearch} />
      </form>

      {isLoading && <p>Cargando eventos...</p>}

      {!isLoading && eventos.length === 0 && (
        <p className="text-gray-600">No se encontraron eventos.</p>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ciudad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {eventos?.map((event) => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-normal break-words">
                  {event.nombre_evento}
                </td>
                <td className="px-6 py-4 whitespace-normal break-words">
                  {event.user.entity}
                </td>
                <td className="px-6 py-4 whitespace-normal break-words">
                  {event.categoria}
                </td>
                <td className="px-6 py-4 whitespace-normal break-words">
                  {event.edades}
                </td>
                <td className="px-6 py-4 whitespace-normal break-words">
                  {event.ubicacion === "Otro" ? "-" : event.ubicacion}
                </td>
                <td
                  className={`px-6 py-4 whitespace-normal break-words ${
                    event.verified ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  <div className="flex flex-row items-center gap-3 ">
                    {event.verified ? "Publicado" : "Pendiente"}{" "}
                    {userContext.role === "ADMIN" && (
                      <InputToggle
                        checked={event.verified}
                        onChange={(e) =>
                          verifiedMutation.mutate({
                            id: event.id,
                            verified: e.target.checked,
                          })
                        }
                      />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-normal break-words">
                  <div className="flex flex-row items-center justify-between gap-3 ">
                    <ButtonGeneral
                      children="Editar"
                      className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] text-white"
                      onClick={() => navigate(`/dashboard/evento/${event.id}`)}
                    />
                    <ButtonGeneral
                      children="Borrar"
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => {
                        setShowModal(true);
                        setEventSelect(event);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center gap-4 mt-6 items-center">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page <= 1}
          className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-gray-700">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page >= totalPages}
          className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
      {showModal && (
        <Modal
          children={`¿Estás seguro de eliminar el evento "${eventSelect.nombre_evento}"?`}
          btn_left_text="Cancelar"
          btn_left_onClick={() => setShowModal(false)}
          btn_right_text="Eliminar"
          btn_right_onClick={() => deleteMutation.mutate(eventSelect.id)}
          btn_right_className="bg-red-500 hover:bg-red-600"
        />
      )}
    </div>
  );
};

const TABS = [
  { label: "Usuarios", component: UserManagement },
  { label: "Eventos/Noticias", component: EventManagement },
  { label: "Crear Evento", component: PageCreateEvent },
  // Aquí tus compañeros pueden agregar más tabs fácilmente
];

const PageDashboard = () => {
  const navigate = useNavigate();
  const refetchUser = useSetAtom(fetchUser);
  const [userContext] = useAtom(user);
  const [activeTab, setActiveTab] = useState(0);

  const handleLogout = async () => {
    await tryLogout();
    refetchUser();
    navigate("/");
  };

  const ActiveComponent = TABS[activeTab].component;

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
        </div>
        {/* Tabs */}
        <div className="mb-8 flex space-x-4 border-b">
          {TABS.map((tab, idx) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 font-medium focus:outline-none border-b-2 transition-colors duration-200 ${
                activeTab === idx
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-indigo-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};

export default PageDashboard;
