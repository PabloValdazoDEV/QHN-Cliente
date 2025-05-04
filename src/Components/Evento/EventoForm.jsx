import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useState } from 'react';

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const resp = await fetch('http://localhost:3000/api/eventos/upload', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await resp.json();
  return data.url;
};

export default function EventoForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: '',
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadImage(file);
    editor.chain().focus().setImage({ src: url }).run();
    setUploading(false);
  };

  const onSubmit = async (data) => {
    const content = editor.getHTML();

    const payload = {
      ...data,
      content,
    };

    await fetch('http://localhost:3000/api/eventos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(payload),
    });

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mx-auto p-4">
      <input {...register('nombre_evento')} placeholder="Nombre del evento" className="input" />
      <input {...register('ubicacion')} placeholder="Ubicación" className="input" />
      <input {...register('fecha')} type="date" className="input" />
      <input {...register('categoria')} placeholder="Categoría" className="input" />
      <input {...register('discapacidad')} placeholder="Discapacidad" className="input" />
      <input {...register('integrantes')} type="number" placeholder="Integrantes" className="input" />
      <input {...register('edades')} placeholder="Edades" className="input" />
      <input {...register('modalidades')} placeholder="Modalidades" className="input" />
      <input {...register('precio')} type="number" placeholder="Precio (€)" className="input" />
      <input {...register('image')} placeholder="URL de imagen destacada" className="input" />

      <label>Contenido:</label>
      <div className="border p-2 min-h-[300px]">
        <EditorContent editor={editor} />
      </div>

      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploading && <p>Subiendo imagen...</p>}

      <button type="submit" className="btn btn-primary">Guardar Evento</button>
    </form>
  );
}
