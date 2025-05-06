import ButtonBanner from "../Buttons/ButtonBanner";
import banner from "./Banner.json";

export default function BannerHorizontal({
  image = banner[0].image,
  message,
  onClickButton,
  textButton,
}) {
  return (
    <a
      className="relative w-full h-34 md:h-32 lg:h-46  rounded-lg overflow-hidden flex items-center justify-center text-center group"
      href={banner[0].link}
      target="_blank"
    >
      <div
        className="absolute inset-0 bg-cover bg-left transition-transform duration-700 scale-100 group-hover:scale-105"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>

      {/* <div className="bg-black/50 absolute inset-0"></div> */}

      <div className="relative z-10 px-6 text-white space-y-4">
        {/* <h2 className="text-lg md:text-2xl font-bold leading-snug max-w-4xl mx-auto text-white">
      {message || "Viaja en familia y crea recuerdos inolvidables en cada destino"}
    </h2> */}
        {/* <ButtonBanner onClick={onClickButton} children={textButton} /> */}
      </div>
    </a>
  );
}
