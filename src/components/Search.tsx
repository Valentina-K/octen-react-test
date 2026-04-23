import {useRef, useState} from "react";
import {CiSearch} from "react-icons/ci";
import {IoCloseOutline} from "react-icons/io5";
import {useQuery} from "@tanstack/react-query";
import {getMovieBySearch} from "../services/api.ts";
import {useDebounce} from "use-debounce";
import type {IMovie} from "../models/IMovie.ts";
import {useNavigate} from "react-router";

export const Search = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>("");
    const [debouncedSearch] = useDebounce(value, 1000);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const {data: movies, isLoading, isError} = useQuery({
        queryKey: ['search', value],
        queryFn: () => getMovieBySearch(debouncedSearch),
        enabled: !!debouncedSearch,
        staleTime: 0,
    });
    const handleSearch = () => {
        setIsOpen(true);
        inputRef.current?.focus();
    }
    const handleClose = () => {
        setIsOpen(false);
        setValue("");
        inputRef.current?.blur();
    }

    const gotoSearch = (movieId: number) => {
        handleClose();
        navigate(`./movies/${movieId}`)
    }
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error</p>
    return (
        <div className={'flex relative'}>
            <input id={'search'} ref={inputRef} type="text" className={`w-56 outline-none border-b-0`} value={value}
                   onChange={(e) => setValue(e.target.value)}/>
            <span
                className={`absolute bottom-0 right-8 h-0.5 bg-blue-950 transition-all duration-300 ${
                    isOpen ? "w-56" : "w-0"
                }`}
            />
            <div className={"relative w-8"}>
                <CiSearch className={`absolute top-1.5 left-2 ${value ? "hidden" : "visible"}`} onClick={handleSearch}/>
                <IoCloseOutline className={`absolute top-1.5 left-2 ${value ? "visible" : "hidden"}`}
                                onClick={handleClose}/>
            </div>
            {isOpen && movies && movies.length > 0 && (
                <ul className="absolute top-full left-0 w-full z-10 bg-white shadow-lg rounded-md mt-1 max-h-64 overflow-y-auto">
                    {movies?.map((movie: IMovie) => (
                        <li
                            key={movie.id}
                            onClick={() => gotoSearch(movie.id)}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                            <span className="font-semibold">{movie.title}</span>
                            <span className="text-sm text-gray-500 ml-2">
                {movie.release_date?.slice(0, 4)}
              </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};