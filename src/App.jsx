import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Cases from "./pages/Cases";
import Appointments from "./pages/Appointments";
import Lawyers from "./pages/Lawyers";
import RitronAI from "./pages/RitronAi";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
      {/* Footer */}
      <footer className="bg-black text-white text-center p-3">
        Developed by Ritik
      </footer>
    </div>
  );
}


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <Layout>
                <Clients />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cases"
          element={
            <ProtectedRoute>
              <Layout>
                <Cases />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Layout>
                <Appointments />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lawyers"
          element={
            <ProtectedRoute>
              <Layout>
                <Lawyers />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ritron"
          element={
            <ProtectedRoute>
              <Layout>
                <RitronAI />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
  
}
