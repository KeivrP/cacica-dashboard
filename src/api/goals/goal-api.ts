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

export async function updateTargetReported(
  id: number,
  target_reported: number
): Promise<MonthyTargets> {
  const api = await createApiInstance();
  try {
    const res = await api.put(`/monthly-targets/update-target-reportado`, {
      id,
      targetReportado: target_reported,
    });
    return res.data;
  } catch (error) {
    console.log("Error al cargar Los Metas");
    throw error;
  }
}

export async function closeMonthlyTarget(projectId: number, month: string): Promise<MonthyTargets> {
  const api = await createApiInstance();
  try {
    const res = await api.put(`/monthly-targets/close-monthly-targets`, {
      projectId,
      month
    });
    return res.data;
  } catch (error) {
    console.log("Error al cargar Los Metas");
    throw error;
  }
}
