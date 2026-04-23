import type {IMovie} from "../models/IMovie.ts";
import type {IGenre} from "../models/IGenre.ts";
import {useQuery} from "@tanstack/react-query";
import {getGenres} from "../services/api.ts";
import {PosterPreview} from "./PosterPreview.tsx";

export const MovieInfo = ({movie}: { movie: IMovie }) => {
    const {data: genres = []} = useQuery({
        queryKey: ["genres"],
        queryFn: getGenres,
        staleTime: 1000 * 60 * 60 * 24,
    });
    const movieGenres: IGenre[] =
        movie.genre_ids ?
            genres.filter((g) => movie.genre_ids?.includes(g.id))
            : movie.genres ? movie.genres : [];
    return (
        <div className="group w-2xs h-96 [perspective:1000px]">
            <div
                className="relative w-full h-full transition-transform duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <PosterPreview movie={movie}/>
                <div className="absolute inset-0 bg-gray-700 text-white p-4 rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <h2 className={'text-xl'}>{movie.title}</h2>
                    <p className={'h-3/4 overflow-y-auto mb-1.5'}>{movie.overview}</p>
                    <div
                        className={'flex gap-2 flex-wrap items-center text-2xs'}>Genres: <span className={'text-xs'}>{movieGenres.map((g: IGenre) => g.name).join(', ')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};