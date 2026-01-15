
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { User, UserRole } from './types';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ClientHome from './pages/client/Home';
import ClientServices from './pages/client/Services';
import ClientPlans from './pages/client/Plans';
import ClientProfile from './pages/client/Profile';
import Booking from './pages/client/Booking';
import AdminDashboard from './pages/admin/Dashboard';
import ManageServices from './pages/admin/ManageServices';
import ManagePlans from './pages/admin/ManagePlans';
import Reports from './pages/admin/Reports';
import { 
  Home as HomeIcon, 
  Scissors, 
  CreditCard, 
  User as UserIcon, 
  Calendar,
  LayoutDashboard,
  Settings,
  BarChart3,
  LogOut
} from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Auto-login simulation for development/demo
  useEffect(() => {
    const savedUser = localStorage.getItem('barber_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('barber_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('barber_user');
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <Register onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes Wrapper */}
          <Route path="/*" element={
            isAuthenticated ? (
              <Layout user={user} onLogout={handleLogout}>
                <Routes>
                  {user?.role === 'ADMIN' ? (
                    <>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="/admin/services" element={<ManageServices />} />
                      <Route path="/admin/plans" element={<ManagePlans />} />
                      <Route path="/admin/reports" element={<Reports />} />
                    </>
                  ) : (
                    <>
                      <Route path="/" element={<ClientHome />} />
                      <Route path="/services" element={<ClientServices />} />
                      <Route path="/plans" element={<ClientPlans />} />
                      <Route path="/profile" element={<ClientProfile user={user} />} />
                      <Route path="/booking" element={<Booking user={user!} />} />
                    </>
                  )}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          } />
        </Routes>
      </div>
    </HashRouter>
  );
};

// Layout Component for Navigation
const Layout: React.FC<{ user: User | null; onLogout: () => void; children: React.ReactNode }> = ({ user, onLogout, children }) => {
  const location = useLocation();

  const clientNav = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Cortes', path: '/services', icon: Scissors },
    { name: 'Planos', path: '/plans', icon: CreditCard },
    { name: 'Perfil', path: '/profile', icon: UserIcon },
  ];

  const adminNav = [
    { name: 'Agenda', path: '/', icon: Calendar },
    { name: 'Serviços', path: '/admin/services', icon: Settings },
    { name: 'Planos', path: '/admin/plans', icon: CreditCard },
    { name: 'Relatórios', path: '/admin/reports', icon: BarChart3 },
  ];

  const navItems = user?.role === 'ADMIN' ? adminNav : clientNav;

  return (
    <div className="flex flex-col flex-1 pb-20 md:pb-0 md:pl-64">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40">
        <h1 className="text-xl font-serif text-amber-500">BarberGold</h1>
        <button onClick={onLogout} className="text-neutral-400 hover:text-white transition-colors">
          <LogOut size={20} />
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-neutral-900 border-r border-neutral-800 fixed h-full left-0 z-50">
        <div className="p-8">
          <h1 className="text-2xl font-serif text-amber-500">BarberGold</h1>
          <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest">{user?.role === 'ADMIN' ? 'Admin Panel' : 'Client Area'}</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                  ? 'bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/20' 
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={onLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-neutral-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-neutral-950">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden flex justify-around items-center h-16 bg-neutral-900/90 backdrop-blur-md border-t border-neutral-800 fixed bottom-0 left-0 right-0 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-amber-500' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] uppercase tracking-tighter font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default App;
