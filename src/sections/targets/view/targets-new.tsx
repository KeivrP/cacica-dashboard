import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BaseDialog } from "../../../components/modal/CustomModal";
import { Grid, TextField } from "@mui/material";

import * as yup from "yup";
import { useBackdrop } from "../../../components/ui/backdrop";
import { CreateTargets, Targets } from "../targets-types";
import { useCreateTargets, useUpdateTargets } from "../hook/useTargets";

interface NewTargetsProps {
  openF: boolean;
  handleCloseF: () => void;
  targetData?: Targets;
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .max(80, "El nombre no debe superar los 80 caracteres")
    .matches(/^[a-zA-Z0-9 ]+$/, "Solo se permiten letras, números y espacios"),
  nomenclature: yup
    .string()
    .required("El ID es obligatorio")
    .max(80, "El ID no debe superar los 80 caracteres")

});

export const NewTargets = ({
  openF,
  handleCloseF,
  targetData,
}: NewTargetsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateTargets>({
    resolver: yupResolver(validationSchema),
  });

  const { showLoading, hideLoading } = useBackdrop();
  const { mutate, isPending: createPending } = useCreateTargets();
  const { mutate: update, isPending: updatePending } = useUpdateTargets();


  const onSubmit = (data: CreateTargets) => {
    if (targetData) {
      update({ id: targetData.id, data });
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
      reset(targetData);

      if (targetData) {
        setValue("name", targetData.name);
        setValue("nomenclature", targetData.nomenclature);
    }
  }
  }, [openF, reset, setValue]);

  return (
    <BaseDialog
      dialogOpen={openF}
      handleClose={handleCloseF}
      title={targetData ? "Editar Objetivo" : "Nuevo Objetivo"}
      confirmText={"Aceptar"}
      cancelText={"Cancelar"}
      confirm={handleSubmit(onSubmit)}
      width="sm"
      open={openF}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="ID"
            variant="outlined"
            {...register("nomenclature")}
            error={!!errors.nomenclature}
            helperText={errors.nomenclature?.message}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Nombre"
            variant="outlined"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
      </Grid>
    </BaseDialog>
  );
};
