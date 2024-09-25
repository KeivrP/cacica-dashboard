import { CreateTargets, Targets } from "../../sections/targets/targets-types";
import { createApiInstance } from "../api";

export async function getTargets(): Promise<Targets[]> {
  const api = await createApiInstance();
  try {
    const res = await api.get(`/targets`);
    return res.data;
  } catch (error) {
    console.log("Error al cargar Objetivos");
    throw error;
  }
}
export async function createTarget(data: CreateTargets): Promise<CreateTargets> {
  const api = await createApiInstance();
  try {
    const res = await api.post(`/targets`, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear Objetivos");
    throw error;
  }
}
export async function updateTarget(id: string, data: CreateTargets): Promise<CreateTargets> {
  const api = await createApiInstance();
  try {
    const res = await api.put(`/targets/${id}`, data);
    return res.data;
  } catch (error) {
    console.log("Error al actualizar Objetivos");
    throw error;
  }
}
