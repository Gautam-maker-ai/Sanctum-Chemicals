  import { useState } from 'react';
  import { useAuth } from '../../contexts/AuthContext';
  import { User, Menu, X, Pill } from 'lucide-react';
  import Login from '../auth/Login';
  import Signup from '../auth/Signup';

  interface HeaderProps {
    currentPage: string;
    onNavigate: (page: string) => void;
  }

  export default function Header({ currentPage, onNavigate }: HeaderProps) {
    const { user, profile, signOut } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSignOut = async () => {
      await signOut();
      onNavigate('home');
    };

    const navItems = [
      { name: 'Home', page: 'home' },
      { name: 'Products', page: 'products' },
      { name: 'About', page: 'about' },
      { name: 'Contact', page: 'contact' },
    ];

    return (
      <>
        <header className="bg-white shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Pill className="w-8 h-8" />
                <span className="text-xl font-bold">Sanctum Chemicals</span>
              </button>

              <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => onNavigate(item.page)}
                    className={`transition-colors ${
                      currentPage === item.page
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>

              <div className="flex items-center space-x-4">
                {user && profile ? (
                  <>
                    <div className="hidden md:flex items-center space-x-4">
                      {profile.role === 'admin' && (
                        <button
                          onClick={() => onNavigate('admin')}
                          className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          Admin Panel
                        </button>
                      )}
                      <button
                        onClick={() => onNavigate('dashboard')}
                        className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <User className="w-5 h-5" />
                        <span>{profile.full_name || 'Dashboard'}</span>
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="hidden md:flex items-center space-x-4">
                    <button
                      onClick={() => setShowLogin(true)}
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setShowSignup(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                )}

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden text-gray-700"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => {
                      onNavigate(item.page);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      currentPage === item.page
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                {user && profile ? (
                  <>
                    {profile.role === 'admin' && (
                      <button
                        onClick={() => {
                          onNavigate('admin');
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Admin Panel
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onNavigate('dashboard');
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      My Dashboard
                    </button>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowLogin(true);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setShowSignup(true);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </header>

        {showLogin && (
          <Login
            onClose={() => setShowLogin(false)}
            onSwitchToSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />
        )}

        {showSignup && (
          <Signup
            onClose={() => setShowSignup(false)}
            onSwitchToLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        )}
      </>
    );
  }
