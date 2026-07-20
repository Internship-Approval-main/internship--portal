import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import InternshipForm from "./pages/InternshipForm";
import InternshipStatus from "./pages/InternshipStatus";
import Notifications from "./pages/Notifications";

import ChatbotPage from "./pages/ChatbotPage";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login Page (No Sidebar/Navbar/Footer) */}
        <Route path="/" element={<Login />} />
{/* Faculty Dashboard */}
<Route
  path="/faculty"
  element={
    <Layout>
      <FacultyDashboard />
    </Layout>
  }
/>

{/* Admin Dashboard */}
<Route
  path="/admin"
  element={
    <Layout>
      <AdminDashboard />
    </Layout>
  }
/>

{/* Manager Dashboard */}
<Route
  path="/manager"
  element={
    <Layout>
      <ManagerDashboard />
    </Layout>
  }
/>
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        {/* Internship Form */}
        <Route
          path="/internship-form"
          element={
            <Layout>
              <InternshipForm />
            </Layout>
          }
        />

        {/* Internship Status */}
        <Route
          path="/status"
          element={
            <Layout>
              <InternshipStatus />
            </Layout>
          }
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <Layout>
              <Notifications />
            </Layout>
          }
        />

        
        
     

        {/* Chatbot */}
        <Route
          path="/chatbot"
          element={
            <Layout>
              <ChatbotPage />
            </Layout>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;