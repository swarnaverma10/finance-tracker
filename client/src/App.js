import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

// Pages
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Budget from "./pages/Budget";
import Charts from "./pages/Charts";
import AIInsights from "./pages/AIInsights";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Page transition wrapper
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Animated inner routes
function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/expenses" element={<PageWrapper><Expenses /></PageWrapper>} />
        <Route path="/budget" element={<PageWrapper><Budget /></PageWrapper>} />
        <Route path="/charts" element={<PageWrapper><Charts /></PageWrapper>} />
        <Route path="/ai" element={<PageWrapper><AIInsights /></PageWrapper>} />
        <Route path="/reports" element={<PageWrapper><Reports /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

// Private Route
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH ROUTES */}
        <Route
          path="/login"
          element={localStorage.getItem("token") ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={localStorage.getItem("token") ? <Navigate to="/" /> : <Signup />}
        />

        {/* MAIN APP */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#020617' }}>
                
                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && !isDesktop && (
                  <div 
                    onClick={closeSidebar}
                    style={{
                      position: 'fixed',
                      inset: 0,
                      background: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(4px)',
                      zIndex: 40,
                    }}
                  />
                )}

                {/* SIDEBAR — always visible on desktop, drawer on mobile */}
                <div 
                  style={{
                    width: '288px',
                    minWidth: '288px',
                    height: '100vh',
                    position: isDesktop ? 'relative' : 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: isDesktop ? 'auto' : 50,
                    transform: (isDesktop || isSidebarOpen) ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                >
                  <Sidebar closeSidebar={closeSidebar} />
                </div>

                {/* CONTENT AREA */}
                <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}>
                  <Navbar onMenuClick={toggleSidebar} />
                  <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto' }}>
                    <AppRoutes />
                  </div>
                </main>

              </div>
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}