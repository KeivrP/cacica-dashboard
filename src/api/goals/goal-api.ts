import { Goals, MonthyTargets } from "../../sections/goals/goals-types";
import { createApiInstance } from "../api";

export async function getTargetsProjects(): Promise<Goals[]> {
  const api = await createApiInstance();
  try {
    const res = await api.get(`/objectives-projects`);
    return res.data;
  } catch (error) {
    console.log("Error al cargar Los Metas");
    throw error;
  }
}

export async function getMonthlyTargets(): Promise<MonthyTargets[]> {
  const api = await createApiInstance();
  try {
    const res = await api.get(`/monthly-targets`);
    return res.data;
  } catch (error) {
    console.log("Error al cargar Los Metas");
    throw error;
  }
}
