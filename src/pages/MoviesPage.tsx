import {movieFilters} from "../constants/filter.ts";
import {MoviesList} from "../components/MoviesList.tsx";
import {Filters} from "../components/Filters.tsx";
import {useState} from "react";
import {GenresList} from "../components/GenresList.tsx";

export const MoviesPage = () => {
    const [filter, setFilter] = useState<string>('popular');
    const [genreId, setGenreId] = useState<string>("");
    return (
        <div className={'flex justify-center flex-col items-center gap-10'}>
            <h1 className={'text-4xl font-bold'}>{movieFilters[filter].title}</h1>
            <Filters onSelect={setFilter} selectedFilter={filter} />
            <GenresList choiceGenreId={(id)=>setGenreId(id!==0 ? id.toString() : "")}/>
            <MoviesList filter={movieFilters[filter].apiParam} genreId={genreId}/>
        </div>
    );
};