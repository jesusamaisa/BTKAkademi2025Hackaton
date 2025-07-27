// frontend/src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  UserIcon, 
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import useStore from '../store/useStore';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, isAuthenticated, favorites, compareList } = useStore();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <ShoppingBagIcon className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">FashionCompare</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün, marka veya kategori ara..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Ürünler
            </Link>
            
            <Link 
              to="/compare" 
              className="relative text-gray-700 hover:text-primary-600"
            >
              <span>Karşılaştır</span>
              {compareList.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            <Link 
              to="/favorites" 
              className="relative text-gray-700 hover:text-primary-600"
            >
              <HeartIcon className="h-6 w-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <Link 
                to="/profile" 
                className="flex items-center text-gray-700 hover:text-primary-600"
              >
                <UserIcon className="h-6 w-6 mr-1" />
                <span>{user?.name}</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Giriş Yap
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ara..."
                className="w-full px-4 py-2 border rounded-lg"
              />
            </form>
            <nav className="space-y-2">
              <Link 
                to="/products" 
                className="block py-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Ürünler
              </Link>
              <Link 
                to="/compare" 
                className="block py-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Karşılaştır ({compareList.length})
              </Link>
              <Link 
                to="/favorites" 
                className="block py-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Favoriler ({favorites.length})
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;