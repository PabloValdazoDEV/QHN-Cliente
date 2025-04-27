import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { tryLogin } from "../Api/Auth";
import { useNavigate } from "react-router";
import { useSetAtom } from "jotai";
import { fetchUser } from "../Context/User";
import InputGeneral from "../Components/Input/InputGeneral";
import ButtonGeneral from "../Components/Buttons/ButtonGeneral";
import { useState } from "react";

const PageLogin = () => {
  const [messageInfo, setMessageInfo] = useState("");

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
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

      // setMessageInfo(reponse.message);

      if (
        reponse.message == "Credenciales invalidas, tienes 2 intentos." ||
        reponse.message == "Credenciales invalidas, tienes 1 intentos."
      ) {
        setMessageInfo(reponse.message);
      }
      if (reponse.message == "Ese correo no esta registrado") {
        setMessageInfo(reponse.message);
      }
      if (reponse.message == "Ese correo no esta registrado.") {
        setMessageInfo(reponse.message);
      }
      if (
        reponse.message ==
        "Ha superado el número máximo de intentos. Intentelo más tarde."
      ) {
        setMessageInfo(reponse.message);
      }

      // console.log(reponse.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Inicio de sesión
        </h2>

        <div className="w-1/2 gap-8 items-center jus">
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col justify-center"
            >
              {messageInfo && (
                <div className="text-center bg-red-400 px-4 py-2 rounded-md">
                  <p className=" text-white font-medium ">{messageInfo}</p>
                </div>
              )}

              <InputGeneral
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">Campo requerido</p>
              )}

              <InputGeneral
                placeholder="Contraseña"
                type="password"
                id="password"
                name="password"
                {...register("password", {
                  required: true,
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{7,}$/gm,
                    message: "La contraseña no cumple los parametros",
                  },
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-xs">Campo requerido</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}

              <ButtonGeneral
                children={"Ingresar"}
                type="submit"
                className=" bg-blue-600 text-white hover:bg-blue-700"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLogin;
