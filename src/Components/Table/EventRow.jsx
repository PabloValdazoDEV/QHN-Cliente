import { useMutation } from "@tanstack/react-query";
import { deleteEvent, updateEventVerified } from "../../Api/Eventos";
import { useState } from "react";
import Modal from "../Modales/Modal";
import InputToggle from "../Input/InputToggle";
import ButtonGeneral from "../Buttons/ButtonGeneral";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { user } from "../../Context/User";

export default function EventoRow({ evento, refetch  }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userContext] = useAtom(user);

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      setShowModal(false);
      refetch();
    },
  });

  const verifiedMutation = useMutation({
    mutationFn: updateEventVerified,
    onSuccess: () => {
        refetch();

    },
  });

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="bg-white p-5 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 border border-gray-200">
      <div className="flex-1">
        <h2 className="text-xl font-bold text-neutral-800">
          Titulo: {evento.nombre_evento}
        </h2>
        <p className="text-sm text-gray-500">
          Nombre del creador: {evento.user.name}
        </p>
        <p className="text-sm text-gray-500">
          Email del creador: {evento.user.email}
        </p>
        <p className="text-sm text-gray-500">
          Creado: {formatDate(evento.createdAt)}
        </p>
        <p className="text-sm text-gray-500">
          Última edición: {formatDate(evento.updatedAt)}
        </p>
        
        <p className="text-sm text-gray-500 my-2">
          Estado: <span className={`text-white font-medium px-2 py-1 rounded-md ${evento.verified ? "bg-green-500" : "bg-yellow-500"}`}> {evento.verified ? "Publicado" : "Pendiente"}</span>
        </p>
        {userContext.role === "ADMIN" && (
            <div className="flex flex-roe items-center">
                
          <p className="text-sm text-gray-500 mr-2">
          Publicar evento: 
        </p>

          <InputToggle
            checked={evento.verified}
            onChange={(e) =>
              verifiedMutation.mutate({
                id: evento.id,
                verified: e.target.checked,
              })
            }
          />
          </div>
        )} 
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-center">

        <ButtonGeneral
          children="Editar"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => navigate(`/dashboard/evento/${evento.id}`)}
        />
        <ButtonGeneral
          children="Eliminar"
          className="bg-red-500 hover:bg-red-600 text-white"
          onClick={() => setShowModal(true)}
        />
      </div>

      {showModal && (
        <Modal
          children={`¿Estás seguro de eliminar el evento "${evento.nombre_evento}"?`}
          btn_left_text="Cancelar"
          btn_left_onClick={() => setShowModal(false)}
          btn_right_text="Eliminar"
          btn_right_onClick={() => deleteMutation.mutate(evento.id)}
          btn_right_className="bg-red-500 hover:bg-red-600"
        />
      )}
    </div>
  );
}
