import { useLocation, useNavigate } from "react-router";
import ButtonGeneral from "../Buttons/ButtonGeneral";
import { useEffect, useState } from "react";

export default function BannerCookies() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const slug = pathParts[pathParts.length - 1];

    if (slug === "politica-privacidad-&-cookies") {
      setShowBanner(false);
    } else {
      const consent = localStorage.getItem("cookie_consent");
      if (!consent) {
        setShowBanner(true);
      }
    }
  }, [location.pathname]);

  const handleConsent = (decision) => {
    localStorage.setItem("cookie_consent", decision);
    setShowBanner(false);
    if (decision === "accepted") {
      // const script = document.createElement("script");
      // script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";
      // script.async = true;
      // document.head.appendChild(script);
  
  
      // script.onload = () => {
      //   window.dataLayer = window.dataLayer || [];
      //   function gtag() {
      //     window.dataLayer.push(arguments);
      //   }
      //   gtag('js', new Date());
      //   gtag('config', 'G-XXXXXXX');
      // };
      console.log(
        "Consentimiento aceptado. Puedes cargar Google Analytics aquí."
      );
    } else {
      console.log("Consentimiento denegado.");
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className={`fixed w-full h-full bg-black/50 z-999 flex justify-center items-center`}
    >
      <div
        className={`bg-gray-100 border border-neutral-200 rounded-xl p-10 w-2xl flex flex-col gap-5 m-4`}
      >
        <p className="text-2xl font-semibold text-center">
          Gestionar consentimiento
        </p>
        <p className="text-center">
          Para ofrecer las mejores experiencias, utilizamos tecnologías como las
          cookies para almacenar y/o acceder a la información del dispositivo.
          El consentimiento de estas tecnologías nos permitirá procesar datos
          como el comportamiento de navegación o las identificaciones únicas en
          este sitio. No consentir o retirar el consentimiento puede afectar
          negativamente a ciertas características y funciones.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <ButtonGeneral
            children={"Aceptar"}
            className={"w-full bg-[color:var(--color-primary)]"}
            onClick={() => handleConsent("accepted")}
          />
          <ButtonGeneral
            children={"Denegar"}
            className={"w-full bg-gray-200 shadow-lg text-black"}
            onClick={() => handleConsent("denied")}
          />
          <ButtonGeneral
            children={"Ver Políticas"}
            className={"w-full bg-gray-200 shadow-lg text-black col-span-2 md:col-span1"}
            onClick={() => navigate("/politica-privacidad-&-cookies")}
          />
        </div>
      </div>
    </div>
  );
}
