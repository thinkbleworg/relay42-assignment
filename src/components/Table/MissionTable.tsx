import React, {useState, useEffect} from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/EditOutlined";

import TableTitleHeader from "./TableTitleHeader";
import TableHeader from "./TableHeader";
import DateComparator from "./DateComparator";

import {IDataList, IData, TSortOrder} from "components/utils/types";
import {getComparator, stableSort} from "components/utils/utils";

const MissionTable = (props: any) => {
    const data = props.missions;
    const [searchKey, setSearchKey] = useState<string>("");
    const [searched, setSearched] = useState<IDataList>();
    const [rows, setRows] = useState([]);
    const [order, setOrder] = useState<TSortOrder>("asc");
    const [orderBy, setOrderBy] = useState<keyof IData>("destination");
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IData) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCreateBtnClick = () => {
        props.modalTriggerCallback();
    };

    const handleEditItem = (event: React.MouseEvent<unknown>, id: string) => {
        // console.log("item to edit -->", id);
        const editMission = data.filter((item: IData) => item.id === id);
        props.modalTriggerCallback((editMission.length > 0 && editMission[0]) || undefined);
    };

    const updateSearchResults = (newRows: IDataList) => {
        setSearched(newRows);
    };

    const updateData = (newRows: IDataList) => {
        setSelected([]);
        props.setData(newRows);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    useEffect(() => {
        if (searchKey !== "" && searched) {
            setRows(searched);
        } else {
            setRows(data);
        }
    }, [searched, data, searchKey]);

    return (
        <Box sx={{width: "100%"}}>
            <Paper sx={{width: "100%", mb: 2}}>
                <TableTitleHeader
                    selected={selected}
                    numSelected={selected.length}
                    rows={data} //Sending original array of data
                    updateData={updateData}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    updateSearchResults={updateSearchResults}
                    handleCreateBtnClick={handleCreateBtnClick}
                />
                <TableContainer sx={{maxHeight: 350}}>
                    <Table
                        stickyHeader
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size={"medium"}
                    >
                        <TableHeader
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index: number) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `mission-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby": labelId
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.missionName}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.memberList.length}
                                            </TableCell>
                                            <TableCell>{row.destination}</TableCell>
                                            <TableCell align="right">
                                                <DateComparator departureDate={row.departureDate} />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    aria-label="Edit Mission"
                                                    onClick={(e) => handleEditItem(e, row.id)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 55 * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    labelRowsPerPage="Missions per page:"
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default MissionTable;
