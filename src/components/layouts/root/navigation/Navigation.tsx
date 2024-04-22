import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";
import cx from "classnames";
import {
  LogIn as LoginIcon,
  Menu as MenuIcon,
  User as UserIcon,
} from "iconoir-react";
import useUser from "@/hooks/user";
import NavLi, { NavLiProps } from "./NavLi";
import Dropdown from "@/components/custom-ui/Dropdown/Dropdown";
import Avatar from "@/components/custom-ui/Avatar/Avatar";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Spinner } from "@/components/ui/spinner";

const NavToggle: React.FC<{
  active: boolean;
  children?: React.ReactNode;
  variant?: "outline" | "fill";
}> = ({ active, variant = "outline", children }) => (
  <div
    role="navigation"
    className={buttonVariants({
      variant,
      size: "icon",
      className: `relative before:content-[''] before:absolute before:-z-10 before:rounded-full before:transition-all duration-200 before:bg-foreground/10 ${
        active ? "before:-inset-1.5" : "before:-inset-0"
      }`,
    })}
  >
    {children}
  </div>
);

const Navbar: React.FC = () => {
  const { loading, user, logout } = useUser();

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  interface userLinksType extends NavLiProps {
    noAuth?: boolean;
    rolesVislbleTo?: ("user" | "admin" | "alumni")[];
  }
  const userLinks: userLinksType[] = [
    { label: "Sign in", href: "/login" },
    { label: "Sign up", href: "/register" },
    {
      label: "Profile",
      href: "/profile",
      rolesVislbleTo: ["user", "alumni", "admin"],
    },
    {
      label: "Alumni Membership",
      href: "/alumni-membership",
      rolesVislbleTo: ["user", "alumni", "admin"],
    },
    { label: "Admin", href: "/admin", rolesVislbleTo: ["admin"] },
    {
      label: "Logout",
      href: "/",
      action: logout,
      type: "button",
      rolesVislbleTo: ["user", "admin", "alumni"],
    },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={cx(styles["nav-container"], "container")}>
        <div className={styles.logo}>
          <NavLink to="/">
            <img src="/navbar-banner.svg" alt="NIT AP Alumni" height={40} />
          </NavLink>
        </div>
        <div className={styles["nav-content"]}>
          <ul className={styles["nav-list"]}>
            {links.map((link, index) => (
              <NavLi key={index} {...link} />
            ))}
          </ul>
          <div className={styles["nav-toggles"]}>
            <Dropdown
              position="right"
              toggle={({ isOpen }) => (
                <NavToggle active={isOpen}>
                  <MenuIcon width={22} height={22} strokeWidth={2} />
                </NavToggle>
              )}
              render={({ closeDropdown }) => (
                <div className={cx(styles["collapsable-nav"], "container")}>
                  <hr />
                  <ul className={styles["collapsable-nav-list"]}>
                    {links.map((link, index) => (
                      <NavLi
                        key={index}
                        {...link}
                        action={() => closeDropdown()}
                      />
                    ))}
                  </ul>
                </div>
              )}
            />
            {loading ? (
              <Spinner />
            ) : (
              <Dropdown
                position="right"
                toggle={({ isOpen }) => (
                  <Tooltip>
                    <TooltipTrigger>
                      {!user ? (
                        <NavToggle active={isOpen} variant="fill">
                          <LoginIcon />
                        </NavToggle>
                      ) : user.avatar ? (
                        <NavToggle active={isOpen} variant="fill">
                          <Avatar size="100%" avatar={user?.avatar} />
                        </NavToggle>
                      ) : (
                        <NavToggle active={isOpen} variant="outline">
                          <UserIcon />
                        </NavToggle>
                      )}
                    </TooltipTrigger>
                    <TooltipContent align="end">
                      {user ? (
                        <>
                          <p className="mb-1 font-semibold">
                            {user.title} {user.first_name} {user.last_name}
                          </p>
                          <p className="text-">{user.email}</p>
                        </>
                      ) : (
                        <p className="text-center">Sign in</p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                )}
                render={({ closeDropdown }) => (
                  <div className={cx(styles["collapsable-nav"], "container")}>
                    {user && (
                      <div className={styles["user-info"]}>
                        {user.avatar && (
                          <Avatar avatar={user.avatar} size="6rem" />
                        )}
                        <div className={styles["user-name-wrapper"]}>
                          {user.first_name ? (
                            <div className={styles["user-name"]}>
                              {`${user.title} ${user.first_name} ${user.last_name}`}
                            </div>
                          ) : (
                            <div className={styles["message"]}>
                              Please complete your profile
                            </div>
                          )}
                        </div>
                        <div className={styles["user-email"]}>{user.email}</div>
                      </div>
                    )}
                    <hr />
                    <ul className={styles["collapsable-nav-list"]}>
                      {userLinks
                        .filter(({ rolesVislbleTo }) => {
                          if (!user) return !rolesVislbleTo;
                          return rolesVislbleTo?.some((role) =>
                            user.role.includes(role)
                          );
                        })
                        .map((link) => (
                          <NavLi
                            key={link.href}
                            {...link}
                            action={() => {
                              closeDropdown();
                              link.action && link.action();
                            }}
                          />
                        ))}
                    </ul>
                  </div>
                )}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
