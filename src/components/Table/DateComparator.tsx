import React, {useState, useEffect} from "react";

import {alpha} from "@mui/material/styles";
import Box from "@mui/material/Box";

import {findDateDifference} from "components/utils/utils";

interface IDateComparatorProps {
    departureDate: Date;
}

interface IHelperText {
    value: string;
    type: "Error" | "Normal";
}

const DEPARTED_TEXT = "Departed";

const DateComparator = (props: IDateComparatorProps) => {
    const {departureDate} = props;
    const [helperText, setHelperText] = useState<IHelperText>({
        value: "",
        type: "Normal"
    });

    const findDifference = (date: Date) => {
        const diff = findDateDifference(date);
        if (diff < 0) {
            setHelperText({
                value: DEPARTED_TEXT,
                type: "Error"
            });
        } else {
            setHelperText({
                value: `${diff.toString()} day${diff > 1 ? "s" : ""} to go`,
                type: "Normal"
            });
        }
    };

    useEffect(() => {
        findDifference(departureDate);
    }, [departureDate]);

    return (
        <Box>
            <div>{departureDate.toString()}</div>
            <Box
                sx={{
                    textAlign: "right",
                    fontSize: "10px",
                    fontStyle: "italic",
                    color: (theme) => {
                        return helperText.type === "Error"
                            ? theme.palette.error.main
                            : alpha(theme.palette.secondary.contrastText, 0.5);
                    }
                }}
            >
                {helperText.value}
            </Box>
        </Box>
    );
};

export default DateComparator;
