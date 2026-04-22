import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";
import { useState, useEffect } from "preact/hooks";

import { Header } from "./components/Header";
import { Home } from "./pages/Home/index";
import { NotFound } from "./pages/_404";
import { isAuthenticated, logout } from "./lib/service/Auth";
import "./style.css";
import { reloadConfig } from "./lib/service/Config";

export function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth status on app load
    const checkAuthStatus = async () => {
      try {
        let maybeUser = await isAuthenticated()
        if (maybeUser) setUser(maybeUser)
        else console.log("User is not logged in!")
      } catch (error) {
        console.warn("Error checking auth status:", error);
        logout();
      } finally {
        setAuthChecked(true);
        setLoading(false);
      }
    };
    const loadSiteConfig = async () => {
      const config = await reloadConfig();
      console.log("Got config -> " + JSON.stringify(config));
      checkAuthStatus();
    };

    loadSiteConfig()

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authChecked) {
    return <div>Checking authentication...</div>;
  }

  return (
    <LocationProvider>
      <Header user={user} />
      <main>
        <Router>
          <Route path="/" component={() => <Home user={user} />} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
