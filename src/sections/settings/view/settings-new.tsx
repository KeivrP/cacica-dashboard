import { useEffect, useMemo, useState } from "react";
import { BaseDialog } from "../../../components/modal/CustomModal";
import {
  Autocomplete,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";

import { useBackdrop } from "../../../components/ui/backdrop";
import { Iconify } from "../../../components/iconify";
import { Branch, Role } from "../../user/user-types";
import { CreateProyect, Objective } from "../proyect-types";
import { useCreateProjects } from "../hook/useSettings";
import { useGetTargets } from "../../targets/hook/useTargets";
import { useCustomSnackbar } from "../../../components/ui/snack";

const icon = (
  <Iconify width={16} icon="solar:clipboard-add-outline" sx={{ mr: 0.5 }} />
);

const checkedIcon = (
  <Iconify width={16} icon="solar:clipboard-check-outline" sx={{ mr: 0.5 }} />
);

interface NewProjectProps {
  openF: boolean;
  handleCloseF: () => void;
  roles: Role[];
  branch: Branch[];
}

export const NewProjects = ({
  openF,
  handleCloseF,
  roles,
  branch,
}: NewProjectProps) => {
  const { eSnack } = useCustomSnackbar();



  /*--------------Create----------------*/
  const { showLoading, hideLoading } = useBackdrop();
  const { mutate, isPending: createPending } = useCreateProjects();

  /*--------------Data----------------*/
  const { data: objetivos } = useGetTargets();


  /*--------------State----------------*/

  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [nuevoObjetivo, setNuevoObjetivo] = useState<any | null>(null);

  const [rolesSeleccionados, setRolesSeccionados] = useState<any[]>([]);
  const [objetivosSeleccionados, setObjetivosSeleccionados] = useState<
    Objective[]
  >([]);

  // --------------ObjetivosData----------------


  const objeData = useMemo(() => {
    return (
      objetivos
        ?.filter((item) => !objetivosSeleccionados.some((obj) => obj.id === item.id))
        .map((item) => ({
          id: item.id,
          name: `${item.nomenclature} - ${item.name}`,
        })) || []
    );
  }, [objetivos, objetivosSeleccionados]);
  /*--------------Form----------------*/

  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [branchID, setBranchID] = useState<Branch>();

  /*--------------Handlers----------------*/

  useEffect(() => {
    if (openF) {
      setObjetivosSeleccionados([]);
      setRolesSeccionados([]);
      setName("");
      setStartDate("");
      setEndDate("");
      setNuevoObjetivo(null);
      setBranchID(undefined);
      setMostrarOpciones(false);

    }
  }, [openF]);

  const handleObjetivoChange = (_event: any, value: any) => {
    if (
      value &&
      !objetivosSeleccionados.some((obj) => obj.id === value.value)
    ) {
      setMostrarOpciones(true);
      setNuevoObjetivo(value);
      setObjetivosSeleccionados([...objetivosSeleccionados, value]);
    }
  };

  const removeObjective = (value: string) => {
    return () => {
      setObjetivosSeleccionados(
        objetivosSeleccionados.filter((obj) => obj.id !== value)
      );
      setNuevoObjetivo(null);
      setMostrarOpciones(false);
    };
  };

  const handleCancelObjective = (value: any) => {
    setObjetivosSeleccionados((prev) =>
      prev.filter((obj) => obj.id !== value.value)
    );
    setMostrarOpciones(false);
    setNuevoObjetivo(null);
  };

  const saveRoles = (value: any[]) => {
    const nuevoObjetivoIndex = objetivosSeleccionados.findIndex(
      (obj: any) => obj.value === nuevoObjetivo.id
    );
    if (nuevoObjetivoIndex !== -1) {
      const updatedRoles = [...rolesSeleccionados];
      updatedRoles[nuevoObjetivoIndex] = {
        objetivoID: nuevoObjetivo.value,
        roles: value,
      };
      setRolesSeccionados(updatedRoles);
    } else {
      setRolesSeccionados([
        ...rolesSeleccionados,
        { objetivoID: nuevoObjetivo.id, roles: value },
      ]);
    }
    return value;
  };

  const handleSaveObjective = () => {

    const updatedObjetivosSeleccionados = objetivosSeleccionados.map((obj) => {
      const rolesForObjective = rolesSeleccionados.find(
        (role) => role.objetivoID === obj.id
      );
      return {
        ...obj,
        roles: rolesForObjective ? rolesForObjective.roles : [],
      };
    }).filter(obj => obj.goal && obj.roles.length > 0);

    if (!updatedObjetivosSeleccionados.some((role) => role.id === nuevoObjetivo.id)) {
      eSnack("El objetivo debe tener una meta y al menos un rol asignado.");
      return;
    }

    setObjetivosSeleccionados(updatedObjetivosSeleccionados);
    setMostrarOpciones(false);
    setNuevoObjetivo(null);
  };

  const onSubmit = () => {
    if (!name || !startDate || !endDate || !branchID || objetivosSeleccionados.length === 0) {
      eSnack("Todos los campos son obligatorios y deben estar completos.");
      return;
    }

    const objetivos = objetivosSeleccionados.map((obj) => {
      return {
        id: obj.id,
        goal: obj.goal,
        roles: obj.roles,
      };
    });

    const payload: CreateProyect = {
      name,
      branch_id: branchID!.id, // Ensure branchID is defined
      start_date: new Date(startDate).toISOString(),
      end_date: new Date(endDate).toISOString(),
      objectives: objetivos, // Updated to match the new interface
    };

    mutate(payload);
  };

  useEffect(() => {
    if (createPending) {
      handleCloseF();
      showLoading("");
    } else {
      hideLoading();
    }
  }, [createPending, handleCloseF, showLoading, hideLoading]);

  return (
    <BaseDialog
      dialogOpen={openF}
      open={openF}
      handleClose={handleCloseF}
      title={"Nuevo Proyecto"}
      confirmText={"Aceptar"}
      cancelText={"Cancelar"}
      confirm={onSubmit}
      width="md"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={12}>
          <TextField
            fullWidth
            label="Nombre del Proyecto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Fecha de Inicio"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Fecha de Fin"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Autocomplete
            options={branch || []}
            value={branchID}
            onChange={(_event, value) => setBranchID(value!)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sucursal"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        {!mostrarOpciones && (
          <Grid item xs={12} sm={12} md={12}>
            <Autocomplete
              options={objeData}
              value={nuevoObjetivo}
              onChange={handleObjetivoChange}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Objetivos"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
        )}

        {mostrarOpciones && (
          <>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                value={nuevoObjetivo.name}
                disabled
                label="Objetivo"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Meta General"
                variant="outlined"
                onChange={(e) => {
                  const metaValue = e.target.value;
                  setObjetivosSeleccionados((prev) =>
                    prev.map((obj) =>
                      obj.id === nuevoObjetivo.id
                        ? { ...obj, goal: metaValue }
                        : obj
                    )
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} sm={10} md={8}>
              <Autocomplete
                multiple
                limitTags={2}
                id="checkboxes-tags-demo"
                options={roles || []}
                disableCloseOnSelect
                onChange={(_event, value) => {
                  saveRoles(value);
                }}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => {
                  const { key, ...optionProps } = props;
                  return (
                    <li key={key} {...optionProps}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Roles" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={2} md={4}>
              <IconButton color="primary" onClick={handleSaveObjective}>
                <Iconify icon="mingcute:check-2-line" />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => handleCancelObjective(nuevoObjetivo)}
              >
                <Iconify icon="flat-color-icons:cancel" />
              </IconButton>
            </Grid>
          </>
        )}
        <br />
        {!mostrarOpciones && objetivosSeleccionados.length > 0 && (
          <Grid container spacing={2} padding={2}>
            {objetivosSeleccionados.map((obj) => (
              <Grid item key={obj.id}>
                <Chip
                  color="primary"
                  label={obj.name}
                  onDelete={removeObjective(obj.id)}
                  style={{ padding: '8px' }}
                  sx={{
                    '& .MuiChip-deleteIcon': {
                      '&:hover': {
                        color: 'red',
                      },
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </BaseDialog>
  );
};
