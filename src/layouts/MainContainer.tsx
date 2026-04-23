import type {ReactNode} from "react";

export const MainContainer = ({children}: {children: ReactNode}) => {
    return (
        <div className={'pl-20 pr-20'}>{children}</div>
    );
};