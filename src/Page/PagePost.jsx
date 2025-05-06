import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useSearchParams } from "react-router";
import { useLocation } from "react-router-dom";
import BannerVertical from "../Components/Banners/BannerVertical";
import BannerHorizontal from "../Components/Banners/BannerHorizontal";
import RelatedNews from "../Components/Blocks/RelatedNews";
import CardVerticalMini from "../Components/Cards/CardVerticalMini";
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";
import CategoryPill from "../Components/CategoryPill";
import EventInfoPills from "../Components/EventInfoPills";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import InputGeneral from "../Components/Input/InputGeneral";
import { getAllEventosUserLast, getEventosSlug } from "../Api/Eventos";
import { suscribirNewsletter } from "../Api/Auth";

const PagePost = () => {
  const { city, category, name } = useParams();
  const postData = {
    title:
      "Este es el título del artículo, es un poco largo para probar el diseño",
    author: "John Smith",
    category: "Categoria",
    breadcrumb: "Inicio / Categoria",
  };

  const {
    data: lastNews,
    isLoading: loadinglastNews,
    error: errrolastNews,
  } = useQuery({
    queryKey: ["lastNews"],
    queryFn: getAllEventosUserLast,
  });

  const {
    data: postPrimary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["primaryNews"],
    queryFn: () => getEventosSlug(city, category, name),
  });

  const [masNoticias, setMasNoticias] = useState(1);

  const bannerInfo = {
    image:
      "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1",
    message: "Titulo Banner",
    onClickButton: () => console.log("Botón del banner pulsado"),
    textButton: "Botón",
  };

  const masUltimasNoticias = Array.isArray(lastNews)
    ? lastNews
        .slice(0, masNoticias * 8)
        .map((event, index) => (
          <CardVerticalMini
            key={index}
            title={event.nombre_evento}
            description={
              event.content.replace(/<[^>]*>?/gm, "").slice(0, 30) + "..."
            }
            link={"/post/" + event.slug}
            image={event.image}
          />
        ))
    : [];

  const mutation = useMutation({
    mutationFn: ({ emailNewsLetter }) =>
      suscribirNewsletter(emailNewsLetter, ""),
    onSuccess: () => {
      alert("¡Ya estás suscrito!");
    },
    onError: () => {
      alert("Error al suscribirse. Inténtalo de nuevo.");
    },
  });
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();

  const fullUrl = window.location.origin + location.pathname;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contenido principal del post */}
        <div className="lg:col-span-8">
          {/* Breadcrumb */}
          <div className="text-sm text-[color:var(--color-secondary)] mb-8 space-x-1">
            <Link
              to={`/ciudades/${city}`}
              className="text-[color:var(--color-secondary)] no-underline hover:font-semibold transition"
            >
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </Link>
            <span>/</span>
            <Link
              to={`/ciudades/${city}/${category}`}
              className="text-[color:var(--color-secondary)] no-underline hover:font-semibold transition"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
            <span>/</span>
            <span className="font-semibold text-[color:var(--color-secondary)]">
              {postPrimary?.post.nombre_evento}
            </span>
          </div>



          {/* Título */}
          <h1 className="text-3xl font-bold text-[color:var(--color-primary)] mb-8">
            {postPrimary?.post.nombre_evento}
          </h1>

          {/* Autor del articulo, categoría y detalles del evento */}
          <div className="flex items-center justify-between text-sm text-neutral-700 mb-4">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2 text-[color:var(--color-secondary)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M2 21a8 8 0 0 1 10.821-7.487m8.557 3.113a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                <circle cx="10" cy="8" r="5" />
              </svg>
              <span>Escrito por {postPrimary?.post.user.name}</span>
            </div>
            <div className="flex items-center gap-2 flex-row-reverse">
              <CategoryPill category={postPrimary?.post.categoria} />
              <EventInfoPills 
                ciudad={city.charAt(0).toUpperCase() + city.slice(1)}
                precio={postPrimary?.post.precio}
                modalidad={postPrimary?.post.modalidad}
                discapacidad={postPrimary?.post.discapacidad}
              />
            </div>
          </div>

          {/* Imagen de portada (obligatoria al hacer el post) */}
          <img
            src={postPrimary?.post.image}
            alt={postPrimary?.post.nombre_evento}
            className="rounded-lg mb-6 w-full object-cover max-h-96"
          />

          {/* Texto de prueba del articulo */}
          <div className="text-base text-neutral-700 leading-relaxed space-y-6">
            <div
              dangerouslySetInnerHTML={{ __html: postPrimary?.post.content }}
              className="prose max-w-none"
            />
          </div>

          {/* Enlaces para compartir la publicacion en redes */}
          <div className="my-10">
            <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-4">
              Compártenos
            </h3>
            <div className="flex space-x-1">
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}"
                target="_blank"
                className="text-[#1877F2] hover:text-[#0d6efd]"
              >
                <svg
                  className="w-7 h-7 transition hover:scale-125"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}"
                target="_blank"
                className="text-[#0e76a8] hover:text-[#0e76a8]"
              >
                <svg
                  className="w-7 h-7 transition hover:scale-125"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </a>

              <a
                href="https://api.whatsapp.com/send?text=${encodeURIComponent(fullUrl)}"
                target="_blank"
                className="text-[#25d366] hover:text-[#25d366]"
              >
                <svg
                  className="w-7 h-7 transition hover:scale-125"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
              </a>
            </div>
          </div>
          <div className="my-10">
            <h2 className="text-3xl font-bold text-[color:var(--color-primary)] mb-4">
              Suscríbete a nuestra Newsletter
            </h2>
            <form
              className="mt-4 space-y-3"
              onSubmit={handleSubmit((data) => mutation.mutate(data))}
            >
              <div className="relative">
                <InputGeneral
                  id={"emailNewsLetter"}
                  name={"emailNewsLetter"}
                  type={"email"}
                  placeholder={"Tu Email"}
                  {...register("emailNewsLetter", { required: true })}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] text-white rounded-lg px-4 py-1 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>

              {/* Casilla para aceptar política de privacidad */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  {...register("privacyPolicy", {
                    required: "Debes aceptar la Política de Privacidad.",
                  })}
                  className="mt-1"
                />
                <label
                  htmlFor="privacyPolicy"
                  className="text-sm text-neutral-700"
                >
                  Acepto la&nbsp;
                  <Link
                    to="/politica-privacidad"
                    className="text-[color:var(--color-primary)] underline hover:opacity-80"
                  >
                    Política de Privacidad
                  </Link>
                </label>
              </div>

              {/* Mensaje de error en rojo */}
              {errors.privacyPolicy && (
                <p className="text-sm text-red-600">
                  {errors.privacyPolicy.message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Lado derecho que sera solo visible para escritorio */}
        <div className="hidden lg:block lg:col-span-4 space-y-8">
          <BannerVertical
            // image={bannerInfo.image}
            // message={bannerInfo.message}
            // onClickButton={bannerInfo.onClickButton}
            // textButton={bannerInfo.textButton}
          />
         {postPrimary?.moreOptions.length !== 0 && <RelatedNews title="Noticias Relacionadas" moreOptions={postPrimary?.moreOptions} /> }
        </div>
      </div>

      <div className="mt-16">
        <hr className="border-t-2 [color:var(--color-primary)] my-8" />

        <div className="mt-10">
          <BannerHorizontal
            // image={bannerInfo.image}
            // message={bannerInfo.message}
            // onClickButton={bannerInfo.onClickButton}
            // textButton={bannerInfo.textButton}
          />
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 text-center col-span-full mb-5">
            Ultimas noticias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {masUltimasNoticias}
            <div className="col-span-full text-center">
              {masNoticias !== 3 && (
                <ButtonGeneral
                  children={"Ver más noticias"}
                  onClick={() => {
                    masNoticias < 3
                      ? setMasNoticias(masNoticias + 1)
                      : alert("No hay más noticias");
                  }}
                  className={"bg-[color:var(--color-primary)] text-white"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagePost;
