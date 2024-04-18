import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

export const AuthHeader: React.FC<{ title: string }> = ({ title }) => (
  <header className="text-center">
    <NavLink className="block w-fit m-auto" to="/">
      <img
        className="sm:w-24 w-16 h-auto mb-4"
        src="/nitap-logo.svg"
        alt="NIT AP Alumni"
      />
    </NavLink>
    <h1 className="sm:text-3xl text-2xl">{title}</h1>
  </header>
);

const AuthLayout = () => (
  <div className="__layout min-h-screen py-12">
    <main className="__layout-main">
      <Outlet />
    </main>
  </div>
);

export default AuthLayout;
