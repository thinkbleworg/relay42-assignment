import React, {useState, useEffect} from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import {useFormContext, useFieldArray} from "react-hook-form";

import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import CustomErrors from "./CustomFormError";
import {v4 as uuidv4} from "uuid";

import {memberJobs, memberTypes} from "../utils/constants";

import {TMemberForm} from "components/utils/schema";

interface IMemberLayout {
    idx: number;
    field: TMemberForm;
    handleRemoveMember: (idx: number) => void;
}

const MemberLayout = (props: IMemberLayout) => {
    const {watch, unregister} = useFormContext();

    const type = watch(`memberList.${props.idx}.type`);

    // console.log("type in member layout --->", type);

    // console.log("fields in member layout --->", props.field, props.idx);

    const handleReset = () => {
        //reset fields of other types for the member
        if (type === "Pilot") {
            unregister([
                `memberList.${props.idx}.age`,
                `memberList.${props.idx}.wealth`,
                `memberList.${props.idx}.job`
            ]);
        } else if (type === "Engineer") {
            unregister([`memberList.${props.idx}.age`, `memberList.${props.idx}.wealth`]);
        } else if (type === "Passenger") {
            unregister([`memberList.${props.idx}.experience`, `memberList.${props.idx}.job`]);
        }
    };

    useEffect(() => {
        handleReset();
    }, [type]);

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
                {memberTypes.map((type: any, idx: number) => (
                    <MenuItem value={type} key={`member-type-${idx}`}>
                        {type}
                    </MenuItem>
                ))}
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
                    defaultValue=""
                    arrayIndex={props.idx}
                    sx={{mr: 5}}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {memberJobs.map((job: any, idx: number) => (
                        <MenuItem value={job} key={`member-job-${idx}`}>
                            {job}
                        </MenuItem>
                    ))}
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
    const [customErrors, setCustomError] = useState<any>("");
    const {
        control,
        formState: {errors}
    } = useFormContext();

    const {fields, append, remove} = useFieldArray({
        control: control,
        name: "memberList"
    });

    const handleAddMember = () => {
        append({
            id: uuidv4(),
            name: "",
            type: ""
        });
    };

    const handleRemoveMember = (idx: number) => {
        remove(idx);
    };

    // Look for custom errors in messageList field
    useEffect(() => {
        if (errors && errors.memberList && errors.memberList.type === "custom") {
            setCustomError(errors.memberList.message);
        } else {
            setCustomError("");
        }
    }, [errors]);

    return (
        <Paper sx={{width: "100%", mt: 3, mb: 2}}>
            <Box sx={{m: 1, p: 2, position: "relative"}}>
                <Typography variant="subtitle1" noWrap>
                    Members
                </Typography>
                {customErrors !== "" && <CustomErrors customError={customErrors} />}
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
                        idx={index}
                        field={field}
                        handleRemoveMember={handleRemoveMember}
                    />
                </Box>
            ))}
        </Paper>
    );
};

export default MembersBlock;
