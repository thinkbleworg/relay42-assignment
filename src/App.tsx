import React, {useState, useEffect, useContext} from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import MissionTable from "components/Table/MissionTable";
import LogoBar from "components/Header/LogoBar";
import CreateMission from "components/Forms/CreateMission";
import withLoading from "components/Loading/WithLoading";
import {IDataList} from "components/utils/types";

import ModalContext from "components/Dialog/ModalContext";
import {IDialogPropTypes, IData} from "components/utils/types";
import {STATIC_TEXTS} from "components/utils/constants";

const MissionTableWithLoading = withLoading(MissionTable);

const App = () => {
    const [data, setData] = useState<IDataList>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {showModal, closeModal} = useContext<IDialogPropTypes>(ModalContext);

    const fetchJson = async () => {
        try {
            const response = await fetch("./data.json", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Accept: "application/json;odata.metadata=full",
                    "Content-Type": "application/json"
                }
            });
            const missionData = await response.json();
            setData((missionData && missionData.missions) || []);
            setIsLoading(false);
        } catch (e: any) {
            setIsLoading(false);
            console.log(e.message);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        setData([]);
        setTimeout(() => {
            fetchJson();
        }, 1000);
    }, []);

    const updateData = (updatedValue: IData) => {
        const updatedData: IDataList = data.map((item: IData) => {
            if (item.id === updatedValue.id) return updatedValue;
            return item;
        });
        setData(updatedData);
    };

    const getMissionNames = () => {
        return data.map((item: IData) => item.missionName);
    };

    const handleModalOkClick = (callbackValues: any) => {
        const {mode, values} = callbackValues;
        // new
        if (mode === "new") {
            setData([...data, values]);
        } else {
            // Edit
            updateData(values);
        }
        closeModal();
    };

    const handleModalCloseClick = () => {
        // console.log("close clicked");
        closeModal();
    };

    const modalTriggerCallback = (mission: IData) => {
        const mode = mission ? "edit" : "new";
        const component = (
            <CreateMission
                okCallback={handleModalOkClick}
                mode={mode}
                missionData={mission}
                existingMissionNames={getMissionNames()}
            />
        );
        showModal({
            component,
            title: mode === "edit" ? STATIC_TEXTS.EDIT_MISSION : STATIC_TEXTS.CONFIGURE_NEW_MISSION,
            okCallback: (values: any) => {
                handleModalOkClick(values);
            },
            cancelCallback: () => {
                handleModalCloseClick();
            },
            width: "lg"
        });
    };

    return (
        <Box>
            <LogoBar />
            <Container fixed>
                <Box sx={{my: 4}}>
                    <MissionTableWithLoading
                        missions={data}
                        isLoading={isLoading}
                        initLoading={true}
                        modalTriggerCallback={modalTriggerCallback}
                        setData={setData}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default App;
