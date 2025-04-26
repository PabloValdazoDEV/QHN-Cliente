import ButtonBanner from "../Buttons/ButtonBanner";

export default function BannerHorizontal({ image, message, onClickButton, textButton }) {
  return (
<div
  className="relative w-full h-60 md:h-72 rounded-lg overflow-hidden flex items-center justify-center text-center group"
>
  <div
    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-100 group-hover:scale-110"
    style={{
      backgroundImage: `url(${image})`,
    }}
  ></div>

  <div className="bg-black/50 absolute inset-0"></div>

  <div className="relative z-10 px-6 text-white space-y-4">
    <h2 className="text-lg md:text-2xl font-bold leading-snug max-w-4xl mx-auto text-white">
      {message || "Viaja en familia y crea recuerdos inolvidables en cada destino"}
    </h2>
    <ButtonBanner onClick={onClickButton} children={textButton} />
  </div>
</div>

  );
}
