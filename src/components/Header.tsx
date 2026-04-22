import { useLocation } from "preact-iso";
import { login, logout } from "../lib/service/Auth";

export function Header({ user }: { user: any }) {
  const { url } = useLocation();

  const loginHandler = async (e: Event) => {
    login();
    return false;
  };
  const logoutHandler = async (e: Event) => {
    logout();
    return false;
  };

  return (
    <header>
      <nav>
        <a href="/">Home</a>
        {user ? (
          <div class="user-menu">
            <span>
              Hello, {user?.given_name || user?.email?.split("@")[0] || "User"}!
            </span>
            <a onClick={logoutHandler} href="/" class="logout-link">
              Logout
            </a>
          </div>
        ) : (
          <a onClick={loginHandler} href="/">Login</a>
        )}
      </nav>
    </header>
  );
}
