import {NavLink} from "react-router";

export const HomeMenu = ({path=""}: {path:string}) => {
    return (
        <div>
            <nav>
                <ul className={'flex gap-6'}>
                    <li><NavLink className={"hover:bg-purple-900 hover:font-bold hover:p-3 hover:text-white rounded-2xl transition-all duration-500 text-gray-500"
                    } to={`${path}/now_playing`}>Now Playing</NavLink></li>
                    <li><NavLink className={"hover:bg-purple-900 hover:font-bold hover:p-3 hover:text-white rounded-2xl transition-all duration-500 text-gray-500"
                    } to={`${path}/popular`}>Popular</NavLink></li>
                    <li><NavLink className={"hover:bg-purple-900 hover:font-bold hover:p-3 hover:text-white rounded-2xl transition-all duration-500 text-gray-500"
                    } to={`${path}/top`}>Top Rated</NavLink></li>
                    <li><NavLink className={"hover:bg-purple-900 hover:font-bold hover:p-3 hover:text-white rounded-2xl transition-all duration-500 text-gray-500"
                    } to={`${path}/latest`}>Latest</NavLink></li>
                    <li><NavLink className={"hover:bg-purple-900 hover:font-bold hover:p-3 hover:text-white rounded-2xl transition-all duration-500 text-gray-500"
                    } to={`${path}/upcoming`}>Upcoming</NavLink></li>
                </ul>
            </nav>
        </div>
    );
};