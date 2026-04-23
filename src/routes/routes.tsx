import {createBrowserRouter} from "react-router";
import {MainLayout} from '../layouts/MainLayout';
import {MoviesPage} from '../pages/MoviesPage';
import {MovieDetailPage} from '../pages/MovieDetailPage';
import {HomePage} from "../pages/HomePage";

export const routes = createBrowserRouter([{
    path: "/octen-react", element: <MainLayout />, children: [
        {path: "", element: <HomePage />},
        {path: "movies", element: <MoviesPage />},
        {path: "movies/:id", element: <MovieDetailPage />},
    ]

}])