import { useMutation, useQuery } from "@tanstack/react-query";
import {
  changeStatusUser,
  createUser,
  getUsers,
  updateUser,
} from "../../../api/users/user-api";
import { getRoles } from "../../../api/users/role-api";
import { getBranch } from "../../../api/users/branch-api";
import { useCustomSnackbar } from "../../../components/ui/snack";

export const useGetUsers = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["usuarios"],
    queryFn: getUsers,
    retry: 10, // Retry the request up to 5 times
    retryDelay: (attempt) => attempt * 1000, // Delay between retries, increasing with each attempt
  });

  return { data, isLoading, error, refetch };
};

export const useRoles = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  return { data, isLoading, error };
};

export const useBranch = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["branch"],
    queryFn: getBranch,
  });

  return { data, isLoading, error };
};

export const useCreateUser = () => {
  const getuser = useGetUsers();
  const { eSnack, sSnack } = useCustomSnackbar();

  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: createUser,
    onSuccess: () => {
      sSnack("Usuario creado correctamente");
      void getuser.refetch();
    },
    onError: (error) => {
      eSnack("Error al crear usuario" + error.message);
    },
  });
};

export const useUpdateUser = () => {
  const getuser = useGetUsers();
  const { eSnack, sSnack } = useCustomSnackbar();

  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUser,
    onSuccess: () => {
      sSnack("Usuario actualizado correctamente");
      void getuser.refetch();
    },
    onError: (error) => {
      eSnack("Error al actualizar usuario" + error.message);
      console.log("Error al actualizar usuario", error.message);
    },
  });
};

export const useChangeStatusUser = () => {
  const getuser = useGetUsers();
  const { eSnack, sSnack } = useCustomSnackbar();
  return useMutation({
    mutationKey: ["changeStatusUser"],
    mutationFn: changeStatusUser,
    onSuccess: () => {
      sSnack("Estado de usuario cambiado correctamente");
      void getuser.refetch();
    },
    onError: (error) => {
      eSnack("Error al cambiar estado de usuario " + error.message);
    },
  });
};
