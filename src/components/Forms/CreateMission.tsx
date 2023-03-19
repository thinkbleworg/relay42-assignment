import React, {useState, useEffect} from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";

import {useForm, SubmitHandler, FormProvider} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {v4 as uuidv4} from "uuid";

import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import MembersBlock from "./MembersBlock";
import CustomErrors from "./CustomFormError";

import {
    NEW_MISSION_DATE_TO_SET,
    missionDestination,
    ERRORS,
    STATIC_TEXTS
} from "../utils/constants";
import {formatDate, findDateDifference} from "../utils/utils";

import {missionSchema, TMissionForm} from "../utils/schema";
import {IData} from "components/utils/types";

const CreateMission = (props: any) => {
    // console.log("props in create mission", props);
    const {mode, missionData, okCallback, existingMissionNames} = props;

    const [loading, setLoading] = useState<boolean>(false);
    const [missionNonEditable, setMissionNonEditable] = useState<boolean>(false);

    const STATIC_DEFAULT_VALUES = {
        id: uuidv4(),
        missionName: "",
        destination: "Mars Alpha - 100",
        departureDate: formatDate(new Date(Date.now() + NEW_MISSION_DATE_TO_SET * 86400000)),
        memberList: [
            {id: uuidv4(), name: "", type: "Pilot", experience: 10},
            {id: uuidv4(), name: "", type: "Passenger", age: 1, wealth: ""}
        ]
    };

    const methods = useForm<TMissionForm>({
        resolver: zodResolver(missionSchema),
        defaultValues: mode === "new" ? STATIC_DEFAULT_VALUES : missionData
    });

    const {
        control,
        reset,
        register,
        getValues,
        handleSubmit,
        watch,
        setError,
        formState: {isSubmitSuccessful, errors},
        clearErrors
    } = methods;

    const missionNameWatch = watch(`missionName`);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            clearErrors();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<TMissionForm> = (values) => {
        // console.log(values);
        if (okCallback) {
            okCallback({mode, values: values});
        }
    };

    const validateDepartedMissions = () => {
        if (mode === "edit" && missionData && missionData.hasOwnProperty("departureDate")) {
            //Check for departed missions and disable submit button
            const diff = findDateDifference(missionData.departureDate);
            diff < 0 ? setMissionNonEditable(true) : setMissionNonEditable(false);
        } else {
            setMissionNonEditable(false);
        }
    };

    const validateMissionNameField = () => {
        if (existingMissionNames && mode !== "edit") {
            if (
                existingMissionNames.length > 0 &&
                existingMissionNames
                    .map((str) => str.toLowerCase())
                    .includes(missionNameWatch.toLowerCase())
            ) {
                // set error
                setError("missionName", {
                    type: "custom",
                    message: ERRORS.MISSION_NAME.ALREADY_PRESENT
                });
            } else {
                clearErrors("missionName");
            }
        }
    };

    useEffect(() => {
        validateDepartedMissions();
    }, [mode, missionData]);

    useEffect(() => {
        validateMissionNameField();
    }, [missionNameWatch]);

    console.log(errors);

    return (
        <FormProvider {...methods}>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <Box sx={{display: "flex", maxWidth: "75rem", alignItems: "flex-start"}}>
                    <TextInput
                        name="missionName"
                        required
                        fullWidth
                        label="Mission Name"
                        type="text"
                        disabled={mode === "edit" || missionNonEditable}
                        sx={{mr: 5}}
                    />

                    <SelectInput
                        name="destination"
                        fullWidth
                        label="Destination"
                        sx={{mr: 5}}
                        disabled={missionNonEditable}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {missionDestination.map((destination: any, idx: number) => (
                            <MenuItem value={destination} key={`mission-destination-${idx}`}>
                                {destination}
                            </MenuItem>
                        ))}
                    </SelectInput>

                    <TextInput
                        name="departureDate"
                        required
                        fullWidth
                        label="Departure Date"
                        type="date"
                        disabled={missionNonEditable}
                        inputProps={{
                            min: formatDate(new Date().toLocaleDateString())
                        }}
                    />
                </Box>

                <MembersBlock missionNonEditable={missionNonEditable} />

                <Box
                    sx={{
                        textAlign: "right",
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center"
                    }}
                >
                    {missionNonEditable && (
                        <Box sx={{mr: 2}}>
                            <CustomErrors
                                customError={ERRORS.DEPARTED_MISSION}
                                className="mission-errors"
                            />
                        </Box>
                    )}
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={loading}
                        disabled={missionNonEditable}
                        sx={{py: "0.8rem", mt: "1rem"}}
                    >
                        {mode === "edit" ? (
                            <React.Fragment>{STATIC_TEXTS.EDIT}</React.Fragment>
                        ) : (
                            <React.Fragment>{STATIC_TEXTS.CREATE}</React.Fragment>
                        )}
                    </LoadingButton>
                </Box>
            </Box>
        </FormProvider>
    );
};
export default CreateMission;
