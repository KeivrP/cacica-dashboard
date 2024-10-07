import { Controller, useForm } from "react-hook-form";
import { BaseDialog } from "../../../components/modal/CustomModal";
import { TextField } from "@mui/material";
import { useCreateRol } from "../hook/useSettings";
import { useEffect } from "react";
import { useBackdrop } from "../../../components/ui/backdrop";

interface NewRolProps {
    openF: boolean;
    handleCloseF: () => void;
}


const NewRol = ({ openF, handleCloseF }: NewRolProps) => {

    const { mutate, isPending } = useCreateRol();

    const { showLoading, hideLoading } = useBackdrop();

    useEffect(() => {
        if (isPending) {
            handleCloseF();

            showLoading('');
        } else {
            hideLoading()
        }
    }, [isPending])


    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
        }
    });

    useEffect(() => {
        reset();
    }, [openF, reset]);

    const onSubmit = (data: any) => {
        mutate(data);
    }


    return (

        <BaseDialog
            dialogOpen={openF}
            open={openF}
            handleClose={handleCloseF}
            title={"Nueva Sucursal"}
            confirmText={"Aceptar"}
            cancelText={"Cancelar"}
            confirm={() => handleSubmit(onSubmit)()}
            width="xs"
        >


            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Nombre de Rol"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    )}
                />
            </form>


        </BaseDialog>


    );
}

export default NewRol;