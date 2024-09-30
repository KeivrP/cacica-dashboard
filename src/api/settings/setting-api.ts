import { CreateProyect, Projects } from "../../sections/settings/proyect-types";
import { Branch, CreateBranch, CreateRole, Role } from "../../sections/user/user-types";
import { createApiInstance } from "../api";

export async function getProjects(): Promise<Projects[]> {
  const api = await createApiInstance();
  try {
    const res = await api.get(`/projects`);
    return res.data;
  } catch (error) {
    console.log("Error al cargar Los Proyectos");
    throw error;
  }
}
export async function createProject(data: CreateProyect): Promise<Projects> {
  const api = await createApiInstance();
  try {
    const res = await api.post(`/projects`, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear Projects");
    throw error;
  }
}

export async function createBranch(data: CreateBranch): Promise<Branch> {
  const api = await createApiInstance();
  try {
    const res = await api.post(`/branches`, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear Sucursal");
    throw error;
  }
}

export async function createRol(data: CreateRole): Promise<Role> {
    const api = await createApiInstance();
    try {
      const res = await api.post(`/roles`, data);
      return res.data;
    } catch (error) {
      console.log("Error al crear rol");
      throw error;
    }
  }
  
