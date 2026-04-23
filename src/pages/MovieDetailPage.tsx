import {MoviesListCard} from "../components/MoviesListCard.tsx";
import {useParams} from "react-router";

export const MovieDetailPage = () => {
    const {id} = useParams();
    return (
        <MoviesListCard movieId={Number(id)}/>
    );
};