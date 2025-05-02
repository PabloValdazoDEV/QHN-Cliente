import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteEvent,
  getAllEventos,
  updateEventVerified,
  getAllEventosCollaborator
} from "../Api/Eventos";
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";
import { useNavigate } from "react-router";
import { useState } from "react";
import Modal from "../Components/Modales/Modal";
import InputToggle from "../Components/Input/InputToggle";

const PageDashBoardEventos = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(null);
  const navegate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["allEventos"],
    queryFn: getAllEventos,
  });

  const deteleMutation = useMutation({
    mutationFn: async (id) => {
      await deleteEvent(id);
      setShowModal(null);
      queryClient.invalidateQueries({ queryKey: ["allEventos"] });
    },
  });
  const verifiedMutation = useMutation({
    mutationFn: async (data) => {
      await updateEventVerified(data);
      queryClient.invalidateQueries({ queryKey: ["allEventos"] });
    },
  });

  return (
    <>
      <h1>Page Dash Board Eventos</h1>
      {isLoading && <h1>Cargando</h1>}
      {error && <h1>error</h1>}
      {data && (
        <div>
          {data.map((evento) => {
            return (
              <div key={evento.id}>
                <p>{evento.id}</p>
                <p>{evento.nombre_evento}</p>
                <ButtonGeneral
                  children="Editar Post"
                  onClick={() => {
                    navegate(`/dashboard/evento/${evento.id}`);
                  }}
                />
                <ButtonGeneral
                  children="Borrar Post"
                  onClick={() => {
                    setShowModal(evento.id);
                  }}
                />
                <InputToggle
                  checked={evento.verified}
                  onChange={(e) => {
                    verifiedMutation.mutate({id:evento.id, verified: e.target.checked});
                  }}
                />
                <p className="mt-2">
                  Valor: {evento.verified ? "Activado" : "Desactivado"}
                </p>
              </div>
            );
          })}
        </div>
      )}
      {showModal && (
        <Modal
          children={"Se eliminará el Evento"}
          btn_left_onClick={() => setShowModal(null)}
          btn_right_onClick={() => deteleMutation.mutate(showModal)}
          btn_right_className="hover:bg-red-600"
        />
      )}
    </>
  );
};

export default PageDashBoardEventos;
