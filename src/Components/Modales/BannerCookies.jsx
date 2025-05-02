import { useLocation, useNavigate } from "react-router";
import ButtonGeneral from "../Buttons/ButtonGeneral";
import { useEffect, useState } from "react";


export default function BannerCookies() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Verificar si estamos en la página de privacidad
    const pathParts = location.pathname.split("/");
    const slug = pathParts[pathParts.length - 1];
    
    if (slug === "politica-privacidad-cookies") {
      setShowBanner(false);
      return;
    }

    // Verificar si ya hay una decisión guardada
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Si no hay decisión guardada, mostrar el banner
      setShowBanner(true);
    }
  }, [location.pathname]);

  const handleConsent = (decision) => {
    // Guardar la decisión del usuario
    localStorage.setItem("cookie_consent", decision);
    // Guardar la fecha de la decisión
    localStorage.setItem("cookie_consent_date", new Date().toISOString());
    
    // Si el usuario acepta, podemos cargar servicios que requieren consentimiento
    if (decision === "accepted") {
      // Aquí puedes cargar Google Analytics u otros servicios que requieren consentimiento
      console.log("Consentimiento aceptado. Cargando servicios...");
    }
    
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex justify-center items-center">
      <div className="bg-white border border-neutral-200 rounded-xl p-6 max-w-2xl w-full mx-4 flex flex-col gap-5">
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ButtonGeneral
            children={"Aceptar"}
            className={"w-full bg-[color:var(--color-primary)] text-white"}
            onClick={() => handleConsent("accepted")}
          />
          <ButtonGeneral
            children={"Denegar"}
            className={"w-full bg-gray-200 shadow-lg text-black"}
            onClick={() => handleConsent("denied")}
          />
          <ButtonGeneral
            children={"Ver Políticas"}
            className={"w-full bg-gray-200 shadow-lg text-black col-span-2 md:col-span-1"}
            onClick={() => navigate("/politica-privacidad-cookies")}
          />
        </div>
      </div>
    </div>
  );
}
