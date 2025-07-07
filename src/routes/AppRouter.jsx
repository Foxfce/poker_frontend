import { Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router"



const guestRouter = createBrowserRouter([
    { path: '/', element: <div>LOG IN</div> },
    { path: '/news', element: <div>NEWS</div> },
    { path: '*', element: <Navigate to='/' replace /> },
]);

const userRouter = createBrowserRouter([
    {
        path: '/', element: <div>USER LAYOUT</div>,
        children: [
            { index: true, element: <div>HOME</div> },
            { path: '/profile', element: <div>FRIENDS</div> },
            { path: '*', element: <Navigate to='/' replace /> },
        ]
    },
])


function AppRouter() {
    const user = 'useUserStore';
    const finalRouter = user ? userRouter : guestRouter;

    return (
        <Suspense fallback={<p>Loading ...</p>}>
            <RouterProvider key={user?.id} router={finalRouter} />
        </Suspense>
    )
}

export default AppRouter