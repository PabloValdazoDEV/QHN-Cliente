import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import CardVertical from "../Components/Cards/CardVertical";
import CardVerticalMini from "../Components/Cards/CardVerticalMini";
import BannerVertical from "../Components/Banners/BannerVertical";
import BannerHorizontal from "../Components/Banners/BannerHorizontal";
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";

const PageHome = () => {
  const navigate = useNavigate();
  
  // Estados
  const [masNoticias, setMasNoticias] = useState(1);
  const [ultimoPost, setUltimoPost] = useState(null);
  const [ciudades, setCiudades] = useState([]);

  // Datos de ejemplo para noticias y banners
  const infoNoticias = {
    title: "Titulo",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "/ciudades/madrid",
    image: "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1",
  };

  const infoBannerOcio = {
    image: "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1",
    message: "Titulo Banner",
    onClickButton: () => console.log("Boton del Banner"),
    textButton: "Botón",
  };

  // Datos de ejemplo para ciudades
  const ciudadesEjemplo = [
    {
      nombre: "Madrid",
      imagen: "/images/madrid.jpg",
      descripcion: "Madrid es la capital de España y una de las ciudades más vibrantes de Europa.",
      posts: [
        {
          title: "Evento en Madrid",
          description: "Descripción del evento en Madrid",
          link: "/ciudades/madrid/evento-1",
          image: "/images/madrid.jpg",
        },
        {
          title: "Noticia Madrid",
          description: "Descripción de la noticia en Madrid",
          link: "/ciudades/madrid/noticia-1",
          image: "/images/madrid.jpg",
        },
      ],
    },
    {
      nombre: "Barcelona",
      imagen: "/images/barcelona.jpg",
      descripcion: "Barcelona es conocida por su arquitectura modernista y su vibrante vida cultural.",
      posts: [
        {
          title: "Evento en Barcelona",
          description: "Descripción del evento en Barcelona",
          link: "/ciudades/barcelona/evento-1",
          image: "/images/barcelona.jpg",
        },
        {
          title: "Noticia Barcelona",
          description: "Descripción de la noticia en Barcelona",
          link: "/ciudades/barcelona/noticia-1",
          image: "/images/barcelona.jpg",
        },
      ],
    },
    {
      nombre: "Valencia",
      imagen: "/images/valencia.jpg",
      descripcion: "Valencia es famosa por su Ciudad de las Artes y las Ciencias y sus playas.",
      posts: [
        {
          title: "Evento en Valencia",
          description: "Descripción del evento en Valencia",
          link: "/ciudades/valencia/evento-1",
          image: "/images/valencia.jpg",
        },
        {
          title: "Noticia Valencia",
          description: "Descripción de la noticia en Valencia",
          link: "/ciudades/valencia/noticia-1",
          image: "/images/valencia.jpg",
        },
      ],
    },
    {
      nombre: "Sevilla",
      imagen: "/images/sevilla.jpg",
      descripcion: "Sevilla es conocida por su arquitectura mudéjar y su rica historia.",
      posts: [
        {
          title: "Evento en Sevilla",
          description: "Descripción del evento en Sevilla",
          link: "/ciudades/sevilla/evento-1",
          image: "/images/sevilla.jpg",
        },
        {
          title: "Noticia Sevilla",
          description: "Descripción de la noticia en Sevilla",
          link: "/ciudades/sevilla/noticia-1",
          image: "/images/sevilla.jpg",
        },
      ],
    },
    {
      nombre: "Málaga",
      imagen: "/images/malaga.jpg",
      descripcion: "Málaga es conocida por su clima mediterráneo y su rico patrimonio cultural.",
      posts: [
        {
          title: "Evento en Málaga",
          description: "Descripción del evento en Málaga",
          link: "/ciudades/malaga/evento-1",
          image: "/images/malaga.jpg",
        },
        {
          title: "Noticia Málaga",
          description: "Descripción de la noticia en Málaga",
          link: "/ciudades/malaga/noticia-1",
          image: "/images/malaga.jpg",
        },
      ],
    },
    {
      nombre: "Zaragoza",
      imagen: "/images/zaragoza.jpg",
      descripcion: "Zaragoza es famosa por su Basílica del Pilar y su rica historia romana.",
      posts: [
        {
          title: "Evento en Zaragoza",
          description: "Descripción del evento en Zaragoza",
          link: "/ciudades/zaragoza/evento-1",
          image: "/images/zaragoza.jpg",
        },
        {
          title: "Noticia Zaragoza",
          description: "Descripción de la noticia en Zaragoza",
          link: "/ciudades/zaragoza/noticia-1",
          image: "/images/zaragoza.jpg",
        },
      ],
    },
  ];

  // Generación de noticias
  const noticiasOcios = Array.from({ length: 9 }, (_, i) => 
    i === 0 ? (
      <CardVertical
        key={i}
        title={infoNoticias.title}
        description={infoNoticias.description.slice(0, 100) + "..."}
        link={infoNoticias.link}
        image={infoNoticias.image}
      />
    ) : (
      <CardVerticalMini
        key={i}
        title={infoNoticias.title}
        description={infoNoticias.description.slice(0, 30) + "..."}
        link={infoNoticias.link}
        image={infoNoticias.image}
      />
    )
  );

  const masNoticiasOcios = Array.from({ length: 8 * masNoticias }, (_, i) => (
    <CardVerticalMini
      key={i}
      title={infoNoticias.title}
      description={infoNoticias.description.slice(0, 30) + "..."}
      link={infoNoticias.link}
      image={infoNoticias.image}
    />
  ));

  // Función para obtener un post aleatorio
  const obtenerUltimoPostAleatorio = () => {
    const todosLosPosts = ciudadesEjemplo.flatMap((ciudad) =>
      ciudad.posts.map((post) => ({
        ...post,
        ciudad: ciudad.nombre,
      }))
    );
    return todosLosPosts[Math.floor(Math.random() * todosLosPosts.length)];
  };

  // Efecto para actualizar el último post
  useEffect(() => {
    setUltimoPost(obtenerUltimoPostAleatorio());
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* Encabezado */}
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-5">
        Inicio
      </h2>
      <p className="text-gray-600 text-center mb-5">
        Conoce las noticias más importantes
      </p>

      <div className="flex flex-col gap-10">
        {/* Banner Principal */}
        {ultimoPost && (
          <div className="w-full">
            <BannerHorizontal
              image={ultimoPost.image}
              message={`Última noticia de ${ultimoPost.ciudad}: ${ultimoPost.title}`}
              onClickButton={() => navigate(ultimoPost.link)}
              textButton="Ver más"
            />
          </div>
        )}

        {/* Sección de Noticias y Banner Vertical */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="col-span-1 md:col-span-3">
            {noticiasOcios[0]}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              {noticiasOcios.slice(1, 9)}
            </div>
          </div>
          <div className="col-span-1 relative hidden md:block">
            <div className="sticky top-1/6 w-full">
              <BannerVertical {...infoBannerOcio} />
            </div>
          </div>
        </div>

        {/* Banner Secundario */}
        <div className="w-full">
          <BannerHorizontal {...infoBannerOcio} />
        </div>

        {/* Sección de Ciudades */}
        <div className="flex flex-col gap-8">
          <h3 className="text-2xl font-bold text-gray-800 text-center">
            Nuestras Ciudades
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ciudadesEjemplo.map((ciudad, index) => (
              <Link
                key={index}
                to={`/ciudades/${ciudad.nombre.toLowerCase().replace(/\s+/g, '-')}`}
                className="block no-underline"
              >
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full transform hover:-translate-y-1 hover:scale-[1.02] flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={ciudad.imagen}
                      alt={ciudad.nombre}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="text-xl font-semibold mb-2">
                      {ciudad.nombre}
                    </h4>
                    <p className="text-gray-600 mb-4 transition-colors duration-300 hover:text-gray-800">
                      {ciudad.descripcion}
                    </p>

                    <div className="border-t pt-4 flex flex-col flex-grow">
                      <h5 className="font-medium mb-2">Noticias recientes:</h5>
                      <div className="space-y-3 flex-grow">
                        {ciudad.posts.map((post, postIndex) => (
                          <div
                            key={postIndex}
                            className="border-b pb-2 last:border-b-0 transition-colors duration-300 hover:bg-gray-50 rounded"
                          >
                            <div className="p-2 rounded">
                              <h6 className="font-medium text-blue-600">
                                {post.title}
                              </h6>
                              <p className="text-sm text-gray-500 transition-colors duration-300 hover:text-gray-700">
                                {post.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <ButtonGeneral
                          children={"Ver más noticias"}
                          onClick={() => navigate(`/ciudades/${ciudad.nombre.toLowerCase()}`)}
                          className={"bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 w-full py-2 px-4 rounded-md"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Banner Secundario Final */}
      <div className="w-full mt-10">
        <BannerHorizontal {...infoBannerOcio} />
      </div>

      <div className="mt-6">
        <ButtonGeneral
          children={"Ver post"}
          onClick={() => navigate("/post/mi-primer-post")}
          className={"bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"}
        />
      </div>
    </div>
  );
};

export default PageHome;
