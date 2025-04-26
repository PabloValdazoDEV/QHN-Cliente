import React, { useState } from "react";
import { useParams } from "react-router";
import CardVertical from "../Components/Cards/CardVertical";
import BannerVertical from "../Components/Banners/BannerVertical";
import CardVerticalMini from "../Components/Cards/CardVerticalMini";
import BannerHorizontal from "../Components/Banners/BannerHorizontal";
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";

const PageCategory = () => {
  const { category } = useParams();

  const [masNoticias, setMasNoticias] = useState(1)

  const infoNoticias = [
    {
      title: "Titulo",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      link: "/ciudades/madrid",
      image:
        "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1",
    },
  ];

  const infoMasNoticias = [
    {
      title: "Titulo",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      link: "/ciudades/madrid",
      image:
        "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1",
    },
  ];

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

  for (let i = 0; i < 9; i++) {
    //Se tendría que cambiar esto infoNoticias[0] por infoNoticias[i]
    noticiasOcios.push(
      i === 0 ? (
        //Esta es la Noticia principal
        <CardVertical
          key={i}
          title={infoNoticias[0].title}
          description={infoNoticias[0].description.slice(0, 100) + "..."}
          link={infoNoticias[0].link}
          image={infoNoticias[0].image}
        />
      ) : (
        //Estas son las Noticias secundarias
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
  for (let i = 0; i < (8 * masNoticias); i++) {
    //Se tendría que cambiar esto infoMasNoticias[0] por infoMasNoticias[i]
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

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-5">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
      <p className="text-gray-600 text-center mb-5">
        Conoce las noticias de {category} más importantes
      </p>
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="col-span-1 md:col-span-2">
            {noticiasOcios[0]}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              {noticiasOcios.slice(1, 10).map((card) => card)}
            </div>
          </div>
          <div className="col-span-1 relative hidden md:block">
            <div className="sticky top-1/6 ">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
          <h3 className="text-2xl font-bold text-gray-800 text-center col-span-full">
            Más noticias de {category}
          </h3>
          {masNoticiasOcios.map((card) => card)}
          <div className="col-span-full text-center">
            <ButtonGeneral
              children={"Ver màs noticias"}
              onClick={() => {
                masNoticias < 3 ? setMasNoticias(masNoticias + 1): alert("No hay más noticas")
              }}
              className={"bg-[color:var(--color-primary)] text-white"}
            />
          </div>
        </div>
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

export default PageCategory;
