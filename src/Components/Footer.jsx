import { useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    const orb = document.querySelector(".orb");
    const handleMouseMove = (e) => {
      if (orb) {
        orb.style.left = `${e.clientX}px`;
        orb.style.top = `${e.clientY}px`;
      }
    };

    document.getElementById("year").textContent = new Date().getFullYear();
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[color:var(--color-primary)] rounded-full filter blur-3xl animate-float1" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl animate-float2" />
        <div className="absolute bottom-10 left-1/2 w-48 h-48 bg-cyan-500 rounded-full filter blur-3xl animate-float3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          <div className="group">
            <div className="flex items-center space-x-2 mb-6">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-[color:var(--color-primary)] font-display">
                Qué Hacer con los Niños
              </h2>
            </div>
            <p className="text-gray-300 mb-6">Tagline pendiente.</p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-[color:var(--color-primary)] hover:shadow-lg hover:shadow-[color:var(--color-primary)]/30 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  {/* <path d="..." /> */}
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 font-display">Enlaces</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-all duration-300"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 font-display">Contacta con nosotros</h3>
            <ul className="space-y-4">
              <li>
                <p className="text-sm text-gray-300">Email</p>
                <a
                  href="mailto:info@qhn.es"
                  className="text-white hover:text-[color:var(--color-secondary)] transition"
                >
                  info@qhn.es
                </a>
                <br />
                <a
                  href="mailto:publicidad@qhn.es"
                  className="text-white hover:text-[color:var(--color-secondary)] transition"
                >
                  publicidad@qhn.es
                </a>
                <br />
                <a
                  href="mailto:redaccion@qhn.es"
                  className="text-white hover:text-[color:var(--color-secondary)] transition"
                >
                  redaccion@qhn.es
                </a>
              </li>
              <li>
                <p className="text-sm text-gray-300">Phone</p>
                <a
                  href="tel:+34 666 66 66 66"
                  className="text-white hover:text-[color:var(--color-primary)] transition"
                >
                  +34 666 66 66 66
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 font-display">Mantente Informado</h3>
            <p className="text-gray-300 mb-4">Suscríbete a nuestra Newsletter.</p>
            <form className="mt-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Tu Email"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] text-white"
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
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; <span id="year" className="text-[color:var(--color-primary)]"></span> Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition">Política de Privacidad</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Términos de Uso</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Cookies</a>
          </div>
        </div>
      </div>

      <div className="orb absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 filter blur-3xl pointer-events-none"></div>
    </footer>
  );
}