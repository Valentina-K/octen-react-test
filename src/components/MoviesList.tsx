import {type FC, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getMoviesByGenreAndFilter} from "../services/api.ts";
import type {IMovie} from "../models/IMovie.ts";
import {Link} from "react-router";
import {MovieInfo} from "./MovieInfo.tsx";
import {MyPagination} from "./MyPagination.tsx";

type MovieListProps = {
    filter: string;
    genreId?: string;
}
export const MoviesList: FC<MovieListProps> = ({filter, genreId = ""}) => {
        const [page, setPage] = useState<number>(1);
        const {data: response, isLoading, isError} = useQuery({
            queryKey: ["movies", filter, genreId, page],
            queryFn: () => getMoviesByGenreAndFilter(genreId, filter, page),
            staleTime: 1000 * 60 * 60,
        })

        if (isLoading) return <p>Loading...</p>;
        if (isError) return <p>Error...</p>;
        let maxPages = Math.min(response?.total_pages || 1, 500);
        return (
            <section className={'flex justify-center flex-col items-center'}>
                <div className={'flex flex-wrap gap-5 justify-center'}>
                    {response?.results.slice(0, 60).map((movie: IMovie) =>
                        <Link to={`${movie.id}`} key={movie.id}>
                            <MovieInfo movie={movie}/>
                        </Link>)}
                </div>

                <MyPagination
                    current={page}
                    totalPage={maxPages}
                    onChange={setPage}
                />
            </section>
        );
    }
;