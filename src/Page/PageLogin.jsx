import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { tryLogin } from "../Api/Auth";
import { useNavigate } from "react-router";
import { useSetAtom } from "jotai";
import { fetchUser } from "../Context/User";

const PageLogin = () => {
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate()
  const refetchUser = useSetAtom(fetchUser)



  const mutation = useMutation({
    mutationFn: async (data)=>{
        const reponse = await tryLogin(data)
        if(reponse.message === "Login successful"){
          reset()
          navigate("/admin")
          refetchUser()
        }
        if(reponse.message === "Invalid credentials"){
          alert("Credenciales incorrectas, intentelo de nuevo")
        }
    }
  })

  const onSubmit = (data) => {
    mutation.mutate(data)
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label id="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          {...register("email", { required: true })}
        />
        <label id="password">Contraseña</label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password", { required: true })}
        />
        <button>Entrar</button>
      </form>
      <h1>Login</h1>
    </>
  );
};

export default PageLogin;
