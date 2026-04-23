import {useQuery} from "@tanstack/react-query";
import {getGenres} from "../services/api.ts";
import type {IGenre} from "../models/IGenre.ts";
import {GenreBadge} from "./GenreBadge.tsx";
import {colorClasses} from "../constants/colors.ts";
import {type FC, useEffect, useState} from "react";

type GenresProps = {
    choiceGenreId: (id: number) => void;
}
export const GenresList: FC<GenresProps> = ({choiceGenreId}) => {
    const [genreId, setGenreId] = useState<number>(0)
    const {data: genres = [], isLoading, isError} = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
        staleTime: 1000 * 60 * 60 * 24,
    });

    const handleClick = (id: number) => {
        setGenreId(prevState => prevState === id ? 0 : id);
    }

    useEffect(() => {
        choiceGenreId(genreId);
    }, [genreId])

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error...</p>;
    return (
        <div className={'flex gap-2 flex-wrap w-1/2 justify-center'}>
            {genres.map((genre: IGenre, ind: number) =>
                <GenreBadge key={genre.id} color={colorClasses[ind]} isChoice={genreId === genre.id}>
                    <div onClick={() => handleClick(genre.id)}>
                        {genre.name}
                    </div>
                </GenreBadge>)}
        </div>
    );
};