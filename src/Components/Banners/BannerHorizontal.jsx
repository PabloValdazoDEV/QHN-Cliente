import ButtonBanner from "../Buttons/ButtonBanner";

export default function BannerHorizontal({ image, message }) {
  return (
    <div
      className="relative w-full h-60 md:h-72 rounded-lg overflow-hidden flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="relative z-10 px-6 text-white space-y-4">
        <h2 className="text-lg md:text-2xl font-bold leading-snug max-w-4xl mx-auto">
          {message || "Viaja en familia y crea recuerdos inolvidables en cada destino"}
        </h2>
        <ButtonBanner />
      </div>
    </div>
  );
}
