import { createBrowserRouter } from "react-router-dom";
import LayoutRoot from "../featured/layout";
import HomePage from "../featured/home/page";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutRoot/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            }
        ]
    }
])

export default router;