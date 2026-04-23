import {Outlet} from "react-router";
import {Header} from "./Header.tsx";
import { MainContainer } from "./MainContainer";

export const MainLayout = () => {
    return (
        <MainContainer>
            <Header />
            <Outlet />
        </MainContainer>
    );
};