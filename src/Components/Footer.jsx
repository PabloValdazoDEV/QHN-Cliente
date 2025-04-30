import { useEffect } from "react";
import { Link } from "react-router-dom";
import InputGeneral from "./Input/InputGeneral";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function Footer() {
  useEffect(() => {
    document.getElementById("year").textContent = new Date().getFullYear();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: (data) => {
      console.log(data)
    }
  })


  return (
    <footer className="relative bg-white shadow-lg text-neutral-700 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="group">
            <div className="flex-shrink-0 flex items-center mb-4 md:mb-0">
              <Link to="/" className="flex items-center">
                <img
                  src="/images/logo.webp"
                  alt="QHN Logo"
                  className=" w-3/4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/logo-placeholder.png";
                  }}
                />
              </Link>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-[#1877F2] hover:text-[#0d6efd]">
                <svg
                  className="w-7 h-7 transition hover:scale-125"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-[#1DA1F2] hover:text-[#0d6efd]">
                <svg
                  className="w-7 h-7 transition hover:scale-125"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-[#E4405F] hover:text-[#d63384]">
                <svg
                  className="w-7 h-7 transition hover:scale-125"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 font-display">Enlaces</h3>

            <Link
              to="/"
              className=" text-neutral-700 hover:[color:var(--color-primary)] no-underline"
            >
              Home
            </Link>

            <br />
            <Link
              to="/ciudades"
              className=" text-neutral-700 hover:[color:var(--color-primary)] no-underline"
            >
              Ciudades
            </Link>

            <br />
            <Link
              to="/categorias"
              className=" text-neutral-700 hover:[color:var(--color-primary)] no-underline"
            >
              Categorías
            </Link>
            <br />
            <Link
              to="/sobre-nosotros"
              className=" text-neutral-700 hover:[color:var(--color-primary)] no-underline"
            >
              Sobre Nosotros
            </Link>
            <br />
            <Link
              to="/contacto"
              className=" text-neutral-700 hover:[color:var(--color-primary)] no-underline"
            >
              Contacto
            </Link>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 font-display">
              Contacta con nosotros
            </h3>

            
            <a
              href="mailto:info@qhn.es"
              className="flex items-center text-neutral-700 hover:text-[color:var(--color-primary)] transition no-underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 [stroke:var(--color-primary)]" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              info@qhn.es
            </a>

            <a
              href="mailto:publicidad@qhn.es"
              className="flex items-center text-neutral-700 hover:text-[color:var(--color-primary)] transition no-underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 [stroke:var(--color-primary)]" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              publicidad@qhn.es
            </a>

            <a
              href="mailto:redaccion@qhn.es"
              className="flex items-center text-neutral-700 hover:text-[color:var(--color-primary)] transition no-underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 [stroke:var(--color-primary)]" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              redaccion@qhn.es
            </a>
            <br />
            <br />
           
            <a
              href="tel:+34666666666"
              className="flex items-center text-neutral-700 hover:text-[color:var(--color-primary)] transition no-underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 [stroke:var(--color-primary)]" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2a19.8 19.8 0 0 1-8.63-3.07a19.5 19.5 0 0 1-6-6a19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72a12.8 12.8 0 0 0 .7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45a12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92"/>
              </svg>
              666 66 66 66
            </a>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 font-display">
              Mantente Informado
            </h3>
            <p className="text-neutral-700 mb-4">
              Suscríbete a nuestra Newsletter.
            </p>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit((data) => mutation.mutate(data))}>
              <div className="relative">
                <InputGeneral
                  id={"emailNewsLetter"}
                  name={"emailNewsLetter"}
                  type={"email"}
                  placeholder={"Tu Email"}
                  {...register("emailNewsLetter", { required: true })}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[color:var(--color-primary)] hover:bg-blue-600 text-white rounded-lg px-4 py-1 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  {...register("privacyPolicy", { required: "Debes aceptar la Política de Privacidad." })}
                  className="mt-1"
                />
                <label htmlFor="privacyPolicy" className="text-sm text-neutral-700">
                  Acepto la&nbsp;
                  <Link to="/cookies" className="text-[color:var(--color-primary)] underline hover:opacity-80">
                    Política de Privacidad
                  </Link>
                </label>
              </div>

              {errors.privacyPolicy && (
                <p className="text-sm text-red-600">
                  {errors.privacyPolicy.message}
                </p>
              )}
            </form>

          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-700 text-sm mb-4 md:mb-0">
            &copy;{" "}
            <span
              id="year"
              className="text-neutral-700"
            ></span>{" "}
            Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
          <Link to="/politica-privacidad-&-cookies" className=" text-neutral-700 hover:text-[color:var(--color-primary)] text-sm no-underline hover:underline">
              Política de Privacidad y Cookies
              </Link>
          </div>
        </div>
      </div>

      <div className="orb absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 filter blur-3xl pointer-events-none"></div>
    </footer>
  );
}
