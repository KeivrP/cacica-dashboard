import { useMutation } from "@tanstack/react-query";
import { useCustomSnackbar } from "../../../components/ui/snack";
import { useGetMonthlyTargets } from "../../goals/hook/useGoals";
import { closeMonthlyTarget, updateTargetReported } from "../../../api/goals/goal-api";



export const useAddTargetReport = () => {
  const getTargets = useGetMonthlyTargets();
  const { eSnack, sSnack } = useCustomSnackbar();

  return useMutation({
    mutationKey: ["AddTargetReport"],
    mutationFn: (data: { id: number; target_reported: number }) => updateTargetReported(data.id, data.target_reported),
    onSuccess: () => {
      sSnack("Proyecto creado correctamente");
      void getTargets.refetch();
    },
    onError: (error) => {
      eSnack("Error al crear proyecto" + error.message);
    },
  });
};

export const useCloseMonthly = () => {
  const getBranch = useGetMonthlyTargets();
  const { eSnack, sSnack } = useCustomSnackbar();

  return useMutation({
    mutationKey: ["closeMonthly"],
    mutationFn: ({ projectId, month }: { projectId: number; month: string }) => closeMonthlyTarget(projectId, month),
    onSuccess: () => {
      sSnack("Sucursal creada correctamente");
      void getBranch.refetch();
    },
    onError: (error) => {
      eSnack("Error al crear sucursal" + error.message);
    },
  });
};
