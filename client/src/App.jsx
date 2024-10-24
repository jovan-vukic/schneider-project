import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ColorModeToggle from "./components/common/ColorModeToggle";
import AuthProvider from "./providers/AuthProvider.jsx";
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
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
