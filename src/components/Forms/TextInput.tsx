import React, {FC} from "react";
import TextField from "@mui/material/TextField";
import {TextFieldProps} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";

type TFormInputProps = {
    name: string;
    arrayIndex?: number;
} & TextFieldProps;

const TextInput: FC<TFormInputProps> = ({name, arrayIndex, value, ...otherProps}) => {
    const {
        control,
        formState: {errors}
    } = useFormContext();

    // console.log("errors in text input --->", errors);

    const hasError = (name: string, idx: number) => {
        if (idx === undefined) {
            return !!errors[name];
        } else {
            const field = name.split(".");
            if (Array.isArray(errors[field[0]])) {
                return errors[field[0]][idx] && !!errors[field[0]][idx][field[2]];
            }
        }
    };

    const getHelperText = (name: string, idx: number) => {
        if (idx === undefined) {
            return errors[name] ? errors[name].message.toString() : "";
        } else {
            const field = name.split(".");
            if (Array.isArray(errors[field[0]])) {
                return (
                    errors[field[0]][idx] &&
                    errors[field[0]][idx][field[2]] &&
                    errors[field[0]][idx][field[2]].message
                );
            }
        }
    };

    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({field}) => (
                <TextField
                    value={value}
                    {...otherProps}
                    {...field}
                    error={hasError(name, arrayIndex)}
                    helperText={getHelperText(name, arrayIndex)}
                />
            )}
        />
    );
};

export default TextInput;
