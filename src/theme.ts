import {createTheme} from "@mui/material/styles";
import {red} from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: "#EC6637"
        },
        secondary: {
            main: "#BE7C5A",
            contrastText: "#000"
        },
        error: {
            main: red.A400
        }
    }
});

export default theme;
