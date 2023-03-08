import React, {useState} from "react";

import {alpha} from "@mui/material/styles";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import InputBase from "@mui/material/InputBase";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";

import {IDataList, IData} from "components/utils/types";

interface TableTitleHeaderProps {
    selected: readonly string[]; //array of strings
    numSelected: number;
    rows: IDataList;
    updateData: any;
    updateSearchResults: any;
    handleCreateBtnClick: any;
    searchKey: string;
    setSearchKey: any;
}

export default function TableTitleHeader(props: TableTitleHeaderProps) {
    const {
        numSelected,
        selected,
        rows,
        updateData,
        updateSearchResults,
        searchKey,
        setSearchKey,
        handleCreateBtnClick
    } = props;
    const title = numSelected > 1 ? `${numSelected} Missions` : `${numSelected} Mission`;

    const handleSearch = (searchedVal: string) => {
        setSearchKey(searchedVal);
        const filteredRows = rows.slice().filter((row: any) => {
            return row.missionName.toLowerCase().includes(searchedVal.toLowerCase());
        });
        updateSearchResults(filteredRows);
    };

    const handleDelete = () => {
        // console.log("selected -->", selected);
        const filteredRows = rows.filter((row: IData) => {
            return !selected.includes(row.id);
        });
        updateData(filteredRows);
    };

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: "1 1 100%"}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {title}
                </Typography>
            ) : (
                <Typography sx={{flex: "1 1 100%"}} variant="h6" id="tableTitle">
                    Missions
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="Delete Mission" onClick={(e) => handleDelete()}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Box sx={{display: "flex"}}>
                    <Box
                        sx={(theme) => ({
                            position: "relative",
                            borderRadius: theme.shape.borderRadius,
                            backgroundColor: alpha(theme.palette.primary.main, 0.15),
                            "&:hover": {
                                backgroundColor: alpha(theme.palette.primary.main, 0.25)
                            },
                            ml: 0,
                            mr: "10px",
                            width: "100%",
                            [theme.breakpoints.up("sm")]: {
                                ml: theme.spacing(1),
                                width: "auto"
                            }
                        })}
                    >
                        <Box
                            sx={(theme) => ({
                                p: theme.spacing(0, 2),
                                height: "100%",
                                position: "absolute",
                                pointerEvents: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            })}
                        >
                            <SearchIcon />
                        </Box>
                        <InputBase
                            placeholder="Search"
                            type="text"
                            value={searchKey}
                            onChange={(e: any) => handleSearch(e.target.value)}
                            sx={(theme) => ({
                                color: "inherit",
                                "& .MuiInputBase-input": {
                                    p: theme.spacing(1, 1, 1, 0),
                                    pl: `calc(1em + ${theme.spacing(4)})`,
                                    pr: `calc(1em + ${theme.spacing(4)})`,
                                    transition: theme.transitions.create("width"),
                                    width: "100%",
                                    [theme.breakpoints.up("sm")]: {
                                        width: "10ch",
                                        "&:focus": {
                                            width: "20ch"
                                        }
                                    }
                                }
                            })}
                            inputProps={{
                                "aria-label": "Search Mission"
                            }}
                        />
                        {searchKey && (
                            <Box
                                sx={(theme) => ({
                                    p: theme.spacing(0, 2),
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    right: 0
                                })}
                            >
                                <IconButton aria-label="Reset" onClick={() => setSearchKey("")}>
                                    <CancelIcon />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        size="small"
                        onClick={(e) => {
                            e.preventDefault();
                            handleCreateBtnClick();
                        }}
                    >
                        Create
                    </Button>
                </Box>
            )}
        </Toolbar>
    );
}
