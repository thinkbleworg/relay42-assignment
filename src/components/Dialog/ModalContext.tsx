import React, {Context, createContext} from "react";

import {TDialogWidth, IDialogPropTypes} from "../types";

const ModalContext: Context<IDialogPropTypes> = createContext({
    showModal: (args: {
        title: string;
        component: React.ReactNode;
        okCallback: () => void;
        cancelCallback?: () => void;
        width?: TDialogWidth;
        okText?: string;
        cancelText?: string;
    }) => {
        console.log(args);
    },
    closeModal: () => void {}
});

export default ModalContext;
