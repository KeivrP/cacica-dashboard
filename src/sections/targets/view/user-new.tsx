import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { BaseDialog } from "../../../components/modal/CustomModal";
import { Autocomplete, FormControl, Grid, TextField } from "@mui/material";
import {
  useBranch,
  useCreateUser,
  useRoles,
  useUpdateUser,
} from "../hook/useTargets";
import { type CreateUsers } from "../targets-types";
import * as yup from "yup";
import { useBackdrop } from "../../../components/ui/backdrop";

interface NewUsuariosProps {
  openF: boolean;
  handleCloseF: () => void;
  userData?: CreateUsers;
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .max(80, "El nombre no debe superar los 80 caracteres")
    .matches(/^[a-zA-Z0-9 ]+$/, "Solo se permiten letras, números y espacios"),
  email: yup
    .string()
    .required("El correo electrónico es obligatorio")
    .email("Ingrese un correo electrónico válido"),
  roleId: yup.string().required("Debe seleccionar un rol de usuario"),
  branchId: yup.string().required("Debe seleccionar una sucursal"),
});

export const NewUsuarios = ({
  openF,
  handleCloseF,
  userData,
}: NewUsuariosProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateUsers>({
    resolver: yupResolver(validationSchema),
  });

  const { showLoading, hideLoading } = useBackdrop();
  const { mutate, isPending: createPending } = useCreateUser();
  const { mutate: update, isPending: updatePending } = useUpdateUser();
  const { data: roles } = useRoles();
  const { data: branch } = useBranch();

  const onSubmit = (data: CreateUsers) => {
    if (userData) {
      update(data);
    } else {
      mutate(data);
    }
  };

  useEffect(() => {
    if (createPending || updatePending) {
      handleCloseF();
      showLoading("");
    } else {
      hideLoading();
    }
  }, [createPending, updatePending, showLoading, hideLoading]);

  useEffect(() => {
    if (openF) {
      reset(userData);

      if (userData?.roleId && roles) {
        const selectedRole = roles.find((role) => role.id === userData.roleId);
        if (selectedRole) {
          setValue("roleId", selectedRole.id);
        }
      }

      if (userData?.branchId && branch) {
        const selectedBranch = branch.find(
          (branch) => branch.id === userData.branchId
        );
        if (selectedBranch) {
          setValue("branchId", selectedBranch.id);
        }
      }
    }
  }, [openF, userData, roles, branch, reset, setValue]);

  return (
    <BaseDialog
      dialogOpen={openF}
      handleClose={handleCloseF}
      title={userData ? "Editar Usuario" : "Nuevo Usuario"}
      confirmText={"Aceptar"}
      cancelText={"Cancelar"}
      confirm={handleSubmit(onSubmit)}
      width="sm"
      open={openF}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Nombre"
            variant="outlined"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Correo"
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <Controller
              name="roleId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={roles || []}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Rol"
                      variant="outlined"
                      error={!!errors.roleId}
                      helperText={errors.roleId?.message}
                    />
                  )}
                  onChange={(_, value) => {
                    field.onChange(value ? value.id : null);
                  }}
                  value={roles?.find((role) => role.id === field.value) || null}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <Controller
              name="branchId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={branch || []}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sucursal"
                      variant="outlined"
                      error={!!errors.branchId}
                      helperText={errors.branchId?.message}
                    />
                  )}
                  onChange={(_, value) => {
                    field.onChange(value ? value.id : null);
                  }}
                  value={
                    branch?.find((role) => role.id === field.value) || null
                  }
                />
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </BaseDialog>
  );
};
