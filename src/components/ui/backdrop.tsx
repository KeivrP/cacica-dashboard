import React, { useContext, useState, createContext, useCallback } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { Dispatch, SetStateAction } from "react";

const BackdropContext = createContext<{
    openBackdrop: boolean;
    setOpenBackdrop: Dispatch<SetStateAction<boolean>>;
    backdropMsg: string;
    setBackdropMsg: Dispatch<SetStateAction<string>>;
    showLoading: (msg: string) => void;
    hideLoading: () => void;
}>({
    // Datos iniciales del contexto
    openBackdrop: false,
    setOpenBackdrop: () => {},
    backdropMsg: "",
    setBackdropMsg: () => {},
    showLoading: () => {},
    hideLoading: () => {},
});

export const useBackdrop = () => useContext(BackdropContext); // Exportando el hook

export const BackdropGlobal = ({ children }: { children : React.ReactNode}) => {
    // Componente Backdrop
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [backdropMsg, setBackdropMsg] = useState("");

    const showLoading = useCallback((msg : string) => {
        setBackdropMsg(msg);
        setOpenBackdrop(true);
    }, []);

    const hideLoading = useCallback(() => {
        setBackdropMsg("");
        setOpenBackdrop(false);
    }, []);

    return (
        <BackdropContext.Provider
            value={{
                openBackdrop,
                setOpenBackdrop,
                backdropMsg,
                setBackdropMsg,
                showLoading,
                hideLoading,
            }}
        >
            {children}
            <Backdrop open={openBackdrop}>
                <div className="flex justify-content-center">
                    <CircularProgress color="inherit" />
                </div>
             
            </Backdrop>
        </BackdropContext.Provider>
    );
};
