import React from "react";
import {IDialogPropTypes} from "../types";
import ModalContext from "./ModalContext";

const withDialog = <P extends IDialogPropTypes>(Component: React.ComponentType<P>) => {
    const dialogComponent: React.FC<P & IDialogPropTypes> = (props) => {
        return (
            <ModalContext.Consumer>
                {(context) => (
                    <Component
                        {...(props as P)}
                        showModal={context.showModal}
                        closeModal={context.closeModal}
                    />
                )}
            </ModalContext.Consumer>
        );
    };
    return dialogComponent;
};
export default withDialog;
