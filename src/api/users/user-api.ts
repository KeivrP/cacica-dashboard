import { createApiInstance } from '../api';
import { CreateUsers, type Users } from '../../sections/user/user-types';



export async function getUsers(): Promise<Users[]> {
  const api = await createApiInstance();
  try {
      const res = await api.get(`/usuarios`);
      return res.data;
  } catch (error) {
      console.log('Error al cargar usuarios');
      throw error;
  }
}
export async function createUser(data: CreateUsers): Promise<CreateUsers> {
  const api = await createApiInstance();
  try {
      const res = await api.post(`/usuarios`, data);
      return res.data;
  } catch (error) {
      console.log('Error al crear usuario');
      throw error;
  }
}
export async function updateUser(data: CreateUsers): Promise<CreateUsers> {
  const api = await createApiInstance();
  try {
      const res = await api.put(`/usuarios`, data);
      return res.data;
  } catch (error) {
      console.log('Error al actualizar usuario');
      throw error;
  }
}

export async function changeStatusUser(id: string): Promise<CreateUsers> {
  const api = await createApiInstance();
  try {
      const res = await api.patch(`/usuarios/disable/${id}`);
      return res.data;
  } catch (error) {
      console.log('Error al actualizar usuario');
      throw error;
  }
}