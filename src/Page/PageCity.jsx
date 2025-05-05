import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import CardVertical from "../Components/Cards/CardVertical";
import CardVerticalMini from "../Components/Cards/CardVerticalMini";
import BannerVertical from "../Components/Banners/BannerVertical";
import BannerHorizontal from "../Components/Banners/BannerHorizontal";
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";
import CategoryPill from "../Components/CategoryPill";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getEventosPorCiudad } from "../Api/Eventos";


const PageCity = () => {
  // Hooks
  const navigate = useNavigate();
  const { city } = useParams();

  // Estados
  const [masNoticias, setMasNoticias] = useState(1);
  const [ultimoPost, setUltimoPost] = useState(null);
  const [ciudades, setCiudades] = useState([]);

  // Efecto para reiniciar el scroll al inicio de la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [city]);


  const {
    data: eventos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["eventosCiudad", city],
    queryFn: () => getEventosPorCiudad(city),
  });
  
  console.log("Eventos recibidos:", eventos);


  const [userPreferences, setUserPreferences] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("recommendation_data");
    if (stored) {
      setUserPreferences(JSON.parse(stored));
    }
  }, []);

  const infoBannerOcio = {
    image: "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1",
    message: "Titulo Banner",
    onClickButton: () => {
      console.log("Boton del Banner");
    },
    textButton: "Botón",
  };

  const safeNoticias = Array.isArray(eventos) ? eventos : [];


  // Generación de noticias
  const noticiasOcios = safeNoticias.map((noticia, index) =>
    index === 0 ? (
      <CardVertical
        key={index}
        title={noticia.nombre_evento}
        description={noticia.content.replace(/<[^>]*>?/gm, "").slice(0, 100) + "..."}
        link={"/post/" + noticia.slug}
        image={noticia.image}
      />
    ) : (
      <CardVerticalMini
        key={index}
        title={noticia.nombre_evento}
        description={noticia.content.replace(/<[^>]*>?/gm, "").slice(0, 30) + "..."}
        link={"/post/" + noticia.slug}
        image={noticia.image}
      />
    )
  );
  
  const obtenerPostCiudad = () => {
    const ciudadActual = safeNoticias.find((evento) =>
      evento.slug.toLowerCase().includes(city.toLowerCase())
    );

    return ciudadActual
      ? {
          ...ciudadActual,
          ciudad: city,
          title: ciudadActual.nombre_evento,
          link: `/post/${ciudadActual.slug}`,
        }
      : null;
  };

  useEffect(() => {
    setUltimoPost(obtenerPostCiudad());
  }, [city]);

  const categoriasAgrupadas = safeNoticias.reduce((acc, evento) => {
    if (!acc[evento.categoria]) acc[evento.categoria] = [];
    acc[evento.categoria].push(evento);
    return acc;
  }, {});

  return (
    <div>
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {city ? city.charAt(0).toUpperCase() + city.slice(1) : "Inicio"}
        </h2>
        <p className="text-gray-600">
          {city
            ? `Descubre las últimas noticias y eventos en ${city.charAt(0).toUpperCase() + city.slice(1)}`
            : "Conoce las noticias más importantes"}
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {/* Banner Principal */}
        <div className="w-full">
          <BannerHorizontal
            image={infoBannerOcio.image}
            message={infoBannerOcio.message}
            onClickButton={infoBannerOcio.onClickButton}
            textButton={infoBannerOcio.textButton}
          />
        </div>

        {/* Sección de Noticias y Banner Vertical */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="col-span-1 md:col-span-3">
            {noticiasOcios[0]}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              {noticiasOcios.slice(1, 9).map((card) => card)}
            </div>

          </div>

          <div className="col-span-1 relative hidden md:block">
            <div className="sticky top-1/6 w-full">
              <BannerVertical
                image={infoBannerOcio.image}
                message={infoBannerOcio.message}
                onClickButton={infoBannerOcio.onClickButton}
                textButton={infoBannerOcio.textButton}
              />
            </div>
          </div>
        </div>

        {/* Banner Secundario */}
        <div className="w-full">
          <BannerHorizontal
            image={infoBannerOcio.image}
            message={infoBannerOcio.message}
            onClickButton={infoBannerOcio.onClickButton}
            textButton={infoBannerOcio.textButton}
          />
        </div>

        {/* Sección de Ciudades */}
        <div className="flex flex-col gap-8">
          <h3 className="text-2xl font-bold text-gray-800 text-center">
            Categorías
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {Object.entries(categoriasAgrupadas).map(([categoria, posts], index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full transform hover:-translate-y-1 hover:scale-[1.02] flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={posts[0].image}
                    alt={categoria}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-semibold">{categoria}</h4>
                    <CategoryPill category={categoria} />
                  </div>
                  <p className="text-gray-600 mb-4">Explora noticias relacionadas.</p>

                  <div className="border-t pt-4 flex flex-col flex-grow">
                    <h5 className="font-medium mb-2">Noticias recientes:</h5>
                    <div className="space-y-3 flex-grow">
                      {posts.slice(0, 3).map((post, postIndex) => (
                        <div
                          key={postIndex}
                          className="border-b pb-2 last:border-b-0 transition-colors duration-300 hover:bg-gray-50 rounded"
                        >
                          <div className="p-2 rounded">
                            <h6 className="font-medium text-blue-600">{post.nombre_evento}</h6>
                            <p className="text-sm text-gray-500">
                              {post.content.replace(/<[^>]*>?/gm, "").slice(0, 60)}...
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                    <ButtonGeneral
                      children={"Ver más noticias"}
                      onClick={() =>
                        navigate(`/ciudades/${city}/${categoria.toLowerCase().replace(/\s+/g, "-")}`)
                      }
                    />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full mt-10">
        <BannerHorizontal {...infoBannerOcio} />
      </div>
    </div>
  );
};

export default PageCity;
