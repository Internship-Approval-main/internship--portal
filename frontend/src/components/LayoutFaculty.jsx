import Navbar from "./Navbar";
import SidebarFaculty from "./SidebarFaculty";
import Footer from "./Footer";
import FloatingChatbot from "./FloatingChatbot";
import { Outlet } from "react-router-dom";


const Layout = ({ children }) => {
  return (
    // Added 'relative' here to give a safe fallback, though fixed pops out to the viewport
    <div className="min-h-screen flex flex-col relative">

      {/* Navbar */}
      <Navbar />

      {/* Sidebar + Page */}
      <div className="flex flex-1">
        <SidebarFaculty />

        <main className="flex-1 bg-gray-100 p-8">
          <Outlet />
          <div className="content">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* FIXED CONTAINER: This isolates the chatbot from the flex column flow */}
      <div className="fixed bottom-0 right-0 z-[9999] pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingChatbot />
        </div>
      </div>

    </div>
  );
}

export default Layout;
