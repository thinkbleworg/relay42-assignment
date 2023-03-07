import React, {useState} from "react";

import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import {visuallyHidden} from "@mui/utils";

import {TSortOrder, IData} from "components/types";

interface HeadItems {
    disablePadding: boolean;
    id: keyof IData;
    label: string;
    numeric: boolean;
}

const headItems: readonly HeadItems[] = [
    {
        id: "missionName",
        numeric: false,
        disablePadding: true,
        label: "Mission Name"
    },
    {
        id: "memberList",
        numeric: true,
        disablePadding: false,
        label: "Members"
    },
    {
        id: "destination",
        numeric: false,
        disablePadding: false,
        label: "Destination"
    },
    {
        id: "departureDate",
        numeric: false,
        disablePadding: false,
        label: "Departure"
    }
];

interface ITableHeadProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IData) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: TSortOrder;
    orderBy: string;
    rowCount: number;
}

export default function TableHeader(props: ITableHeadProps) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property: keyof IData) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "Select all missions"
                        }}
                    />
                </TableCell>
                {headItems.map((item) => (
                    <TableCell
                        key={item.id}
                        align={item.numeric ? "right" : "left"}
                        padding={item.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === item.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === item.id}
                            direction={orderBy === item.id ? order : "asc"}
                            onClick={createSortHandler(item.id)}
                        >
                            {item.label}
                            {orderBy === item.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell align="left" />
            </TableRow>
        </TableHead>
    );
}
