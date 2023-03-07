import React, {useState, useEffect} from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import HelloWorld from "components/HelloWorld";

import DialogProvider from "components/Dialog/DialogProvider";
import DialogProvider2 from "components/Dialog/DialogProvider2";
import MissionTable from "components/Table/MissionTable";
import LogoBar from "components/Header/LogoBar";
import withLoading from "components/Loading/WithLoading";
import {IDataList} from "components/types";

// const MissionTableWithLoading = withLoading(MissionTable);

const App = () => {
    const [data, setData] = useState<IDataList>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchJson = () => {
        fetch("./data.json", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json;odata.metadata=full",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setData((data && data.missions) || []);
                setIsLoading(false);
            })
            .catch((e: Error) => {
                console.log(e.message);
            });
    };

    useEffect(() => {
        setIsLoading(true);
        setData([]);
        setTimeout(() => {
            fetchJson();
        }, 1000);
    }, []);

    return (
        <DialogProvider>
            <Box>
                <LogoBar />
                <Container fixed>
                    <Box sx={{my: 4}}>
                        {/* <MissionTableWithLoading missions={data} isLoading={isLoading} /> */}
                        {data && data.length && !isLoading && <MissionTable missions={data} />}
                    </Box>
                </Container>
            </Box>
        </DialogProvider>
    );
};

export default App;
