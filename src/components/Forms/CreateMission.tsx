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

import {missionSchema, TMissionForm} from "./schema";

const CreateMission = () => {
    const [loading, setLoading] = useState(false);

    const methods = useForm<TMissionForm>({
        mode: "all",
        resolver: zodResolver(missionSchema),
        defaultValues: {
            missionName: "",
            destination: "Mars Alpha - 100",
            departureDate: "2023-03-01",
            memberList: [
                {name: "", type: "Pilot", experience: 10},
                {name: "", type: "Passenger", age: undefined, wealth: ""}
            ]
        }
    });

    const {
        control,
        reset,
        register,
        getValues,
        handleSubmit,
        formState: {isSubmitSuccessful, errors}
    } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<TMissionForm> = (values) => {
        console.log(values);
    };

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
                    <TextInput name="id" required label="Mission Id" type="text" hidden />

                    <TextInput
                        name="missionName"
                        required
                        fullWidth
                        label="Mission Name"
                        type="text"
                        sx={{mr: 5}}
                    />

                    <SelectInput name="destination" fullWidth label="Destination" sx={{mr: 5}}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Mars Alpha - 100">Mars Alpha - 100</MenuItem>
                        <MenuItem value="Mars Alpha - 111">Mars Alpha - 111</MenuItem>
                        <MenuItem value="Mars Alpha - 110">Mars Alpha - 110</MenuItem>
                        <MenuItem value="Mars Alpha - 110">Mars Alpha - 110</MenuItem>
                    </SelectInput>

                    <TextInput
                        name="departureDate"
                        required
                        fullWidth
                        label="Departure Date"
                        type="date"
                    />
                </Box>

                <MembersBlock />

                <Box sx={{textAlign: "right"}}>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={loading}
                        sx={{py: "0.8rem", mt: "1rem"}}
                    >
                        Create
                    </LoadingButton>
                </Box>
            </Box>
        </FormProvider>
    );
};
export default CreateMission;
