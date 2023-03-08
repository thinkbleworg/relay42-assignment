import React, {FC} from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {SelectProps} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import {Controller, useFormContext} from "react-hook-form";

type TFormInputProps = {
    name: string;
} & SelectProps;

const SelectInput: FC<TFormInputProps> = ({name, children, label, sx, ...otherProps}) => {
    const {
        control,
        formState: {errors}
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({field}) => (
                <FormControl sx={{m: 1, width: 100, mt: 0, ...sx}} fullWidth>
                    <InputLabel id={`select-${label}`}>{label}</InputLabel>
                    <Select labelId={`select-${label}`} {...otherProps} {...field}>
                        {children}
                    </Select>
                    <FormHelperText>
                        {errors[name] ? errors[name].message.toString() : ""}
                    </FormHelperText>
                </FormControl>
            )}
        />
    );
};

export default SelectInput;
