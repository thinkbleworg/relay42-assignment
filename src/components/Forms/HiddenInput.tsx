import React, {FC} from "react";
import {TextFieldProps} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";

type TFormInputProps = {
    name: string;
    arrayIndex?: number;
} & TextFieldProps;

const HiddenInput: FC<TFormInputProps> = ({name, arrayIndex, ...otherProps}) => {
    const {
        control,
        formState: {errors}
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({field}) => <input {...field} type="hidden" />}
        />
    );
};

export default HiddenInput;
