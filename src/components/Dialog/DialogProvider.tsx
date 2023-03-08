import React, {useState, useEffect} from "react";
import Dialog, {DialogProps} from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import ModalContext from "./ModalContext";
import {TDialogWidth, IDialogPropTypes, TOpenDialog, TEmptyFn} from "../types";

export interface IDialogTitleProps {
    children?: React.ReactNode;
    onClose: () => void;
}

const CustomDialogTitle = (props: IDialogTitleProps) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

interface IPropTypes {
    children: React.ReactNode;
}

const DialogProvider = (props: IPropTypes) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [okText, setOkText] = useState<string>("Ok");
    const [cancelText, setCancelText] = useState<string>("Cancel");
    const [width, setWidth] = useState<DialogProps["maxWidth"]>("md");
    const [component, setComponent] = useState<React.ReactNode>(null);
    const [okCallback, setOkCallback] = useState<TEmptyFn>(null);
    const [cancelCallback, setCancelCallback] = useState<TEmptyFn>(null);

    const openFn: TOpenDialog = ({
        component,
        title,
        width,
        okText,
        cancelText,
        okCallback,
        cancelCallback
    }) => {
        setComponent(component);
        setTitle(title);
        setWidth(width);
        setCancelText(cancelText);
        setOkText(okText);
        setOkCallback(() => () => {
            console.log("ok callback");
            okCallback();
        });
        setCancelCallback(() => () => {
            console.log("cancel callback");
            cancelCallback();
        });
        setIsOpen(true);
    };

    const closeFn: TEmptyFn = () => {
        setIsOpen(false);
    };

    const [value, setValue] = useState<IDialogPropTypes>({
        showModal: openFn,
        closeModal: closeFn
    });

    const handleClose = () => {
        debugger;
        if (cancelCallback) {
            cancelCallback();
        } else {
            closeFn();
        }
    };

    return (
        <ModalContext.Provider value={value}>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                maxWidth={width}
                fullWidth
                sx={(theme) => ({
                    "& .MuiDialogContent-root": {
                        p: theme.spacing(2)
                    },
                    "& .MuiDialogTitle-root + .MuiDialogContent-root": {
                        p: theme.spacing(2)
                    },
                    "& .MuiDialogActions-root": {
                        p: theme.spacing(1)
                    }
                })}
            >
                {title && <CustomDialogTitle onClose={handleClose}>{title}</CustomDialogTitle>}
                <DialogContent>{component}</DialogContent>
                {(okText || cancelText) && (
                    <DialogActions>
                        {cancelText && (
                            <Button onClick={handleClose} color="secondary">
                                {cancelText}
                            </Button>
                        )}
                        {okText && (
                            <Button onClick={okCallback} color="primary">
                                {okText}
                            </Button>
                        )}
                    </DialogActions>
                )}
            </Dialog>
            {props.children}
        </ModalContext.Provider>
    );
};

export default DialogProvider;
