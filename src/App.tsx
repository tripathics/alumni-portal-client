import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { UserProvider } from "./contexts/user";
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

import React, { useState, createContext } from "react";

import PLogin from "./components/resetPassword/PLogin";
import OTPInput from "./components/resetPassword/OTPInput";
import Recovered from "./components/resetPassword/Recovered";
import Reset from "./components/resetPassword/Reset";

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
                  { path: "account", element: <Reset /> },
                ],
              },
              {
                path: "alumni-membership",
                element: <Alumni />
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
  const [page, setPage] = useState<string>("login");
  const [email, setEmail] = useState<string | undefined>();
  const [otp, setOTP] = useState<string | undefined>();

  function NavigateComponents() {
    if (page === "login") return <PLogin />;
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <Reset />;

    return <Recovered />;
  }

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
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
};

// password recovery
interface RecoveryContextType {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  email: string | undefined;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
  otp: string | undefined;
  setOTP: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const RecoveryContext = createContext<RecoveryContextType>({
  page: "login",
  setPage: () => {},
  email: undefined,
  setEmail: () => {},
  otp: undefined,
  setOTP: () => {},
});

export default App;
