import React, { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Dialog,
    Typography,
    IconButton,
    DialogProps,
    DialogTitle as MuiDialogTitle,
    DialogContent as MuiDialogContent,
    DialogActions as MuiDialogActions,
} from '@mui/material';
import { Iconify } from '../iconify';

interface DialogTitleProps {
    children: ReactNode;
    onClose?: () => void;
}

export const DialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;
    return (
        <MuiDialogTitle {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    size="large"
                >
                    <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
};

interface DialogContentProps {
    children: ReactNode;
}

export const DialogContent = ((props: DialogContentProps) => {
    const { children, ...other } = props;
    const theme = useTheme();
    return (
        <MuiDialogContent style={{ paddingTop: theme.spacing(2) }} {...other}>
            {children}
        </MuiDialogContent>
    );
});

export const DialogActions = (props: { children: ReactNode }) => {
    const theme = useTheme();
    return (
        <MuiDialogActions style={{ margin: 0, padding: theme.spacing(1) }}>
            {props.children}
        </MuiDialogActions>
    );
};

interface BaseDialogProps extends DialogProps {
    width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    dialogOpen: boolean;
    handleClose: () => void;
    title?: string;
    description?: string;
    children: ReactNode;
    alternativeFooter?: ReactNode;
    cancelText?: string;
    confirm?: () => void;
    formId?: string;
    confirmText?: string;
}

export const BaseDialog = React.memo((props: BaseDialogProps) => {
    const {
        width,
        dialogOpen,
        handleClose,
        title,
        description,
        children,
        alternativeFooter,
        cancelText,
        confirm,
        formId,
        confirmText,
    } = props;

    return (
        <Dialog
            sx={{ borderRadius: '4px' }}
            fullWidth
            maxWidth={width || 'lg'}
            onClose={handleClose}
            open={dialogOpen}
        >
            <DialogTitle >
                <Typography style={{ fontSize: '16', fontWeight: 'bold', paddingTop: 10 }}>
                    {title || 'Nameless'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography>{description}</Typography>
                <Typography>{children}</Typography>
            </DialogContent>
            {alternativeFooter ? (
                alternativeFooter
            ) : (
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        <Typography textTransform="uppercase" style={{ color: '#007cd6' }}>
                            {cancelText || 'Cancel'}
                        </Typography>
                    </Button>
                    {confirm &&
                        (formId ? (
                            <Button type="submit" form={formId} color="secondary">
                                <Typography
                                    textTransform="uppercase"
                                    style={{ color: '#007cd6' }}
                                >
                                    {confirmText || 'Save'}
                                </Typography>
                            </Button>
                        ) : (
                            <Button onClick={confirm} color="secondary">
                                <Typography
                                    textTransform="uppercase"
                                    style={{ color: '#007cd6' }}
                                >
                                    {confirmText || 'Save'}
                                </Typography>
                            </Button>
                        ))}
                </DialogActions>
            )}
        </Dialog>
    );
});
