import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

export type Page = 'home' | 'about' | 'products' | 'product-detail' | 'contact' | 'dashboard' | 'admin';

export interface PageParams {
  slug?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageParams, setPageParams] = useState<PageParams>({});

  const handleNavigate = (page: string, params?: any) => {
    setCurrentPage(page as Page);
    setPageParams((params as PageParams) || {});
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'products':
        return <Products onNavigate={handleNavigate} />;
      case 'product-detail':
        return <ProductDetail slug={pageParams.slug || ''} onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact />;
      case 'dashboard':
        return <Dashboard />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
