import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import CardVertical from "../Components/Cards/CardVertical";
import CardVerticalMini from "../Components/Cards/CardVerticalMini";
import BannerVertical from "../Components/Banners/BannerVertical";
import BannerHorizontal from "../Components/Banners/BannerHorizontal";
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";
import CategoryPill from "../Components/CategoryPill";

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

  // Datos de ejemplo para noticias y banners
  const infoNoticias = [
    {
      title: "Titulo",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      link: "/ciudades/madrid",
      image: "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1",
    },
  ];

  const infoMasNoticias = [
    {
      title: "Titulo",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      link: "/ciudades/madrid",
      image: "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1",
    },
  ];

  const infoBannerOcio = {
    image: "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1",
    message: "Titulo Banner",
    onClickButton: () => {
      console.log("Boton del Banner");
    },
    textButton: "Botón",
  };

  // Generación de noticias
  const noticiasOcios = [];
  const masNoticiasOcios = [];

  for (let i = 0; i < 9; i++) {
    noticiasOcios.push(
      i === 0 ? (
        <CardVertical
          key={i}
          title={infoNoticias[0].title}
          description={infoNoticias[0].description.slice(0, 100) + "..."}
          link={infoNoticias[0].link}
          image={infoNoticias[0].image}
        />
      ) : (
        <CardVerticalMini
          key={i}
          title={infoNoticias[0].title}
          description={infoNoticias[0].description.slice(0, 30) + "..."}
          link={infoNoticias[0].link}
          image={infoNoticias[0].image}
        />
      )
    );
  }

  for (let i = 0; i < 8 * masNoticias; i++) {
    masNoticiasOcios.push(
      <CardVerticalMini
        key={i}
        title={infoMasNoticias[0].title}
        description={infoMasNoticias[0].description.slice(0, 30) + "..."}
        link={infoMasNoticias[0].link}
        image={infoMasNoticias[0].image}
      />
    );
  }

  // Datos de ejemplo para ciudades
  const ciudadesEjemplo = [
    {
      nombre: "Ocio",
      imagen: "/images/ocio.jpg",
      descripcion: "Encuentra el momento perfecto para disfrutar con tus seres queridos.",
      posts: [
        {
          title: "Ocio Visual",
          description: "Actividades adaptadas para condiciones visuales",
          link: "/categoria/ocio/visual",
          image: "/images/ocio.jpg",
        },
        {
          title: "Ocio Auditivo",
          description: "Actividades adaptadas para condiciones auditivas",
          link: "/categoria/ocio/auditivo",
          image: "/images/ocio.jpg",
        },
        {
          title: "Ocio Motor",
          description: "Actividades adaptadas para condiciones motoras",
          link: "/categoria/ocio/motor",
          image: "/images/ocio.jpg",
        },
      ],
    },
    {
      nombre: "Viajes",
      imagen: "/images/viaje.jpg",
      descripcion: "Visita los lugares más asombrosos del mundo.",
      posts: [
        {
          title: "Viajes Visual",
          description: "Viajes y tours adaptados para condiciones visuales",
          link: "/categoria/viajes/visual",
          image: "/images/viaje.jpg",
        },
        {
          title: "Viajes Auditivo",
          description: "Viajes y tours adaptados para condiciones auditivas",
          link: "/categoria/viajes/auditivo",
          image: "/images/viaje.jpg",
        },
        {
          title: "Viajes Motor",
          description: "Viajes y tours adaptados para condiciones motoras",
          link: "/categoria/viajes/motor",
          image: "/images/viaje.jpg",
        },
      ],
    },
    {
      nombre: "Shopping",
      imagen: "/images/shopping.jpg",
      descripcion: "Encuentra los mejores productos para tu familia.",
      posts: [
        {
          title: "Shopping Visual",
          description: "Tiendas y eventos adaptados para condiciones visuales",
          link: "/categoria/shopping/visual",
          image: "/images/shopping.jpg",
        },
        {
          title: "Shopping Auditivo",
          description: "Tiendas y eventos adaptados para condiciones auditivas",
          link: "/categoria/shopping/auditivo",
          image: "/images/shopping.jpg",
        },
        {
          title: "Shopping Motor",
          description: "Tiendas y eventos adaptados para condiciones motoras",
          link: "/categoria/shopping/motor",
          image: "/images/shopping.jpg",
        },
      ],
    },
    {
      nombre: "Educación",
      imagen: "/images/educacion.jpg",
      descripcion: "Disfruta de los momentos más importantes de tu vida con tu familia.",
      posts: [
        {
          title: "Educación Visual",
          description: "Programas educativos para condiciones visuales",
          link: "/categoria/educacion/visual",
          image: "/images/educacion.jpg",
        },
        {
          title: "Educación Auditiva",
          description: "Programas educativos para condiciones auditivas",
          link: "/categoria/educacion/auditiva",
          image: "/images/educacion.jpg",
        },
        {
          title: "Educación Motora",
          description: "Programas educativos para condiciones motoras",
          link: "/categoria/educacion/motora",
          image: "/images/educacion.jpg",
        },
      ],
    },
    {
      nombre: "Salud",
      imagen: "/images/salud.jpg",
      descripcion: "Mantente en forma y disfruta de la vida.",
      posts: [
        {
          title: "Salud Visual",
          description: "Programas de salud para condiciones visuales",
          link: "/categoria/salud/visual",
          image: "/images/salud.jpg",
        },
        {
          title: "Salud Auditiva",
          description: "Programas de salud para condiciones auditivas",
          link: "/categoria/salud/auditiva",
          image: "/images/salud.jpg",
        },
        {
          title: "Salud Motora",
          description: "Programas de salud para condiciones motoras",
          link: "/categoria/salud/motora",
          image: "/images/salud.jpg",
        },
      ],
    },
    {
      nombre: "Estilo de vida",
      imagen: "/images/estilodevida.jpg",
      descripcion: "Disfruta de la vida y crea momentos inolvidables.",
      posts: [
        {
          title: "Estilo de vida Visual",
          description: "Programas adaptados para condiciones visuales",
          link: "/categoria/estilodevida/visual",
          image: "/images/estilodevida.jpg",
        },
        {
          title: "Estilo de vida Auditivo",
          description: "Programas adaptados para condiciones auditivas",
          link: "/categoria/estilodevida/auditivo",
          image: "/images/estilodevida.jpg",
        },
        {
          title: "Estilo de vida Motor",
          description: "Programas adaptados para condiciones motoras",
          link: "/categoria/estilodevida/motor",
          image: "/images/estilodevida.jpg",
        },
      ],
    },
  ];

  // Función para obtener el post de la ciudad actual
  const obtenerPostCiudad = () => {
    const ciudadActual = ciudadesEjemplo.find(
      (c) => c.nombre.toLowerCase() === city.toLowerCase()
    );
    if (ciudadActual && ciudadActual.posts.length > 0) {
      return {
        ...ciudadActual.posts[0],
        ciudad: ciudadActual.nombre
      };
    }
    return null;
  };

  // Efecto para actualizar el último post
  useEffect(() => {
    setUltimoPost(obtenerPostCiudad());
  }, [city]);

  return (
    <div>
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {city ? city.charAt(0).toUpperCase() + city.slice(1) : "Inicio"}
        </h2>
        <p className="text-gray-600">
          {city ? `Descubre las últimas noticias y eventos en ${city.charAt(0).toUpperCase() + city.slice(1)}` : "Conoce las noticias más importantes"}
        </p>
      </div>

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
            Categorias
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {ciudadesEjemplo.map((ciudad, index) => (
              <Link
                key={index}
                to={`/categorias/${ciudad.nombre.toLowerCase().replace(/\s+/g, "-")}`}
                className="block no-underline"
                onClick={() => window.scrollTo(0, 0)}
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
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-semibold">{ciudad.nombre}</h4>
                      <CategoryPill category={ciudad.nombre} />
                    </div>
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
                              <h6 className="font-medium text-blue-600">{post.title}</h6>
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
                          onClick={() => {
                            window.scrollTo(0, 0);
                            navigate(`/categorias/${ciudad.nombre.toLowerCase().replace(/\s+/g, "-")}`);
                          }}
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
        <BannerHorizontal
          image={infoBannerOcio.image}
          message={infoBannerOcio.message}
          onClickButton={infoBannerOcio.onClickButton}
          textButton={infoBannerOcio.textButton}
        />
      </div>
  
    </div>
  );
};

export default PageCity;
