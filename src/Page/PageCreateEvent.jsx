import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputGeneral from "../Components/Input/InputGeneral";
import TinyEditor from "../Components/Editor/TinyEditor";
import { useMutation } from "@tanstack/react-query";
import { eventUploadImage, eventUpload } from "../Api/Eventos";
import SelectGeneral from "../Components/Input/SelectGeneral";
import { useAtom } from "jotai";
import { user } from "../Context/User";
import Modal from "../Components/Modales/Modal";
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";

export default function PageCreateEvent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [userContext] = useAtom(user);

  const mutationEventUploadImage = useMutation({
    mutationFn: eventUploadImage,
  });

  const mutationEventUpload = useMutation({
    mutationFn: eventUpload,
  });

  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const categorias = [
    "Ocio",
    "Viajes",
    "Shopping",
    "Educación",
    "Salud",
    "Estilo de vida",
  ];
  const ubicacion = [
    "Madrid",
    "Malaga",
    "Valencia",
    "Bacelona",
    "Sevilla",
    "Zaragoza",
    "Otro",
  ];
  const discapacidades = ["Visual", "Auditiva", "Motora", "Ninguna"];
  const modalidades = ["Cubierto", "Al aire libre"];

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const data = await mutationEventUploadImage.mutateAsync(formData);
    return data.location;
  };

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadImage(file);
    console.log(url);
    setMainImageUrl(url);
    setUploading(false);
  };

  const generateSlug = (ubicacion, categoria, nombre) => {
    const normalize = (str) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase();

    return `${normalize(ubicacion)}/${normalize(categoria)}/${normalize(
      nombre
    )}`;
  };

  const onSubmit = async (data) => {
    const slug = generateSlug(
      data.ubicacion,
      data.categoria,
      data.nombre_evento
    );
    const payload = {
      ...data,
      content: htmlContent,
      image: mainImageUrl,
      slug: slug,
      id_user: userContext.id,
    };
    const dataResponse = await mutationEventUpload.mutateAsync(
      JSON.stringify(payload)
    );
    if (dataResponse.message === "Evento guardado") {
      return navigate(0);
    } else {
      alert("Error al guardar el evento");
      return;
    }
  };

  return (
    <div className="mt-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >
      <h2 className="text-2xl font-bold mb-6">Crear nuevo evento</h2>

        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-2 w-full">
            <InputGeneral
              {...register("nombre_evento", { required: true })}
              placeholder="Nombre del evento"
            />
            {errors.nombre_evento && (
              <p className="text-red-500 text-xs">Campo requerido</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <SelectGeneral
              name="ubicacion"
              value={watch("ubicacion")}
              onChange={(e) => setValue("ubicacion", e.target.value)}
              options={ubicacion}
              {...register("ubicacion", { required: true })}
              placeholder="Ciudad"
            />
            {/* {watch("ubicacion") === "Otro" && (
            <InputGeneral
              {...register("Ubicación", { required: true })} 
              type="text"
               placeholder="Escribe el nombre de la ciudad"
            />
          )} */}
            {errors.ubicacion && (
              <p className="text-red-500 text-xs">Campo requerido</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <InputGeneral
              {...register("fecha", { required: true })}
              type="date"
            />
            {errors.fecha && (
              <p className="text-red-500 text-xs">Campo requerido</p>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-2 w-full">
            <SelectGeneral
              name="categoria"
              value={watch("categoria")}
              onChange={(e) => setValue("categoria", e.target.value)}
              options={categorias}
              {...register("categoria", { required: true })}
              placeholder="Categoría"
            />
            {errors.categoria && (
              <p className="text-red-500 text-xs">Campo requerido</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <SelectGeneral
              name="modalidades"
              value={watch("modalidades")}
              onChange={(e) => setValue("modalidades", e.target.value)}
              options={modalidades}
              {...register("modalidades", { required: true })}
              placeholder="Modalidades"
            />
            {errors.modalidades && (
              <p className="text-red-500 text-xs">Campo requerido</p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <SelectGeneral
              name="discapacidad"
              value={watch("discapacidad")}
              onChange={(e) => setValue("discapacidad", e.target.value)}
              options={discapacidades}
              {...register("discapacidad", { required: true })}
              placeholder="Discapacidad"
            />
            {errors.discapacidad && (
              <p className="text-red-500 text-xs">Campo requerido</p>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-2 w-full">
            <InputGeneral
              {...register("integrantes", { required: true })}
              type="number"
              placeholder="Integrantes"
            />
            {errors.integrantes && (
              <p className="text-red-500 text-xs">Campo requerido</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <InputGeneral
              {...register("edades", { required: true })}
              placeholder="Edades"
            />
            {errors.edades && (
              <p className="text-red-500 text-xs">Campo requerido</p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <InputGeneral
              {...register("precio", { required: true })}
              type="text"
              placeholder="Precio (€)"
            />
            {errors.precio && (
              <p className="text-red-500 text-xs">Campo requerido</p>
            )}
          </div>
        </div>

        <label className="text-black font-medium">Imagen destacada:</label>
        <InputGeneral
          type="file"
          accept="image/*"
          onChange={handleMainImageUpload}
        />

        {errors.image && (
          <p className="text-red-500 text-xs">Campo requerido</p>
        )}
        {mainImageUrl && (
          <img src={mainImageUrl} alt="Preview" className="w-60 mt-2 rounded" />
        )}
        {uploading && (
          <p className="text-sm text-gray-500">Subiendo imagen destacada...</p>
        )}

        <label className="text-black font-medium">Contenido del evento:</label>
        <TinyEditor onChange={setHtmlContent} initialValue="" />

        {htmlContent ? (
          <ButtonGeneral type="submit" className="btn btn-primary mt-4" children="Crear Evento"/>
            
        ) : (
                      <ButtonGeneral disabled className="btn btn-primary mt-4" children="Crear Evento"/>

        )}
        
      </form>
    </div>
  );
}
