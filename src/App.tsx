import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Auth from "./pages/Auth";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./pages/ProtectedRoutes.tsx";
import { useAppSelector } from "./redux/hooks.ts";

function App() {
  const user = useAppSelector((state) => state.user);

  return (
    <div id="App">
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes user={user} />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
