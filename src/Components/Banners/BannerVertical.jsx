import ButtonBanner from "../Buttons/ButtonBanner";

export default function BannerVertical({ image, message, onClickButton, textButton }) {
  return (
    <div
      className="relative w-72 h-96 md:h-[500px] rounded-lg overflow-hidden flex items-center justify-center text-center group"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-100 group-hover:scale-110"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>

      <div className="bg-black/50 absolute inset-0"></div>

      <div className="relative z-10 px-4 text-white space-y-4">
        <h2 className="text-xl md:text-2xl font-bold leading-snug text-white">
          {message || "¡Haz del shopping una experiencia divertida para toda la familia!"}
        </h2>
        <ButtonBanner onClick={onClickButton} children={textButton} />
      </div>
    </div>
  );
}
