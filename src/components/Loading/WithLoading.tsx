import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import RocketSVGLoader from "./RocketLoading";

interface IWithLoadingProps {
    isLoading: boolean;
    initLoading: boolean;
}

const withLoading = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const LoadingComponent: React.FC<P & IWithLoadingProps> = ({
        isLoading,
        initLoading,
        ...props
    }: IWithLoadingProps) => {
        return isLoading ? (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                {initLoading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: 400
                        }}
                    >
                        <RocketSVGLoader
                            viewBox="0 0 800 800"
                            width="200px"
                            height="200px"
                            sx={(theme) => ({
                                "&.MuiSvgIcon-root": {
                                    width: "200px",
                                    height: "200px"
                                }
                            })}
                        />
                    </Box>
                ) : (
                    <CircularProgress />
                )}
            </Box>
        ) : (
            <WrappedComponent {...(props as P)} />
        );
    };
    return LoadingComponent;
};

export default withLoading;
