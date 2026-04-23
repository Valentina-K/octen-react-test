import {NavLink} from "react-router";
import {Search} from "../components/Search.tsx";
import {UserInfo} from "../components/UserInfo.tsx";

export const Header = () => {
    return (
        <header className={'flex justify-between p-5 mb-10'}>
            <nav>
                <ul className={'flex gap-7 text-2xl'}>
                    <li><NavLink  className={({ isActive }) =>
                        isActive ? "text-blue-900 font-bold underline" : "hover:text-purple-900 font-semibold transition-all duration-500 text-gray-500"
                    } to={''} end>Home</NavLink></li>
                    <li><NavLink  className={({ isActive }) =>
                        isActive ? "text-blue-900 font-bold underline" : "hover:text-purple-900 font-semibold transition-all duration-500 text-gray-500"
                    } to={'movies'}>Movies</NavLink></li>
                </ul>
            </nav>
            <div className={'flex gap-2.5 items-center'}>
                <Search />
                <UserInfo />
            </div>
        </header>
    );
};