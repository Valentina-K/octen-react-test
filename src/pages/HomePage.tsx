import {Filters} from "../components/Filters.tsx";
import {useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getMoviesByFilter} from "../services/api.ts";
import type {IMovie} from "../models/IMovie.ts";
import {movieFilters} from "../constants/filter.ts";
import {CircularSlider} from "../components/CircularSlider.tsx";


export const HomePage = () => {
    const [filter, setFilter] = useState<string>('popular');
    const queryClient = useQueryClient();
    const cachedMovies = queryClient.getQueryData<IMovie[]>(["movies",movieFilters[filter].apiParam,]);
    const {data: response} = useQuery({
        queryKey: ["movies",filter],
        queryFn: () => getMoviesByFilter({filter: movieFilters[filter].apiParam, page:1}),
        staleTime: 5000,
        enabled: !cachedMovies,
    })
    return (
        <div className={'flex justify-center flex-col items-center'}>
            <h1 className={'text-4xl font-bold mb-10'}>Discover Unlimited Content</h1>
            <Filters onSelect={setFilter} selectedFilter={filter} />
            { response?.results
                ? <CircularSlider movies={response?.results.slice(0,10)} />
                : null}
        </div>
    );
};