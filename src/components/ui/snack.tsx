import React, { useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { useSnackbar } from 'notistack';
import { Iconify } from '../iconify';

interface CloseProps {
    dismiss: () => void;
}

const Close: React.FC<CloseProps> = (props) => (
    <Tooltip title="Cerrar">
        <Iconify icon="ri:close-fill" color="action" onClick={props.dismiss} />
    </Tooltip>
);
interface SnackActionProps {
    dismiss: () => void;
}

export const SnackAction: React.FC<SnackActionProps> = (props) => {
    return <Close dismiss={props.dismiss} />;
};

interface ErrorSnackActionProps {
    dismiss: () => void;
    retry?: () => void;
}

export const ErrorSnackAction: React.FC<ErrorSnackActionProps> = (props) => {
    return (
        <>
            {props.retry && <Iconify icon="logos:close"  color="action" onClick={props.retry} />}
            <Close dismiss={props.dismiss} />
        </>
    );
};
export const useCustomSnackbar = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const eSnack = useCallback((msg: string, retry?: () => void) => {
        return enqueueSnackbar(msg || 'Unexpected Error', {
            variant: 'error',
            persist: true,
            action: (key) => (
                <ErrorSnackAction dismiss={() => closeSnackbar(key)} retry={retry} />
            ),
        });
    }, [enqueueSnackbar, closeSnackbar]);

    const sSnack = useCallback((msg: string) => enqueueSnackbar(msg, { variant: 'success' }), [
        enqueueSnackbar,
    ]);
    const iSnack = useCallback((msg: string) => enqueueSnackbar(msg, { variant: 'info', autoHideDuration: 2000 }), [
        enqueueSnackbar,
    ]);

    return { eSnack, iSnack, sSnack };
};
