import React from "react";
import FormHelperText from "@mui/material/FormHelperText";

interface ICustomErrors {
    customError: string;
}

const CustomErrors = ({customError}: ICustomErrors) => {
    return <FormHelperText error>{customError}</FormHelperText>;
};

export default CustomErrors;
