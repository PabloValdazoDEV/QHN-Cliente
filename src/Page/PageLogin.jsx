import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { tryLogin } from "../Api/Auth";
import { useNavigate } from "react-router";
import { useSetAtom } from "jotai";
import { fetchUser } from "../Context/User";

const PageLogin = () => {
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();
  const refetchUser = useSetAtom(fetchUser);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const reponse = await tryLogin(data);
      if (reponse.message === "Login successful") {
        reset();
        navigate("/admin");
        refetchUser();
      }
      if (reponse.message === "Invalid credentials") {
        alert("Credenciales incorrectas, intentelo de nuevo");
      }
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Inicio de sesión</h2>
      
      <div className="w-1/2 gap-8 items-center">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              {...register("email", { required: true })}
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              {...register("password", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Ingresar
          </button>
        </form>
      </div>
      </div>
      </div>
    </>
  );
};

export default PageLogin;
