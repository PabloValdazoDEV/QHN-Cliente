import React, { useState, useEffect } from "react";
import CardVertical from "../Components/Cards/CardVertical";
import BannerVertical from "../Components/Banners/BannerVertical";
import CardVerticalMini from "../Components/Cards/CardVerticalMini";
import BannerHorizontal from "../Components/Banners/BannerHorizontal";
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";

const PageHome = () => {
  // Estados
  const [masNoticias, setMasNoticias] = useState(1);
  const [ultimoPost, setUltimoPost] = useState(null);
  const [ciudades, setCiudades] = useState([]);

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
      nombre: "Madrid",
      imagen: "/images/madrid.jpg",
      descripcion: "Madrid es la capital de España y una de las ciudades más vibrantes de Europa.",
      posts: [
        {
          title: "Evento en Madrid",
          description: "Descripción del evento en Madrid",
          link: "/ciudades/madrid/evento-1",
          image: "/images/madrid.jpg"
        },
        {
          title: "Noticia Madrid",
          description: "Descripción de la noticia en Madrid",
          link: "/ciudades/madrid/noticia-1",
          image: "/images/madrid.jpg"
        }
      ]
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
          image: "/images/barcelona.jpg"
        },
        {
          title: "Noticia Barcelona",
          description: "Descripción de la noticia en Barcelona",
          link: "/ciudades/barcelona/noticia-1",
          image: "/images/barcelona.jpg"
        }
      ]
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
          image: "/images/valencia.jpg"
        },
        {
          title: "Noticia Valencia",
          description: "Descripción de la noticia en Valencia",
          link: "/ciudades/valencia/noticia-1",
          image: "/images/valencia.jpg"
        }
      ]
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
          image: "/images/sevilla.jpg"
        },
        {
          title: "Noticia Sevilla",
          description: "Descripción de la noticia en Sevilla",
          link: "/ciudades/sevilla/noticia-1",
          image: "/images/sevilla.jpg"
        }
      ]
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
          image: "/images/malaga.jpg"
        },
        {
          title: "Noticia Málaga",
          description: "Descripción de la noticia en Málaga",
          link: "/ciudades/malaga/noticia-1",
          image: "/images/malaga.jpg"
        }
      ]
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
          image: "/images/zaragoza.jpg"
        },
        {
          title: "Noticia Zaragoza",
          description: "Descripción de la noticia en Zaragoza",
          link: "/ciudades/zaragoza/noticia-1",
          image: "/images/zaragoza.jpg"
        }
      ]
    }
  ];

  // Función para obtener un post aleatorio
  const obtenerUltimoPostAleatorio = () => {
    const todosLosPosts = ciudadesEjemplo.flatMap(ciudad => 
      ciudad.posts.map(post => ({
        ...post,
        ciudad: ciudad.nombre
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
              onClickButton={() => window.location.href = ultimoPost.link}
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

        {/* Sección de Más Noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <h3 className="text-2xl font-bold text-gray-800 text-center col-span-full">
            Más noticias
          </h3>
          {masNoticiasOcios.map((card) => card)}
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

        {/* Sección de Ciudades */}
        <div className="flex flex-col gap-8">
          <h3 className="text-2xl font-bold text-gray-800 text-center">
            Nuestras Ciudades
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ciudadesEjemplo.map((ciudad, index) => (
              <a 
                key={index} 
                href={`/ciudades/${ciudad.nombre.toLowerCase()}`}
                className="block"
              >
                <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={ciudad.imagen} 
                      alt={ciudad.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h4 className="text-xl font-semibold mb-2">{ciudad.nombre}</h4>
                    <p className="text-gray-600 mb-4">{ciudad.descripcion}</p>
                    
                    <div className="border-t pt-4">
                      <h5 className="font-medium mb-2">Noticias recientes:</h5>
                      <div className="space-y-3">
                        {ciudad.posts.map((post, postIndex) => (
                          <div key={postIndex} className="border-b pb-2 last:border-b-0">
                            <div className="p-2 rounded">
                              <h6 className="font-medium text-blue-600">{post.title}</h6>
                              <p className="text-sm text-gray-500">{post.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHome;
