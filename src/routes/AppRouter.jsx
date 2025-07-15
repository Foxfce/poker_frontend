import { Suspense, useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router"
import TableSession from "../pages/tables/TableSession";
import TableLobby from "../pages/tables/TableLobby";
import SocketListenner from "../components/SocketListenner";



const guestRouter = createBrowserRouter([
    { path: '/', element: <Navigate to='/table' replace /> },
    { path: '/news', element: <div>NEWS</div> },
    { path: '/table', element: <TableLobby /> },
    { path: '/table/:tableId', element: <TableSession /> },
    { path: '*', element: <Navigate to='/' replace /> },
]);

const userRouter = createBrowserRouter([
    {
        path: '/', element: <div>USER LAYOUT</div>,
        children: [
            { index: true, element: <div>HOME</div> },
            { path: '/profile', element: <div>PROFILE</div> },
            { path: '/tournament', element: <div>TOURNAMENT</div> },
            { path: '/table', element: <TableSession /> },
            { path: '/table/:tableId', element: <TableSession /> },
            { path: '*', element: <Navigate to='/' replace /> },
        ]
    },
])


function AppRouter() {
    const user = '';
    const finalRouter = user ? userRouter : guestRouter;

    return (
        <Suspense fallback={<p>Loading ...</p>}>
            <RouterProvider key={user?.id} router={finalRouter} />
        </Suspense>
    )
}

export default AppRouter