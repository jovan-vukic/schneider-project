import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import ColorModeToggle from "./components/common/ColorModeToggle";
import AuthProvider, { useAuth } from "./providers/AuthProvider.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Home from "./components/Home.jsx";
import Logout from "./components/auth/Logout.jsx";
import Login from "./components/auth/Login.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Logout />
        <ColorModeToggle />
        <Routes>
          <Route
            path="/"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/admin"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

// RedirectIfAuthenticated component to handle redirection
function RedirectIfAuthenticated({ children }) {
  const data = useAuth();

  if (data && data.token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default App;
