import { useMutation, useQuery } from "@tanstack/react-query";
import { useCustomSnackbar } from "../../../components/ui/snack";
import { createBranch, createProject, createRol, getProjects } from "../../../api/settings/setting-api";
import { useBranch, useRoles } from "../../user/hook/useUser";

export const useGetProjects = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    retry: 10, // Retry the request up to 5 times
    retryDelay: (attempt) => attempt * 1000, // Delay between retries, increasing with each attempt
  });

  return { data, isLoading, error, refetch };
};

export const useCreateProjects = () => {
  const getTargets = useGetProjects();
  const { eSnack, sSnack } = useCustomSnackbar();

  return useMutation({
    mutationKey: ["createProjects"],
    mutationFn: createProject,
    onSuccess: () => {
      sSnack("Proyecto creado correctamente");
      void getTargets.refetch();
    },
    onError: (error) => {
      eSnack("Error al crear proyecto" + error.message);
    },
  });
};

export const useCreateBranch = () => {
  const getBranch = useBranch();
  const { eSnack, sSnack } = useCustomSnackbar();

  return useMutation({
    mutationKey: ["createBranch"],
    mutationFn: createBranch,
    onSuccess: () => {
      sSnack("Sucursal creada correctamente");
      void getBranch.refetch();
    },
    onError: (error) => {
      eSnack("Error al crear sucursal" + error.message);
    },
  });
};

export const useCreateRol = () => {
  const getRol = useRoles();
  const { eSnack, sSnack } = useCustomSnackbar();

  return useMutation({
    mutationKey: ["createRol"],
    mutationFn: createRol,
    onSuccess: () => {
      sSnack("Rol creado correctamente");
      void getRol.refetch();
    },
    onError: (error) => {
      eSnack("Error al crear rol" + error.message);
    },
  });
};
