import {createRoot} from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router";
import {routes} from "./routes/routes";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClients = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClients}>
        <RouterProvider router={routes}/>
    </QueryClientProvider>
)
