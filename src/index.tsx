import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import App from "./App";
import theme from "./theme";

import DialogProvider from "components/Dialog/DialogProvider";
// import DialogProvider2 from "components/Dialog/DialogProvider2";

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <DialogProvider>
            <App />
        </DialogProvider>
    </ThemeProvider>,
    document.getElementById("root")
);
