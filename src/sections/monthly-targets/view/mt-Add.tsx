import { Controller, useForm } from "react-hook-form";
import { BaseDialog } from "../../../components/modal/CustomModal";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { useBackdrop } from "../../../components/ui/backdrop";
import { useAddTargetReport } from "../hook/useMT";

interface AddTargetProps {
    openF: boolean;
    handleCloseF: () => void;
    id: number;
}


const AddTarget = ({ openF, handleCloseF, id }: AddTargetProps) => {

    const { mutate, isPending } = useAddTargetReport();

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
            targetReportado: ""
        }
    });

    useEffect(() => {
        reset();
    }, [openF, reset]);

    const onSubmit = (item: any) => {
        const data = {
            id: id,
            target_reported: item.targetReportado
        }
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
                    name="targetReportado"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Reportar meta alcanzada"
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

export default AddTarget;