import { Suspense, useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router"
import TableSession from "../pages/tables/TableSession";
import TableLobby from "../pages/tables/TableLobby";
import SocketWrapper from "../layouts/SocketWrapper";



const guestRouter = createBrowserRouter([
    { path: '/', element: <Navigate to='/table' replace /> },
    { path: '/news', element: <div>NEWS</div> },
    {
        path: '/table', element: (
            <SocketWrapper>
                <TableLobby />
            </SocketWrapper>
        )
    },
    {
        path: '/table/:tableId', element: (
            <SocketWrapper>
                <TableSession />
            </SocketWrapper>
        )
    },
    { path: '*', element: <Navigate to='/' replace /> },
]);

const userRouter = createBrowserRouter([
    {
        path: '/', element: <div>USER LAYOUT</div>,
        children: [
            { index: true, element: <div>HOME</div> },
            { path: '/profile', element: <div>PROFILE</div> },
            { path: '/tournament', element: <div>TOURNAMENT</div> },
            {
                path: '/table', element: (
                    <SocketWrapper>
                        <TableLobby />
                    </SocketWrapper>
                )
            },
            {
                path: '/table/:tableId', element: (
                    <SocketWrapper>
                        <TableSession />
                    </SocketWrapper>
                )
            },
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