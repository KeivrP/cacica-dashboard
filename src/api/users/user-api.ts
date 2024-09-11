import { createApiInstance } from '../api';
import { type Users } from '../../sections/user/user-types';



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
export async function createUser(data: Users): Promise<Users> {
  const api = await createApiInstance();
  try {
      const res = await api.post(`/usuarios`, data);
      return res.data;
  } catch (error) {
      console.log('Error al crear usuario');
      throw error;
  }
}