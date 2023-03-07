import React, {useState, useEffect} from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface IWithLoadingProps {
    isLoading: boolean;
}

const withLoading = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const LoadingComponent: React.FC<P & IWithLoadingProps> = ({
        isLoading,
        ...props
    }: IWithLoadingProps) => {
        const [loading, setLoading] = useState<boolean>(isLoading);

        useEffect(() => {
            setLoading(isLoading);
        }, [isLoading]);

        console.log("props loading -->", props);

        return loading ? (
            <Box sx={{display: "flex"}}>
                <CircularProgress />
            </Box>
        ) : (
            <WrappedComponent {...(props as P)} />
        );
    };
    return LoadingComponent;
};

export default withLoading;
