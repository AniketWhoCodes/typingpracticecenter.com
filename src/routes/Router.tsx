import { lazy } from "react";
import { Navigate } from "react-router-dom";

const FullLayout = lazy(() => import("../layouts/FullLayout.tsx"));
const Practice = lazy(() => import("../pages/Practice.tsx"));
const Profile = lazy(() => import("../pages/Profile.tsx"));
const HighScore = lazy(() => import("../pages/HighScore.tsx"));
const TypingTest = lazy(() => import("../pages/TypingTest.tsx"));
const Help = lazy(() => import("../pages/Help.tsx"));

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/practice" /> },
      { path: "/practice", exact: true, element: <Practice /> },
      { path: "/profile", exact: true, element: <Profile /> },
      { path: "/high-score", exact: true, element: <HighScore /> },
      { path: "/typing-test", exact: true, element: <TypingTest /> },
      { path: "/help", exact: true, element: <Help /> },
    ],
  },
];

export default ThemeRoutes;
