import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { UserProvider } from "./contexts/user";
import { Slide, ToastContainer } from "react-toastify";
import RootLayout from "./components/layouts/root";
import AuthLayout from "./components/layouts/auth";
import PrivateRoutes from "./components/routing/PrivateRoutes/PrivateRoutes";
import { Home, About, Login, Register } from "./views";
import Profile, {
  Education,
  Experience,
  PersonalProfile,
} from "./views/profile";
import Admin, { Applications, Users } from "./views/admin";
import Alumni from "./views/alumni";
import ResetPassword from "./views/reset-password/page";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: "", element: <Home /> },
          { path: "about", element: <About /> },
          {
            element: <PrivateRoutes />,
            children: [
              {
                path: "profile",
                element: <Profile />,
                children: [
                  { path: "", element: <PersonalProfile /> },
                  { path: "education", element: <Education /> },
                  { path: "experience", element: <Experience /> },
                  { path: "account", element: <h1>TODO: Account</h1> },
                ],
              },
              {
                path: "alumni-membership",
                element: <Alumni />,
              },
            ],
          },
          {
            element: <PrivateRoutes adminRoute />,
            children: [
              {
                path: "admin",
                element: <Admin />,
                children: [
                  { path: "", element: <h1>TODO: Dashboard</h1> },
                  { path: "applications", element: <Applications /> },
                  { path: "users", element: <Users /> },
                ],
              },
            ],
          },
          { path: "*", element: <h1>Not Found</h1> },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "reset-password", element: <ResetPassword /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <UserProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick={false}
          theme="dark"
          transition={Slide}
        />
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </UserProvider>
    </>
  );
};

export default App;
