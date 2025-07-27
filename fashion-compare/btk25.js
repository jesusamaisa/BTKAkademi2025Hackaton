import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Star, 
  Filter, 
  ShoppingCart, 
  Heart, 
  TrendingUp, 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown,
  Send,
  User,
  Eye,
  BarChart3,
  Tag,
  Clock,
  Award,
  Sparkles
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const FashionComparisonPlatform = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comfort: 5,
    quality: 5,
    durability: 5,
    style: 5,
    comment: ''
  });

  // Dummy Data
  const categories = {
    all: 'Tüm Kategoriler',
    women: 'Kadın',
    men: 'Erkek',
    kids: 'Çocuk',
    shoes: 'Ayakkabı',
    accessories: 'Aksesuar'
  };

  const products = [
    {
      id: 1,
      name: 'Premium Pamuk T-Shirt',
      category: 'women',
      brand: 'StyleModa',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 156,
      description: 'Yumuşak pamuk kumaştan üretilen, günlük kullanım için ideal rahat kesim t-shirt.',
      tags: ['Pamuk', 'Rahat Kesim', 'Günlük'],
      priceHistory: [
        { date: 'Oca', price: 350 },
        { date: 'Şub', price: 320 },
        { date: 'Mar', price: 340 },
        { date: 'Nis', price: 310 },
        { date: 'May', price: 299 },
        { date: 'Haz', price: 299 }
      ]
    },
    {
      id: 2,
      name: 'Klasik Denim Ceket',
      category: 'men',
      brand: 'DenimCo',
      price: 899,
      originalPrice: 1199,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 89,
      description: 'Kaliteli denim kumaştan üretilen, zamansız tasarımlı klasik erkek ceket.',
      tags: ['Denim', 'Klasik', 'Uzun Ömürlü'],
      priceHistory: [
        { date: 'Oca', price: 1100 },
        { date: 'Şub', price: 1050 },
        { date: 'Mar', price: 980 },
        { date: 'Nis', price: 950 },
        { date: 'May', price: 920 },
        { date: 'Haz', price: 899 }
      ]
    },
    {
      id: 3,
      name: 'Spor Ayakkabı',
      category: 'shoes',
      brand: 'SportMax',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 234,
      description: 'Koşu ve günlük kullanım için tasarlanmış, yüksek performanslı spor ayakkabı.',
      tags: ['Spor', 'Koşu', 'Rahat'],
      priceHistory: [
        { date: 'Oca', price: 1500 },
        { date: 'Şub', price: 1450 },
        { date: 'Mar', price: 1400 },
        { date: 'Nis', price: 1350 },
        { date: 'May', price: 1320 },
        { date: 'Haz', price: 1299 }
      ]
    },
    {
      id: 4,
      name: 'Çocuk Renkli Elbise',
      category: 'kids',
      brand: 'KidsStyle',
      price: 199,
      originalPrice: 299,
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 67,
      description: 'Canlı renklerle tasarlanmış, pamuklu kumaştan üretilen çocuk elbisesi.',
      tags: ['Çocuk', 'Renkli', 'Pamuk'],
      priceHistory: [
        { date: 'Oca', price: 280 },
        { date: 'Şub', price: 260 },
        { date: 'Mar', price: 240 },
        { date: 'Nis', price: 220 },
        { date: 'May', price: 210 },
        { date: 'Haz', price: 199 }
      ]
    }
  ];

  const featuredProducts = products.slice(0, 3);
  const campaigns = [
    {
      id: 1,
      title: 'Yaz İndirimi',
      description: 'Tüm yaz koleksiyonunda %50\'ye varan indirim',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop',
      discount: '50%'
    },
    {
      id: 2,
      title: 'Yeni Sezon',
      description: 'En yeni trendler şimdi mağazalarda',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=300&fit=crop',
      discount: 'YENİ'
    }
  ];

  const dummyReviews = [
    {
      id: 1,
      user: 'Ayşe K.',
      rating: 5,
      comfort: 5,
      quality: 4,
      durability: 5,
      style: 5,
      comment: 'Çok rahat ve kaliteli bir ürün. Kesinlikle tavsiye ederim!',
      date: '2 gün önce',
      helpful: 15,
      notHelpful: 2
    },
    {
      id: 2,
      user: 'Mehmet A.',
      rating: 4,
      comfort: 4,
      quality: 5,
      durability: 4,
      style: 4,
      comment: 'Fiyat performans açısından gayet iyi. Beklentilerimi karşıladı.',
      date: '1 hafta önce',
      helpful: 8,
      notHelpful: 1
    }
  ];

  useEffect(() => {
    if (selectedProduct) {
      setReviews(dummyReviews);
    }
  }, [selectedProduct]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  const handleAddReview = () => {
    const review = {
      id: reviews.length + 1,
      user: 'Siz',
      ...newReview,
      date: 'Az önce',
      helpful: 0,
      notHelpful: 0
    };
    setReviews([review, ...reviews]);
    setNewReview({
      rating: 5,
      comfort: 5,
      quality: 5,
      durability: 5,
      style: 5,
      comment: ''
    });
    setCurrentPage('product-detail');
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        text: chatInput,
        isUser: true,
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');
      
      // AI yanıtı simülasyonu
      setTimeout(() => {
        const aiResponse = {
          id: chatMessages.length + 2,
          text: 'Bu ürün hakkında size yardımcı olabilirim. Özellikle kalite ve rahatlık açısından kullanıcılardan çok olumlu geri dönüşler alıyoruz. Hangi konuda daha detaylı bilgi istiyorsunuz?',
          isUser: false,
          time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const ProductCard = ({ product, onClick }) => (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover rounded-t-xl"
        />
        {product.originalPrice > product.price && (
          <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            %{Math.round((1 - product.price / product.originalPrice) * 100)} İndirim
          </span>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{product.name}</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.brand}</span>
        </div>

        {/* AI Chat Assistant */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="text-purple-500" />
              Gemini AI Canlı Yardım
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 mt-16">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-300" />
                  <p>Merhaba! Bu ürün hakkında size nasıl yardımcı olabilirim?</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatMessages.map(message => (
                    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.isUser 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white border border-gray-200'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ürün hakkında soru sorun..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Ürün İstatistikleri</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Görüntülenme</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Favorilere Ekleme</span>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sepete Ekleme</span>
                <span className="font-semibold">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Satın Alma</span>
                <span className="font-semibold">78</span>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Benzer Ürünler</h3>
            <div className="space-y-4">
              {products.filter(p => p.id !== selectedProduct.id && p.category === selectedProduct.category).slice(0, 3).map(product => (
                <div key={product.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                    <p className="font-bold text-blue-600">₺{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAddReview = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Yorum Ekle</h1>
        
        {selectedProduct && (
          <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-bold text-lg">{selectedProduct.name}</h3>
              <p className="text-gray-600">{selectedProduct.brand}</p>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">Genel Puan</label>
            <RatingStars 
              rating={newReview.rating} 
              onRatingChange={(rating) => setNewReview({...newReview, rating})}
              interactive={true}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rahatlık</label>
              <RatingStars 
                rating={newReview.comfort} 
                onRatingChange={(comfort) => setNewReview({...newReview, comfort})}
                interactive={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kalite</label>
              <RatingStars 
                rating={newReview.quality} 
                onRatingChange={(quality) => setNewReview({...newReview, quality})}
                interactive={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dayanıklılık</label>
              <RatingStars 
                rating={newReview.durability} 
                onRatingChange={(durability) => setNewReview({...newReview, durability})}
                interactive={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stil</label>
              <RatingStars 
                rating={newReview.style} 
                onRatingChange={(style) => setNewReview({...newReview, style})}
                interactive={true}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">Yorumunuz</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              placeholder="Ürün hakkındaki deneyiminizi paylaşın..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handleAddReview}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Yorumu Gönder
            </button>
            <button 
              onClick={() => setCurrentPage('product-detail')}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdminPanel = () => (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Yönetici Paneli</h1>
      
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Toplam Ürün</p>
              <p className="text-3xl font-bold text-blue-600">{products.length}</p>
            </div>
            <Tag className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Toplam Yorum</p>
              <p className="text-3xl font-bold text-green-600">
                {products.reduce((sum, product) => sum + product.reviewCount, 0)}
              </p>
            </div>
            <MessageCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ortalama Puan</p>
              <p className="text-3xl font-bold text-yellow-600">
                {(products.reduce((sum, product) => sum + product.rating, 0) / products.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-12 h-12 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aktif Kampanya</p>
              <p className="text-3xl font-bold text-purple-600">{campaigns.length}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-500" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ürün Yönetimi</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Ürün</th>
                <th className="text-left py-3 px-4">Kategori</th>
                <th className="text-left py-3 px-4">Fiyat</th>
                <th className="text-left py-3 px-4">Puan</th>
                <th className="text-left py-3 px-4">Yorum</th>
                <th className="text-left py-3 px-4">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{categories[product.category]}</td>
                  <td className="py-3 px-4">₺{product.price}</td>
                  <td className="py-3 px-4">{product.rating}</td>
                  <td className="py-3 px-4">{product.reviewCount}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">Düzenle</button>
                      <button className="text-red-600 hover:text-red-800">Sil</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                FashionCompare
              </button>
              
              <div className="hidden md:flex items-center gap-6">
                <button 
                  onClick={() => setCurrentPage('home')}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'home' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Anasayfa
                </button>
                <button 
                  onClick={() => setCurrentPage('products')}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'products' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Ürünler
                </button>
                <button 
                  onClick={() => setCurrentPage('admin')}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'admin' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Yönetici
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ShoppingCart className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && renderHomePage()}
        {currentPage === 'products' && renderProductsPage()}
        {currentPage === 'product-detail' && renderProductDetail()}
        {currentPage === 'add-review' && renderAddReview()}
        {currentPage === 'admin' && renderAdminPanel()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FashionCompare</h3>
              <p className="text-gray-400">
                Giyim dünyasının en iyi ürünlerini karşılaştırın, inceleyin ve akıllı alışveriş yapın.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kategoriler</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Kadın Giyim</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Erkek Giyim</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Çocuk Giyim</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ayakkabı</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Aksesuar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Yardım</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">SSS</a></li>
                <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Destek</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Geri Bildirim</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Bizi Takip Edin</h4>
              <div className="flex gap-4">
                <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  f
                </button>
                <button className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                  t
                </button>
                <button className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                  i
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FashionCompare. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FashionComparisonPlatform;
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviewCount} yorum)
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.map(tag => (
            <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-800">₺{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-500 line-through">₺{product.originalPrice}</span>
            )}
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Eye className="w-4 h-4" />
            İncele
          </button>
        </div>
      </div>
    </div>
  );

  const RatingStars = ({ rating, onRatingChange, interactive = false }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} ${
            interactive ? 'cursor-pointer hover:text-yellow-400' : ''
          }`}
          onClick={interactive ? () => onRatingChange(star) : undefined}
        />
      ))}
    </div>
  );

  const renderHomePage = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative px-8 py-16 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Moda Dünyasının <span className="text-yellow-300">En İyilerini</span> Keşfedin
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Binlerce ürün arasından en uygununu bulun, karşılaştırın ve akıllı alışveriş yapın
          </p>
          <button 
            onClick={() => setCurrentPage('products')}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105"
          >
            Alışverişe Başla
          </button>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <Sparkles className="text-yellow-500" />
          Özel Kampanyalar
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
              <img 
                src={campaign.image} 
                alt={campaign.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{campaign.title}</h3>
                    <p className="text-gray-200">{campaign.description}</p>
                  </div>
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-xl">
                    {campaign.discount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <Award className="text-blue-500" />
          Öne Çıkan Ürünler
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onClick={() => {
                setSelectedProduct(product);
                setCurrentPage('product-detail');
              }}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Kategoriler</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(categories).filter(([key]) => key !== 'all').map(([key, value]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedCategory(key);
                setCurrentPage('products');
              }}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:bg-blue-50"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {key === 'women' && '👗'}
                {key === 'men' && '👔'}
                {key === 'kids' && '👶'}
                {key === 'shoes' && '👟'}
                {key === 'accessories' && '👜'}
              </div>
              <h3 className="font-semibold text-gray-800">{value}</h3>
            </button>
          ))}
        </div>
      </section>
    </div>
  );

  const renderProductsPage = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Ürünler</h1>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ürün veya marka ara..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(categories).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sıralama</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="popularity">Popülerlik</option>
                <option value="price-low">Fiyat (Düşük-Yüksek)</option>
                <option value="price-high">Fiyat (Yüksek-Düşük)</option>
                <option value="rating">Puan</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Filter className="w-4 h-4" />
                Filtrele
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            onClick={() => {
              setSelectedProduct(product);
              setCurrentPage('product-detail');
            }}
          />
        ))}
      </div>
      
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aradığınız kriterlere uygun ürün bulunamadı.</p>
        </div>
      )}
    </div>
  );

  const renderProductDetail = () => {
    if (!selectedProduct) return null;

    return (
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Product Images and Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name}
              className="w-full h-96 object-cover rounded-lg mb-6"
            />
            
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{selectedProduct.name}</h1>
                  <p className="text-lg text-gray-600">{selectedProduct.brand}</p>
                </div>
                <button className="p-3 bg-gray-100 rounded-full hover:bg-red-50 transition-colors">
                  <Heart className="w-6 h-6 text-gray-600 hover:text-red-500" />
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-lg text-gray-600">
                    {selectedProduct.rating} ({selectedProduct.reviewCount} yorum)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedProduct.tags.map(tag => (
                  <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">{selectedProduct.description}</p>
              
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-gray-800">₺{selectedProduct.price}</span>
                {selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-2xl text-gray-500 line-through">₺{selectedProduct.originalPrice}</span>
                )}
              </div>
              
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  Sepete Ekle
                </button>
                <button 
                  onClick={() => setCurrentPage('add-review')}
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Yorum Yap
                </button>
              </div>
            </div>
          </div>

          {/* Price Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="text-blue-500" />
              Fiyat Geçmişi
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={selectedProduct.priceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`₺${value}`, 'Fiyat']} />
                <Area type="monotone" dataKey="price" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MessageCircle className="text-green-500" />
              Kullanıcı Yorumları ({reviews.length})
            </h3>
            
            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{review.user}</h4>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {review.date}
                        </p>
                      </div>
                    </div>
                    <RatingStars rating={review.rating} />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Rahatlık</p>
                      <RatingStars rating={review.comfort} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Kalite</p>
                      <RatingStars rating={review.quality} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Dayanıklılık</p>
                      <RatingStars rating={review.durability} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Stil</p>
                      <RatingStars rating={review.style} />
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-green-600 hover:text-green-700">
                      <ThumbsUp className="w-4 h-4" />
                      Faydalı ({review.helpful})
                    </button>
                    <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
                      <ThumbsDown className="w-4 h-4" />
                      Faydalı değil ({review.notHelpful})
                    </button>
                  </div>
                </div