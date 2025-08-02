// frontend/src/pages/ProductDetailPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  StarIcon, 
  ChartBarIcon,
  ChatBubbleLeftIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import useStore from '../store/useStore';
import { productAPI, reviewAPI } from '../services/api';
import ProductGallery from '../components/ProductGallery';
import ReviewSection from '../components/ReviewSection';
import PriceChart from '../components/PriceChart';
import GeminiChat from '../components/GeminiChat';
import ReviewForm from '../components/ReviewForm';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('reviews');
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const { 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite, 
    addToCompare,
    addToRecentViews 
  } = useStore();

  // Ürün verisi
  const { data: product, isLoading, error } = useQuery(
    ['product', id],
    () => productAPI.getById(id),
    {
      onSuccess: (data) => {
        addToRecentViews(data.data);
      }
    }
  );

  // Yorumlar
  const { data: reviews } = useQuery(
    ['reviews', id],
    () => reviewAPI.getByProduct(id),
    {
      enabled: !!id
    }
  );

  const handleFavoriteToggle = () => {
    if (isFavorite(id)) {
      removeFromFavorites(id);
      toast.success('Favorilerden kaldırıldı');
    } else {
      addToFavorites(product.data);
      toast.success('Favorilere eklendi');
    }
  };

  const handleCompare = () => {
    addToCompare(product.data);
    toast.success('Karşılaştırma listesine eklendi');
  };

  if (isLoading) return <ProductSkeleton />;
  if (error) return <div>Hata: {error.message}</div>;

  const productData = product?.data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sol Taraf - Görsel Galerisi */}
        <ProductGallery images={productData.images} />

        {/* Sağ Taraf - Ürün Bilgileri */}
        <div className="space-y-6">
          {/* Başlık ve Favoriler */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{productData.name}</h1>
              <p className="text-lg text-gray-600 mt-1">{productData.brand}</p>
            </div>
            <button
              onClick={handleFavoriteToggle}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              {isFavorite(id) ? (
                <HeartSolidIcon className="w-6 h-6 text-red-500" />
              ) : (
                <HeartIcon className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(productData.ratings.average)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-700">
                {productData.ratings.average.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-500">
              ({productData.ratings.count} değerlendirme)
            </span>
          </div>

          {/* Fiyat */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-primary-600">
                ₺{productData.currentPrice}
              </span>
              {productData.pricePredict && (
                <span className="ml-3 text-sm text-gray-500">
                  Tahmini: ₺{productData.pricePredict.nextMonthEstimate.toFixed(2)}
                  <span className={`ml-1 ${
                    productData.pricePredict.trend === 'increasing' 
                      ? 'text-red-500' 
                      : 'text-green-500'
                  }`}>
                    ({productData.pricePredict.trend === 'increasing' ? '↑' : '↓'})
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Özellikler */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Ürün Özellikleri</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Malzeme:</span>
                <span className="ml-2">{productData.specifications.material}</span>
              </div>
              <div>
                <span className="text-gray-500">Renk:</span>
                <span className="ml-2">{productData.specifications.color.join(', ')}</span>
              </div>
              <div>
                <span className="text-gray-500">Beden:</span>
                <span className="ml-2">{productData.specifications.sizes.join(', ')}</span>
              </div>
              <div>
                <span className="text-gray-500">Bakım:</span>
                <span className="ml-2">{productData.specifications.care}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleCompare}
              className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition flex items-center justify-center"
            >
              <ArrowsRightLeftIcon className="w-5 h-5 mr-2" />
              Karşılaştır
            </button>
            <button
              onClick={() => setShowReviewForm(true)}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition flex items-center justify-center"
            >
              <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
              Yorum Yap
            </button>
          </div>

          {/* Mağaza Linkleri */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Mağazalarda Bul</h3>
            <div className="space-y-2">
              {productData.stores.map((store, index) => (
                <a
                  key={index}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="font-medium">{store.name}</span>
                  <div className="text-right">
                    <span className="font-bold">₺{store.price}</span>
                    <span className={`ml-2 text-sm ${
                      store.inStock ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {store.inStock ? 'Stokta' : 'Tükendi'}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="border-b">
          <nav className="flex space-x-8">
            {['reviews', 'price-history', 'ai-assistant'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'reviews' && 'Yorumlar'}
                {tab === 'price-history' && 'Fiyat Geçmişi'}
                {tab === 'ai-assistant' && 'AI Asistan'}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'reviews' && (
            <ReviewSection 
              productId={id} 
              reviews={reviews?.data} 
              onAddReview={() => setShowReviewForm(true)}
            />
          )}
          
          {activeTab === 'price-history' && (
            <PriceChart priceHistory={productData.priceHistory} />
          )}
          
          {activeTab === 'ai-assistant' && (
            <GeminiChat product={productData} />
          )}
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          productId={id}
          onClose={() => setShowReviewForm(false)}
          onSuccess={() => {
            setShowReviewForm(false);
            // Yorumları yeniden yükle
          }}
        />
      )}
    </div>
  );
};

// Loading Skeleton
const ProductSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gray-200 h-96 rounded-lg"></div>
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

export default ProductDetailPage;