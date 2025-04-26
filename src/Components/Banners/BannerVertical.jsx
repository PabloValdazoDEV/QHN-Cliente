import ButtonBanner from "../Buttons/ButtonBanner";

export default function BannerVertical({ image, message, onClickButton, textButton }) {
  return (
    <div
      className="relative x-full md:max-w-72 h-64 md:h-[500px] rounded-lg overflow-hidden flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="relative z-10 px-4 text-white space-y-4">
        <h2 className="text-xl md:text-2xl font-bold leading-snug">
          {message || "¡Haz del shopping una experiencia divertida para toda la familia!"}
        </h2>
        <ButtonBanner onClick={onClickButton} children={textButton}/>
      </div>
    </div>
  );
}
