import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from "react-router";
import { tryLogout } from "../Api/Auth";
import { fetchUser, user } from "../Context/User";
import { useAtom, useSetAtom } from "jotai";

const UserManagement = () => {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: '',
    entity: '',
    isActive: true
  });

  const navigate = useNavigate();
  const refetchUser = useSetAtom(fetchUser)
  const [userContext] = useAtom(user)

  // Obtener todos los usuarios
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/auth/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    }
  });

  // Mutación para actualizar usuario
  const updateUserMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(`http://localhost:3000/auth/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      setEditingUser(null);
    }
  });

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({
      email: user.email,
      name: user.name,
      role: user.role,
      entity: user.entity,
      isActive: user.isActive
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserMutation.mutate({ id: editingUser, data: formData });
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Usuarios</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser === user.id ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser === user.id ? (
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="border rounded px-2 py-1"
                    >
                      <option value="ADMIN">Administrador</option>
                      <option value="COLLABORATOR">Colaborador</option>
                      <option value="NEWSLETTER_USER">Usuario Newsletter</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      value={formData.entity}
                      onChange={(e) => setFormData({ ...formData, entity: e.target.value })}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    user.entity || '-'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser === user.id ? (
                    <select
                      value={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                      className="border rounded px-2 py-1"
                    >
                      <option value="true">Activo</option>
                      <option value="false">Inactivo</option>
                    </select>
                  ) : (
                    user.isActive ? 'Activo' : 'Inactivo'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingUser === user.id ? (
                    <div className="space-x-2">
                      <button
                        onClick={handleSubmit}
                        className="text-green-600 hover:text-green-900"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EventManagement = () => {
  const [userContext] = useAtom(user);
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/auth/events', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    }
  });

  if (isLoading) return <div>Cargando eventos...</div>;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Gestión de Eventos/Noticias</h2>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imágenes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comentarios</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validado</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events?.map((event) => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap">{event.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.entity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.ageRange}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    {event.images && event.images.map((img, idx) => (
                      <img key={idx} src={img} alt="img" className="w-12 h-12 object-cover rounded" />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{event.comments || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.validated ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TABS = [
  { label: 'Usuarios', component: UserManagement },
  { label: 'Eventos/Noticias', component: EventManagement },
  // Aquí tus compañeros pueden agregar más tabs fácilmente
];

const PageAdmin = () => {
  const navigate = useNavigate();
  const refetchUser = useSetAtom(fetchUser);
  const [userContext] = useAtom(user);
  const [activeTab, setActiveTab] = useState(0);

  const handleLogout = async () => {
    await tryLogout();
    refetchUser();
    navigate("/");
  };

  const ActiveComponent = TABS[activeTab].component;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
        {/* Tabs */}
        <div className="mb-8 flex space-x-4 border-b">
          {TABS.map((tab, idx) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 font-medium focus:outline-none border-b-2 transition-colors duration-200 ${activeTab === idx ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-600'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};

export default PageAdmin;
