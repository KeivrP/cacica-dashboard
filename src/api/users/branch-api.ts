import { createApiInstance } from '../api';
import { type Branch } from '../../sections/user/user-types';

export async function getBranch(): Promise<Branch[]> {
  const api = await createApiInstance();
  try {
      const res = await api.get(`/branches`);
      return res.data;
  } catch (error) {
      console.log('Error al cargar Sucursales');
      throw error;
  }
}