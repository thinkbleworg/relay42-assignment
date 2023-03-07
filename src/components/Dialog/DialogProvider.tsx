import React, {useState, useEffect} from "react";
import Dialog, {DialogProps} from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

import ModalContext from "./ModalContext";
import {TDialogWidth, IDialogPropTypes, TOpenDialog, TEmptyFn} from "../types";

interface IStateTypes {
    value: IDialogPropTypes;
    isOpen: boolean;
    title: string;
    okText?: string;
    cancelText?: string;
    width?: TDialogWidth;
    component: React.ReactNode;
    okCallback: TEmptyFn;
    cancelCallback?: TEmptyFn;
}

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
            <Dialog open={isOpen} onClose={handleClose} maxWidth={width} fullWidth>
                {title && <DialogTitle>{title}</DialogTitle>}
                <DialogContent>{component}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        {cancelText}
                    </Button>
                    <Button onClick={okCallback} color="primary">
                        {okText}
                    </Button>
                </DialogActions>
            </Dialog>
            {props.children}
        </ModalContext.Provider>
    );
};

export default DialogProvider;
