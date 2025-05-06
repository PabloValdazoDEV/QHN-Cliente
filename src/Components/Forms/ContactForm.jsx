import React from 'react';
import { useForm } from 'react-hook-form';
import InputGeneral from '../Input/InputGeneral';
import ButtonGeneral from '../Buttons/ButtonGeneral';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: data.nombre,
          apellidos: data.apellidos,
          email: data.email,
          telefono: data.telefono,
          comentario: data.comentario,
        }),
      });

      if (response.ok) {
        alert('Mensaje enviado correctamente');
      } else {
        alert('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el mensaje');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Envíanos un mensaje</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InputGeneral
              label="Nombre (requerido)"
              type="text"
              placeholder="Escribe aquí tu nombre"
              {...register("nombre", { 
                required: "El nombre es requerido",
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres"
                }
              })}
              error={errors.nombre}
            />
          </div>
          <div>
            <InputGeneral
              label="Apellidos (requerido)"
              type="text"
              placeholder="Escribe aquí tus apellidos"
              {...register("apellidos", { 
                required: "Los apellidos son requeridos",
                minLength: {
                  value: 2,
                  message: "Los apellidos deben tener al menos 2 caracteres"
                }
              })}
              error={errors.apellidos}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InputGeneral
              label="Email (requerido)"
              type="email"
              placeholder="Escribe aquí tu email"
              {...register("email", { 
                required: "El email es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido"
                }
              })}
              error={errors.email}
            />
          </div>
          <div>
            <InputGeneral
              label="Teléfono (requerido)"
              type="tel"
              placeholder="Escribe aquí tu teléfono"
              {...register("telefono", { 
                required: "El teléfono es requerido",
                pattern: {
                  value: /^[0-9]{9}$/,
                  message: "Teléfono inválido (9 dígitos)"
                }
              })}
              error={errors.telefono}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comentario (requerido)
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-transparent transition-colors duration-200"
            rows="6"
            placeholder="Escribe aquí tu mensaje"
            {...register("comentario", { 
              required: "El comentario es requerido",
              minLength: {
                value: 10,
                message: "El comentario debe tener al menos 10 caracteres"
              }
            })}
          />
          {errors.comentario && (
            <p className="mt-1 text-sm text-red-600">{errors.comentario.message}</p>
          )}
        </div>
        <ButtonGeneral
          type="submit"
          className="w-full bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-primary)] transition-colors duration-200"
        >
          Enviar mensaje
        </ButtonGeneral>
      </form>
    </div>
  );
};

export default ContactForm; 