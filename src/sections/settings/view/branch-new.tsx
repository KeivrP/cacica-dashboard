import { Controller, useForm } from "react-hook-form";
import { BaseDialog } from "../../../components/modal/CustomModal";
import { TextField } from "@mui/material";
import { useCreateBranch } from "../hook/useSettings";
import { useEffect } from "react";
import { useBackdrop } from "../../../components/ui/backdrop";

interface NewBranchProps {
    openF: boolean;
    handleCloseF: () => void;
}


const NewBranch = ({ openF, handleCloseF }: NewBranchProps) => {

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            location: ""
        }
    });

    const { mutate, isPending } = useCreateBranch();
    const { showLoading, hideLoading } = useBackdrop();

    useEffect(() => {
        if (isPending) {
            handleCloseF();

            showLoading('');
        } else {
            hideLoading()
        }
    }, [isPending])



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
                            label="Nombre de Sucursal"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    )}
                />
                <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Localización"
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

export default NewBranch;