import React, { useState } from "react";
import { useParams } from "react-router";
import CardVertical from "../Components/Cards/CardVertical";
import BannerVertical from "../Components/Banners/BannerVertical";
import CardVerticalMini from "../Components/Cards/CardVerticalMini";
import BannerHorizontal from "../Components/Banners/BannerHorizontal";
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";
import CategoryPill from "../Components/CategoryPill";
import { useQuery } from "@tanstack/react-query";
import { getAllEventosUser } from "../Api/Eventos";

const PageCategory = () => {
  const { category } = useParams();
  const [masNoticias, setMasNoticias] = useState(1);

  const {
    data: eventPrimary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allEventUser", category],
    queryFn: () => getAllEventosUser(category),
  });

  const infoBannerOcio = {
    image:
      "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1",
    message: "Titulo Banner",
    onClickButton: () => {
      console.log("Boton del Banner");
    },
    textButton: "Botón",
  };

  // Generación de noticias filtradas por categoría
  const noticias = Array.isArray(eventPrimary)
    ? eventPrimary
        .filter(event => event.categoria.toLowerCase() === category.toLowerCase())
        .map((event, index) =>
          index === 0 ? (
            <CardVertical
              key={index}
              title={event.nombre_evento}
              description={event.content.replace(/<[^>]*>?/gm, '').slice(0, 100) + "..."}
              link={"post/" + event.slug}
              image={event.image}
            />
          ) : (
            <CardVerticalMini
              key={index}
              title={event.nombre_evento}
              description={event.content.replace(/<[^>]*>?/gm, '').slice(0, 30) + "..."}
              link={"post/" + event.slug}
              image={event.image}
            />
          )
        )
    : [];

  // Noticias adicionales para el botón "Ver más"
  const masNoticiasOcios = Array.isArray(eventPrimary)
    ? eventPrimary
        .filter(event => event.categoria.toLowerCase() === category.toLowerCase())
        .slice(0, masNoticias * 8)
        .map((event, index) => (
          <CardVerticalMini
            key={index}
            title={event.nombre_evento}
            description={event.content.replace(/<[^>]*>?/gm, '').slice(0, 30) + "..."}
            link={"post/" + event.slug}
            image={event.image}
          />
        ))
    : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <CategoryPill category={category.charAt(0).toUpperCase() + category.slice(1)} />
        </div>
      </div>
      <p className="text-gray-600 text-center mb-5">
        Conoce las noticias de {category} más importantes
      </p>

      {isLoading ? (
        <div className="text-center">Cargando noticias...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error al cargar las noticias</div>
      ) : noticias.length === 0 ? (
        <div className="text-center">No hay noticias disponibles en esta categoría</div>
      ) : (
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="col-span-1 md:col-span-3">
              {noticias[0]}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                {noticias.slice(1, 9).map((card) => card)}
              </div>
            </div>
            <div className="col-span-1 relative hidden md:block">
              <div className="sticky top-1/6">
                <BannerVertical
                  image={infoBannerOcio.image}
                  message={infoBannerOcio.message}
                  onClickButton={infoBannerOcio.onClickButton}
                  textButton={infoBannerOcio.textButton}
                />
              </div>
            </div>
          </div>
          <BannerHorizontal
            image={infoBannerOcio.image}
            message={infoBannerOcio.message}
            onClickButton={infoBannerOcio.onClickButton}
            textButton={infoBannerOcio.textButton}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <h3 className="text-2xl font-bold text-gray-800 text-center col-span-full">
              Más noticias de {category}
            </h3>
            {masNoticiasOcios.map((card) => card)}
            <div className="col-span-full text-center">
              {masNoticiasOcios.length > 0 && (
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
          <BannerHorizontal
            image={infoBannerOcio.image}
            message={infoBannerOcio.message}
            onClickButton={infoBannerOcio.onClickButton}
            textButton={infoBannerOcio.textButton}
          />
        </div>
      )}
    </div>
  );
};

export default PageCategory;
