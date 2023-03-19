import React, {useState} from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RocketIcon from "@mui/icons-material/Rocket";

const pages = [];
const settings = [];

const LogoBar = () => {
    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters>
                    <RocketIcon sx={{display: {xs: "flex"}, mr: 1}} />
                    <Box sx={{mt: "5px"}}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                display: "flex",
                                fontSize: "10px",
                                letterSpacing: ".3rem",
                                color: "inherit"
                            }}
                        >
                            Journey to
                        </Typography>
                        <Typography
                            variant="h4"
                            noWrap
                            component="a"
                            href={process.env.PRODUCTION ? "/relay42-assignment" : "/"}
                            sx={{
                                mr: 2,
                                display: "flex",
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none"
                            }}
                        >
                            MARS
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default LogoBar;
