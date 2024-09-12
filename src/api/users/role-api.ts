import { createApiInstance } from '../api';
import { type Role } from '../../sections/user/user-types';

export async function getRoles(): Promise<Role[]> {
  const api = await createApiInstance();
  try {
      const res = await api.get(`/roles`);
      return res.data;
  } catch (error) {
      console.log('Error al cargar los roles');
      throw error;
  }
}