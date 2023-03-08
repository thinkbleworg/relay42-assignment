import React, {useState, useEffect} from "react";
import Dialog, {DialogProps} from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

import ModalContext from "./ModalContext";
import {TDialogWidth, IDialogPropTypes, TOpenDialog, TEmptyFn} from "../utils/types";

interface IStateTypes {
    value: IDialogPropTypes;
    isOpen: boolean;
    title: string;
    okText?: string;
    cancelText?: string;
    width?: TDialogWidth;
    component: React.ReactNode;
    okCallback: (value: any) => void;
    cancelCallback?: TEmptyFn;
}

interface IPropTypes {
    children: React.ReactNode;
}

class DialogProvider2 extends React.Component<IPropTypes, IStateTypes> {
    constructor(props: IPropTypes) {
        super(props);

        this.state = {
            isOpen: false,
            title: "",
            okText: "Ok",
            cancelText: "Cancel",
            width: "md",
            component: null,
            okCallback: () => {
                // console.log("ok Callback");
            },
            cancelCallback: () => {
                // console.log("cancel callback");
            },
            value: {
                showModal: this.open,
                closeModal: this.close
            }
        };
    }

    open: TOpenDialog = ({
        component,
        title,
        okCallback,
        cancelCallback,
        width,
        okText,
        cancelText
    }) => {
        this.setState({
            component,
            title,
            okCallback,
            cancelCallback,
            width,
            okText,
            cancelText,
            isOpen: true
        });
    };

    close = (): void => {
        this.setState({isOpen: false});
    };

    handleClose = () => {
        if (this.state.cancelCallback) {
            this.state.cancelCallback();
        } else {
            this.close();
        }
    };

    render() {
        const {value, isOpen, width, title, okText, cancelText, component} = this.state;

        return (
            <ModalContext.Provider value={value}>
                <Dialog open={isOpen} onClose={this.handleClose} maxWidth={width} fullWidth>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    <DialogContent>{component}</DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            {cancelText}
                        </Button>
                        <Button onClick={this.state.okCallback} color="primary">
                            {okText}
                        </Button>
                    </DialogActions>
                </Dialog>
                {this.props.children}
            </ModalContext.Provider>
        );
    }
}

export default DialogProvider2;
