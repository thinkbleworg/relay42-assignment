import React from "react";
import FormHelperText from "@mui/material/FormHelperText";

interface ICustomErrors {
    customError: string;
    className: string;
}

const CustomErrors = ({customError, className}: ICustomErrors) => {
    return (
        <FormHelperText className={className} error>
            {customError}
        </FormHelperText>
    );
};

export default CustomErrors;
