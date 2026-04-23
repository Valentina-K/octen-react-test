import type {IMovie} from "../models/IMovie.ts";
import {getGenres, getImagesByMovieId, getMovieById} from "../services/api.ts";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {StarRating} from "./StarsRating.tsx";
import {useEffect, useState} from "react";
import type {IGenre} from "../models/IGenre.ts";
import {GenreBadge} from "./GenreBadge.tsx";
import {colorClasses} from "../constants/colors.ts";

export const MoviesListCard = ({movieId}: { movieId: number }) => {
    const queryClient = useQueryClient();
    const cachedMovies = queryClient.getQueryData<IMovie>(["movies", movieId,]);
    const [posterPath, setPosterPath] = useState<string>("");

    const {data: genres = []} = useQuery({
        queryKey: ["genres"],
        queryFn: getGenres,
        staleTime: 1000 * 60 * 60 * 24,
    });

    const {data: movie, isLoading, isError} = useQuery({
        queryKey: ["movies", movieId],
        queryFn: () => getMovieById(movieId),
        staleTime: 1000 * 60 * 60,
        enabled: !cachedMovies,
    })
    const resultMovie = cachedMovies || movie;
    const {data: images, isLoading: isImageLoading} = useQuery({
        queryKey: ['images', movieId],
        queryFn: () => getImagesByMovieId(movieId),
        staleTime: 1000 * 60 * 60
    })

    useEffect(() => {
        if (!isImageLoading && images && images.length > 0) {
            setPosterPath(images[0].file_path);
        }
    }, [isImageLoading, images]);

    const movieGenres: IGenre[] =
        resultMovie?.genre_ids ?
        genres.filter((g) => resultMovie?.genre_ids?.includes(g.id))
            : resultMovie?.genres ? resultMovie.genres : [];

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;
    const rating = movie ? movie.vote_average : 0;
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%), url(https://image.tmdb.org/t/p/w1280${posterPath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: "0.8"
            }}
            className="w-full h-[100vh] text-white p-5 rounded-lg"
        >
            <div className={'w-[500px] mb-5'}>
                <h1 className={'text-5xl font-extrabold'}>{resultMovie?.title}</h1>
                <h2 className={'text-3xl align-middle'}>({resultMovie?.original_title})</h2>
            </div>
            <p>Popularity: {resultMovie?.popularity}</p>
            <div className={'flex gap-2'}><StarRating
                rating={rating}/> {resultMovie?.vote_average} ({resultMovie?.vote_count})
            </div>

            <p>Release date: {resultMovie?.release_date}</p>
            <p className={'w-1/3 h-1/2 overflow-y-auto text-2xl mt-2.5 mb-2.5'}>{resultMovie?.overview}</p>
            <p className={'text-xl mb-3'}>Original language: <span className={'uppercase'}>{movie?.original_language}</span></p>
            <div className={'flex gap-2 items-center text-2xl'}>Genres: {movieGenres.map((g: IGenre, i: number) => (
                <GenreBadge key={i} color={colorClasses[i]} isChoice={false}>{g.name}</GenreBadge>))}
            </div>
        </div>
    );
};