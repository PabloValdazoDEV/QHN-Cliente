import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import CardVertical from "../Components/Cards/CardVertical";
import BannerVertical from "../Components/Banners/BannerVertical";
import CardVerticalMini from "../Components/Cards/CardVerticalMini";
import BannerHorizontal from "../Components/Banners/BannerHorizontal";
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";
import CategoryPill from "../Components/CategoryPill";
import { getEventosPorCiudadYCategoria } from "../Api/Eventos";

const PageCityCategory = () => {
  const { city, category } = useParams();

  const [eventos, setEventos] = useState([]);
  const [masNoticias, setMasNoticias] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const data = await getEventosPorCiudadYCategoria(city, category);
        setEventos(data);
      } catch (error) {
        console.error("Error cargando eventos:", error);
      }
    };
    fetchData();
  }, [city, category]);

  const infoBannerOcio = {
    image:
      "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1",
    message: "Titulo Banner",
    onClickButton: () => {
      console.log("Boton del Banner");
    },
    textButton: "Botón",
  };

  const noticiasOcios = [];
  const masNoticiasOcios = [];

  for (let i = 0; i < Math.min(9, eventos.length); i++) {
    const noticia = eventos[i];
    noticiasOcios.push(
      i === 0 ? (
        <CardVertical
          key={i}
          title={noticia.nombre_evento}
          description={noticia.content.replace(/<[^>]*>?/gm, "").slice(0, 100) + "..."}
          link={`/post/${noticia.slug}`}
          image={noticia.image}
        />
      ) : (
        <CardVerticalMini
          key={i}
          title={noticia.nombre_evento}
          description={noticia.content.replace(/<[^>]*>?/gm, "").slice(0, 30) + "..."}
          link={`/post/${noticia.slug}`}
          image={noticia.image}
        />
      )
    );
  }

  for (let i = 9; i < Math.min(eventos.length, 9 + 8 * masNoticias); i++) {
    const noticia = eventos[i];
    masNoticiasOcios.push(
      <CardVerticalMini
        key={i}
        title={noticia.nombre_evento}
        description={noticia.content.replace(/<[^>]*>?/gm, "").slice(0, 30) + "..."}
        link={`/post/${noticia.slug}`}
        image={noticia.image}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-gray-800">
          {category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")} en {city.charAt(0).toUpperCase() + city.slice(1)}
        </h2>
        <CategoryPill category={category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")} />
      </div>
      <p className="text-gray-600 text-center mb-5">
        Conoce las noticias de {category} más importantes en {city}
      </p>
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="col-span-1 md:col-span-3">
            {noticiasOcios[0]}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              {noticiasOcios.slice(1)}
            </div>
          </div>
          <div className="col-span-1 relative hidden md:block">
            <div className="sticky top-1/6 ">
              <BannerVertical
                // image={infoBannerOcio.image}
                // message={infoBannerOcio.message}
                // onClickButton={infoBannerOcio.onClickButton}
                // textButton={infoBannerOcio.textButton}
              />
            </div>
          </div>
        </div>
        {masNoticiasOcios.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
            <h3 className="text-2xl font-bold text-gray-800 text-center col-span-full">
              Más noticias de {category} en {city}
            </h3>
            {masNoticiasOcios}
            <div className="col-span-full text-center">
              <ButtonGeneral
                children={"Ver más noticias"}
                onClick={() => {
                  masNoticias < 3 ? setMasNoticias(masNoticias + 1) : alert("No hay más noticias");
                }}
                className={"bg-[color:var(--color-primary)] text-white"}
              />
            </div>
          </div>
        )}
        <BannerHorizontal
          // image={infoBannerOcio.image}
          // message={infoBannerOcio.message}
          // onClickButton={infoBannerOcio.onClickButton}
          // textButton={infoBannerOcio.textButton}
        />
      </div>
    </div>
  );
};

export default PageCityCategory;
