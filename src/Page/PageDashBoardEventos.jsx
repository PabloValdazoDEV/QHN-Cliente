import { useMutation } from "@tanstack/react-query";
import { getAllEventos, getAllEventosCollaborator } from "../Api/Eventos";
import EventoRow from "../Components/Table/EventRow";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputGeneral from "../Components/Input/InputGeneral";
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";
import { useAtom } from "jotai";
import { user } from "../Context/User";

const PageDashBoardEventos = () => {
  const navigate = useNavigate();
  const [userContext] = useAtom(user);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const { register, handleSubmit, reset } = useForm();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("evento") || ""
  );

  const {
    mutate,
    data: dataMutation,
    isLoading,
  } = useMutation({
    mutationFn: (params) => {
      if (userContext.role == "ADMIN") {
        return getAllEventos(params);
      }else{
        return getAllEventosCollaborator(userContext.id, params)
      }
    },
  });

  // Fetch on initial load and page change
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

  const eventos = dataMutation?.eventos || [];
  const total = dataMutation?.total || 0;
  const totalPages = Math.ceil(total / 10);

  return (
    <>
      <ButtonGeneral
          className="bg-gray-500 hover:bg-gray-600 mb-5"
            children="Volver"
            onClick={() => {
              navigate("/dashboard");
            }}
          />
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        Page Dash Board Eventos
      </h1>

      <form
        onSubmit={handleSubmit(search)}
        className="flex flex-row gap-4 mb-6 items-center"
      >
        <InputGeneral
          placeholder="Buscar por nombre del evento..."
          {...register("nombre_evento")}
        />
        <ButtonGeneral children="Buscar" type="submit" />
        <ButtonGeneral children="Limpiar" onClick={clearSearch} />
      </form>

      {isLoading && <p>Cargando eventos...</p>}

      {!isLoading && eventos.length === 0 && (
        <p className="text-gray-600">No se encontraron eventos.</p>
      )}

      {!isLoading && eventos.length > 0 && (
        <div className="space-y-4">
          {eventos.map((evento) => (
            <EventoRow key={evento.id} evento={evento} refetch={refetchData} />
          ))}

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
        </div>
      )}
    </>
  );
};

export default PageDashBoardEventos;
