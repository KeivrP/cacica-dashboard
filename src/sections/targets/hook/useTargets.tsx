import { useMutation, useQuery } from "@tanstack/react-query";
import { useCustomSnackbar } from "../../../components/ui/snack";
import { createTarget, getTargets, updateTarget } from "../../../api/targets/target-api";
import { CreateTargets } from "../targets-types";

export const useGetTargets = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["targets"],
    queryFn: getTargets,
    retry: 10, // Retry the request up to 5 times
    retryDelay: (attempt) => attempt * 1000, // Delay between retries, increasing with each attempt
  });

  return { data, isLoading, error, refetch };
};

export const useCreateTargets = () => {
  const getTargets = useGetTargets();
  const { eSnack, sSnack } = useCustomSnackbar();

  return useMutation({
    mutationKey: ["createTargets"],
    mutationFn: createTarget,
    onSuccess: () => {
      sSnack("objetivos creado correctamente");
      void getTargets.refetch();
    },
    onError: (error) => {
      eSnack("Error al crear objetivos" + error.message);
    },
  });
};

export const useUpdateTargets = () => {
  const getTargets = useGetTargets();
  const { eSnack, sSnack } = useCustomSnackbar();

  return useMutation({
    mutationKey: ["updateTargets"],
    mutationFn: ({ id, data }: { id: string; data: CreateTargets }) => updateTarget(id, data),
    onSuccess: () => {
      sSnack("objetivos actualizado correctamente");
      void getTargets.refetch();
    },
    onError: (error) => {
      eSnack("Error al actualizar objetivos" + error.message);
      console.log("Error al actualizar objetivos", error.message);
    },
  });
};
