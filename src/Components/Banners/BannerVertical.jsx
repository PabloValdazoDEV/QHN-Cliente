import ButtonBanner from "../Buttons/ButtonBanner";
import banner from "./Banner.json";

export default function BannerVertical({
  image = banner[1].image, // Puedes ajustar el índice según el banner vertical deseado
  message,
  onClickButton,
  textButton,
}) {
  return (
    <a
      className="relative md:max-w-72 h-64 md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden flex items-center justify-center text-center group bg-red-100"
      href={banner[1].link} // Usa el link desde el JSON
      target="_blank"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-100 group-hover:scale-105"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>

      {/* Puedes descomentar esta capa si quieres oscurecer el fondo */}
      {/* <div className="bg-black/50 absolute inset-0"></div> */}

      <div className="relative z-10 px-4 text-white space-y-4">
        {/* <h2 className="text-xl md:text-2xl font-bold leading-snug text-white">
          {message || "¡Haz del shopping una experiencia divertida para toda la familia!"}
        </h2> */}
        {/* <ButtonBanner onClick={onClickButton} children={textButton} /> */}
      </div>
    </a>
  );
}
