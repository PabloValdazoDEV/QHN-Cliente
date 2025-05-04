import { useEffect, useState } from "react";
import { categories as navbarCategories } from "../Navbar";
import InputGeneral from "../Input/InputGeneral";
import ButtonGeneral from "../Buttons/ButtonGeneral";

const DELAY_MS = 10000;
import { cities as navbarCities } from "../Navbar";

export default function RecommendModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    interests: [],
    childrenAges: [5],
    city: navbarCities[0].name,
  });

  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddChild = () => {
    if (formData.childrenAges.length < 5) {
      setFormData({
        ...formData,
        childrenAges: [...formData.childrenAges, 5],
      });
    }
  };

  const handleRemoveChild = (indexToRemove) => {
    setFormData({
      ...formData,
      childrenAges: formData.childrenAges.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const handleAgeChange = (index, value) => {
    const updatedAges = [...formData.childrenAges];
    updatedAges[index] = parseInt(value);
    setFormData({ ...formData, childrenAges: updatedAges });
  };

  const handleInterestsChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, interests: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email && !privacyAccepted) {
      setPrivacyError(true);
      return;
    }

    localStorage.setItem("recommendation_data", JSON.stringify(formData));
    localStorage.setItem("recommendation_submitted", "true");
    setIsOpen(false);
  };

  // useEffect(() => {
  //   if (localStorage.getItem("cookie_consent")) {
  //     const timer = setTimeout(() => {
  //       const submitted = localStorage.getItem("recommendation_submitted");
  //       if (!submitted) {
  //         setIsOpen(true);
  //       }
  //     }, DELAY_MS);

  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 transition-all duration-300 bg-[color:var(--color-primary)] text-white rounded-full w-16 h-16 flex items-center justify-center hover:rounded-lg hover:w-64 group overflow-hidden shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="bi bi-sliders2 transition-opacity duration-200 group-hover:opacity-0"
        >
          <path
            fillRule="evenodd"
            d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"
          />
        </svg>
        <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium whitespace-nowrap">
          Ajusta tus preferencias
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4">¿Qué te interesa?</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="font-semibold mb-2">
                  ¿Qué edades tienen tus hijos?{" "}
                  <span className="text-sm text-gray-500">
                    (Ayúdanos a enviarte contenidos adecuados para tu familia)
                  </span>
                </p>
                {formData.childrenAges.map((age, index) => (
                  <div key={index} className="mb-3">
                    <label className="text-sm font-medium block mb-1">
                      Hijo {index + 1}: {age} años
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="5"
                        max="18"
                        value={age}
                        onChange={(e) => handleAgeChange(index, e.target.value)}
                        className="w-full accent-[color:var(--color-primary)]"
                      />
                      {formData.childrenAges.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveChild(index)}
                          className="text-red-500 text-sm px-2"
                          title="Eliminar hijo"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {formData.childrenAges.length < 5 && (
                  <ButtonGeneral
                    onClick={handleAddChild}
                    className="mt-2 text-sm text-blue-600"
                  >
                    Añadir otro hijo
                  </ButtonGeneral>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  ¿En qué ciudad vives?
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-neutral-200 rounded-lg py-3 px-4 text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
                >
                  {navbarCities.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  ¿Qué tipo de contenidos te interesan?{" "}
                  <span className="text-sm text-gray-500">
                    (Puedes elegir varios)
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {navbarCategories.map((cat) => {
                    const selected = formData.interests.includes(cat.name);
                    return (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => {
                          const newInterests = selected
                            ? formData.interests.filter((i) => i !== cat.name)
                            : [...formData.interests, cat.name];
                          setFormData({ ...formData, interests: newInterests });
                        }}
                        className={`w-full py-2 px-3 rounded-lg border text-sm font-medium transition 
            ${
              selected
                ? "bg-[color:var(--color-primary)] text-white border-[color:var(--color-primary)]"
                : "bg-white text-gray-700 border-gray-300 hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
            }`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="block font-semibold mb-1">
                Correo electrónico{" "}
                <span className="text-sm text-gray-500">
                  (Para enviarte ideas cada semana)
                </span>
              </label>
              <InputGeneral
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                required={false}
              />
              {formData.email && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={privacyAccepted}
                    onChange={(e) => {
                      setPrivacyAccepted(e.target.checked);
                      setPrivacyError(false);
                    }}
                    className="accent-[color:var(--color-primary)]"
                  />
                  <label htmlFor="privacy" className="text-sm text-neutral-700">
                    Acepto la{" "}
                    <a
                      href="/politica-de-privacidad"
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      política de privacidad
                    </a>
                  </label>
                </div>
              )}

              {privacyError && (
                <p className="text-red-500 text-sm">
                  Debes aceptar la política de privacidad para enviar tu correo
                  electrónico.
                </p>
              )}

              <ButtonGeneral
                type="submit"
                className="bg-[color:var(--color-primary)] text-white w-full"
              >
                Establecer
              </ButtonGeneral>

              <p className="text-sm text-neutral-600 mt-4">
                Únete a cientos de familias que ya reciben cada semana nuestras
                ideas de ocio familiar, actividades para niños de todas las
                edades, planes gratuitos, recetas saludables y más. ¡Te ayudamos
                a disfrutar más tiempo de calidad con tus hijos!
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
