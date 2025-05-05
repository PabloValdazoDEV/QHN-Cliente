import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputGeneral from '../Input/InputGeneral';
import ButtonGeneral from '../Buttons/ButtonGeneral';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { tryRegister } from '../../Api/Auth';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  //   email: '',
  //   name: '',
  //   entity: '',
  //   password: '',
  //   confirmPassword: '',
  //   role: 'COLLABORATOR'
  // });
  const [error, setError] = useState('');

  
  const {handleSubmit, register, reset,  formState: { errors } } = useForm()

  const mutation = useMutation({
    mutationFn: async (data) => {
      console.log(data)
      await tryRegister(data)
      navigate("/")
    }
  })
  const onSubmit = (data) => {
    mutation.mutate(data)
  }


  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Registro de Colaborador</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputGeneral
            type="email"
            name="email"
            placeholder='Email'
            {...register("email", {required: true})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />



          <InputGeneral
            type="text"
            name="name"
            placeholder='Nombre'
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register("name", {required: true})}
          />


          <InputGeneral
            type="text"
            name="entity"
            placeholder='Entidad'
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register("entity", {required: true})}

          />

          <div className="relative">
            <InputGeneral
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder='Contraseña'
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register("password", {
                required: true,
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{7,}$/gm,
                  message: "La contraseña no cumple los parametros",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          <InputGeneral
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder='Confirmar Contraseña'
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register("confirmPassword", {
              required: true,
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{7,}$/gm,
                message: "La contraseña no cumple los parametros",
              },
            })}
          />


        <ButtonGeneral
          type="submit"
          children='Registrarse'
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        />
          
      </form>
    </div>
  );
};

export default RegisterForm; 