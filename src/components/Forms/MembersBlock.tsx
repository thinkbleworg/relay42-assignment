import React, {useState, useEffect} from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import {useFormContext, useFieldArray} from "react-hook-form";

import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

import {TMemberForm} from "./schema";

interface IMemberLayout {
    field: TMemberForm;
    idx: number;
    handleRemoveMember: (idx: number) => void;
}

const MemberLayout = (props: IMemberLayout) => {
    const {watch} = useFormContext();

    const type = watch(`memberList.${props.idx}.type`);

    // console.log("type in member layout --->", type);

    return (
        <Box sx={{py: 4, px: 2, display: "flex", maxWidth: "75rem", alignItems: "flex-start"}}>
            <TextInput
                name={`memberList.${props.idx}.name`}
                required
                fullWidth
                arrayIndex={props.idx}
                label="Name"
                type="text"
                sx={{mr: 5}}
            />
            <SelectInput
                name={`memberList.${props.idx}.type`}
                label="Type"
                required
                fullWidth
                arrayIndex={props.idx}
                sx={{mr: 5, maxWidth: "150px"}}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value="Pilot">Pilot</MenuItem>
                <MenuItem value="Engineer">Engineer</MenuItem>
                <MenuItem value="Passenger">Passenger</MenuItem>
            </SelectInput>
            {(type === "Pilot" || type === "Engineer") && (
                <TextInput
                    name={`memberList.${props.idx}.experience`}
                    required={type === "Pilot" || type === "Engineer"}
                    fullWidth
                    label="Experience"
                    type="number"
                    arrayIndex={props.idx}
                    InputProps={{inputProps: {min: 1, max: 30}}}
                    sx={{mr: 5}}
                />
            )}
            {type === "Passenger" && (
                <TextInput
                    name={`memberList.${props.idx}.age`}
                    required={type === "Passenger"}
                    fullWidth
                    label="Age"
                    type="number"
                    arrayIndex={props.idx}
                    InputProps={{inputProps: {min: 1, max: 60}}}
                    sx={{mr: 5}}
                />
            )}
            {type === "Engineer" && (
                <SelectInput
                    name={`memberList.${props.idx}.job`}
                    label="Job"
                    required={type === "Engineer"}
                    fullWidth
                    arrayIndex={props.idx}
                    sx={{mr: 5}}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Navigation">Navigation</MenuItem>
                    <MenuItem value="Solar Panels">Solar Panels</MenuItem>
                    <MenuItem value="Maintenance">Maintenance</MenuItem>
                    <MenuItem value="Mechanics">Mechanics</MenuItem>
                    <MenuItem value="Fuelling">Fuelling</MenuItem>
                </SelectInput>
            )}
            {type === "Passenger" && (
                <TextInput
                    name={`memberList.${props.idx}.wealth`}
                    fullWidth
                    label="Wealth"
                    type="text"
                    arrayIndex={props.idx}
                    sx={{mr: 5}}
                />
            )}
            <Box sx={{py: 1}}>
                <IconButton
                    aria-label="Delete Member"
                    onClick={() => props.handleRemoveMember(props.idx)}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

const MembersBlock = (props: any) => {
    const {control} = useFormContext();

    const {fields, append, remove} = useFieldArray({
        control: control,
        name: "memberList"
    });

    const handleAddMember = () => {
        append({
            name: "",
            type: ""
        });
    };

    const handleRemoveMember = (idx: number) => {
        remove(idx);
    };

    // console.log("fields --->", fields);s

    return (
        <Paper sx={{width: "100%", mt: 3, mb: 2}}>
            <Box sx={{m: 1, p: 2, position: "relative"}}>
                <Typography variant="subtitle1" noWrap>
                    Members
                </Typography>
                <IconButton
                    aria-label="add member"
                    onClick={handleAddMember}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <AddIcon />
                </IconButton>
            </Box>

            {fields.map((field: TMemberForm, index: number) => (
                <Box key={`member-list-${field.id}`}>
                    <Divider />
                    <MemberLayout
                        field={field}
                        idx={index}
                        handleRemoveMember={handleRemoveMember}
                    />
                </Box>
            ))}
        </Paper>
    );
};

export default MembersBlock;
