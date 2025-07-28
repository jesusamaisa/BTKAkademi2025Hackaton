# 👗 FashionCompare - Giyim Ürünleri Karşılaştırma ve Yorum Platformu

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Gemini_AI-Integrated-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
</div>

<br>

<div align="center">
  <h3>🛍️ Akıllı alışveriş deneyimi için geliştirilmiş modern karşılaştırma platformu</h3>
  <p>Kullanıcıların giyim ürünlerini karşılaştırabildiği, yorumlayabildiği ve AI destekli öneriler alabildiği full-stack web uygulaması</p>
</div>

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknoloji Stack](#-teknoloji-stack)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [API Dokümantasyonu](#-api-dokümantasyonu)
- [Proje Yapısı](#-proje-yapısı)
- [Ekran Görüntüleri](#-ekran-görüntüleri)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

## ✨ Özellikler

### 🛒 Temel Özellikler
- **Ürün Karşılaştırma**: 4 ürüne kadar yan yana karşılaştırma
- **Detaylı Yorumlar**: Çok kriterli puanlama sistemi (kalite, konfor, dayanıklılık, değer)
- **Fiyat Takibi**: Geçmiş fiyat değişimleri ve trend analizi
- **Akıllı Filtreleme**: Kategori, fiyat aralığı, marka ve daha fazlası
- **Favoriler**: Beğenilen ürünleri kaydetme ve takip etme

### 🤖 AI Özellikleri
- **Gemini AI Entegrasyonu**: Ürünler hakkında anlık soru-cevap
- **Akıllı Öneriler**: Kullanıcı davranışına göre ürün önerileri
- **Yorum Özetleme**: AI destekli yorum analizi

### 👥 Kullanıcı Özellikleri
- **Güvenli Kimlik Doğrulama**: JWT tabanlı authentication
- **Kullanıcı Profili**: Kişisel bilgiler ve aktivite geçmişi
- **Yorum Oylama**: Faydalı yorumları oylama sistemi
- **Bildirimler**: Fiyat değişimi ve yeni yorum bildirimleri

### 📊 Analitik ve Raporlama
- **Fiyat Grafikleri**: Interaktif fiyat geçmişi görselleştirmesi
- **Trend Analizi**: Ürün popülerlik trendleri
- **Karşılaştırma İstatistikleri**: En çok karşılaştırılan ürünler

## 🛠 Teknoloji Stack

### Frontend
- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Hızlı build tool
- **React Router v6** - Client-side routing
- **React Query** - Server state management
- **Zustand** - Global state management
- **Recharts** - Grafik ve veri görselleştirme
- **Framer Motion** - Animasyon library
- **React Hook Form** - Form yönetimi

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL veritabanı
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation

### AI & Integrations
- **Google Gemini AI** - AI sohbet asistanı
- **Langchain** (Opsiyonel) - AI orchestration
- **Axios** - HTTP client

## 🚀 Kurulum

### Gereksinimler
- Node.js 18.x veya üzeri
- MongoDB 6.0 veya üzeri
- Google Gemini API Key
- Git

### Adım 1: Repository'yi Klonlayın
```bash
git clone https://github.com/yourusername/fashion-compare.git
cd fashion-compare
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
# Root dizinde
npm run install:all
```

### Adım 3: Environment Variables
Backend için `.env` dosyası oluşturun:
```bash
# backend/.env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fashion-compare
JWT_SECRET=your-super-secret-jwt-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

Frontend için `.env` dosyası oluşturun:
```bash
# frontend/.env
VITE_API_URL=http://localhost:5000/api
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

### Adım 4: MongoDB'yi Başlatın
```bash
# MongoDB'nin yüklü ve çalışıyor olduğundan emin olun
mongod
```

### Adım 5: Seed Data (Opsiyonel)
```bash
cd backend
npm run seed
```

### Adım 6: Uygulamayı Başlatın
```bash
# Root dizinde
npm run dev
```

Uygulama şu adreslerde çalışacaktır:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 💻 Kullanım

### Kullanıcı Kaydı
1. Ana sayfada "Giriş Yap" butonuna tıklayın
2. "Hesap Oluştur" linkine tıklayın
3. Bilgilerinizi girin ve kayıt olun

### Ürün Arama ve Filtreleme
1. Üst menüden "Ürünler" sayfasına gidin
2. Sol taraftaki filtre panelini kullanın
3. Arama çubuğuna ürün adı yazın

### Ürün Karşılaştırma
1. Ürün kartlarında "Karşılaştır" butonuna tıklayın
2. En fazla 4 ürün seçebilirsiniz
3. Alt kısımda beliren karşılaştırma barından detaylı karşılaştırmaya gidin

### AI Asistan Kullanımı
1. Ürün detay sayfasında "AI Asistan" sekmesine tıklayın
2. Gemini API anahtarınızı girin
3. Ürün hakkında sorularınızı sorun

## 📡 API Dokümantasyonu

### Authentication Endpoints
```http
POST /api/users/register
POST /api/users/login
GET  /api/users/profile
PUT  /api/users/profile
```

### Product Endpoints
```http
GET    /api/products
GET    /api/products/:id
GET    /api/products/trending
GET    /api/products/featured
POST   /api/products/compare
GET    /api/products/search?q={query}
```

### Review Endpoints
```http
GET    /api/reviews/product/:productId
POST   /api/reviews/product/:productId
POST   /api/reviews/:reviewId/vote
GET    /api/reviews/product/:productId/summary
```

### Category Endpoints
```http
GET    /api/categories
GET    /api/categories/tree
GET    /api/categories/slug/:slug
```

### AI Endpoints
```http
POST   /api/ai/gemini
GET    /api/ai/summarize/:productId
GET    /api/ai/recommendations/:productId
```

## 📁 Proje Yapısı

```
fashion-compare/
├── frontend/                 # React uygulaması
│   ├── src/
│   │   ├── components/      # Reusable componentler
│   │   ├── pages/          # Sayfa componentleri
│   │   ├── services/       # API servisleri
│   │   ├── store/          # Global state (Zustand)
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Yardımcı fonksiyonlar
│   │   └── assets/         # Statik dosyalar
│   └── public/
├── backend/                 # Node.js API
│   ├── models/             # Mongoose modelleri
│   ├── routes/             # Express route'ları
│   ├── controllers/        # Route controller'ları
│   ├── middleware/         # Custom middleware
│   ├── config/             # Yapılandırma dosyaları
│   ├── utils/              # Yardımcı fonksiyonlar
│   └── seeds/              # Veritabanı seed dosyaları
└── docs/                    # Dokümantasyon
```

## 📸 Ekran Görüntüleri

<div align="center">
  <img src="./docs/screenshots/homepage.png" alt="Ana Sayfa" width="400" />
  <img src="./docs/screenshots/product-list.png" alt="Ürün Listesi" width="400" />
  <img src="./docs/screenshots/product-detail.png" alt="Ürün Detay" width="400" />
  <img src="./docs/screenshots/compare.png" alt="Karşılaştırma" width="400" />
  <img src="./docs/screenshots/ai-chat.png" alt="AI Sohbet" width="400" />
  <img src="./docs/screenshots/price-chart.png" alt="Fiyat Grafiği" width="400" />
</div>

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen aşağıdaki adımları takip edin:

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

### Kod Standartları
- ESLint ve Prettier konfigürasyonlarına uyun
- Anlamlı commit mesajları yazın
- Yeni özellikler için test yazın
- Dokümantasyonu güncelleyin

## 🔧 Troubleshooting

### MongoDB Bağlantı Hatası
```bash
# MongoDB servisinin çalıştığından emin olun
sudo systemctl status mongod
sudo systemctl start mongod
```

### Port Çakışması
```bash
# .env dosyasında farklı port kullanın
PORT=5001
```

### Gemini API Hatası
- API anahtarınızın geçerli olduğundan emin olun
- API kotanızı kontrol edin
- CORS ayarlarını kontrol edin

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 İletişim

Proje Sahibi - [@jesusamaisa](https://twitter.com/yourusername)

Proje Linki: [https://github.com/jesusamaisa/BTKAkademi2025Hackaton]((https://github.com/jesusamaisa/BTKAkademi2025Hackaton))

## 🙏 Teşekkür
