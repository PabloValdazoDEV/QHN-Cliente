import { useNavigate } from "react-router";

// Componentes principales
import CardVertical from "../Components/Cards/CardVertical";
import CardHorizontal from "../Components/Cards/CardHorizontal";
import SectionNews from "../Components/Blocks/SectionNews";

// Banners
import BannerVertical from "../Components/Banners/BannerVertical";
import BannerHorizontal from "../Components/Banners/BannerHorizontal";

// Botones
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";

// Input
import InputGeneral from "../Components/Input/InputGeneral";

const PageHome = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col gap-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Home</h2>
      <p className="text-gray-600 mb-4">Esta es la página principal.</p>
      <CardVertical
        title={"Titulo"}
        description={"vjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgv"}
        link={"/ciudades/madrid"}
        image={
          "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1"
        }
      />
      <CardHorizontal
        title={"Titulo"}
        description={"vvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgvvjurbnv 9uwg v8wg vgwgv"}
        link={"/ciudades/madrid"}
        image={
          "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1"
        }
      />
      <SectionNews />
      <BannerVertical
        image={
          "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1"
        }
        message={"Banner Vertical"}
        onClickButton={() => {
          console.log("Banner Vertical");
        }}
        textButton={"Botón"}
      />
      <BannerHorizontal
        image={
          "https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?p=1"
        }
        message={"Banner Horizontal"}
        onClickButton={() => {
          console.log("Banner Horizontal");
        }}
        textButton={"Botón"}
      />
      <div>

      <ButtonGeneral
        children={"hola"}
        onClick={() => {
          console.log("Button");
        }}
        className={"bg-blue-500 text-white"}
        />
        </div>
              <div>

      <InputGeneral
        type={"text"}
        onClick={() => {
          console.log("Button");
        }}
        className={"bg-blue-500 text-white"}
        />
        </div>
    </div>
  );
};

export default PageHome;
