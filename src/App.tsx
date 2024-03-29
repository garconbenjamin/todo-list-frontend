import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import { useAppSelector } from "./redux/hooks";

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
