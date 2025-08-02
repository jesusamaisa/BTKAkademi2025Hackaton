// backend/models/Product.js
const mongoose = require('mongoose');

const priceHistorySchema = new mongoose.Schema({
  price: Number,
  date: { type: Date, default: Date.now },
  store: String
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  brand: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subcategory: String,
  images: [String],
  currentPrice: Number,
  priceHistory: [priceHistorySchema],
  specifications: {
    material: String,
    color: [String],
    sizes: [String],
    care: String
  },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    quality: { type: Number, default: 0 },
    comfort: { type: Number, default: 0 },
    durability: { type: Number, default: 0 },
    value: { type: Number, default: 0 }
  },
  stores: [{
    name: String,
    url: String,
    price: Number,
    inStock: Boolean,
    lastChecked: Date
  }],
  trending: { type: Boolean, default: false },
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Fiyat tahmini için method
productSchema.methods.predictPrice = function() {
  if (this.priceHistory.length < 2) return null;
  
  // Basit linear regression
  const prices = this.priceHistory.map(h => h.price);
  const n = prices.length;
  const avgPrice = prices.reduce((a, b) => a + b) / n;
  
  // Trend hesaplama
  let trend = 0;
  for (let i = 1; i < n; i++) {
    trend += (prices[i] - prices[i-1]) / prices[i-1];
  }
  trend = trend / (n - 1);
  
  return {
    nextMonthEstimate: avgPrice * (1 + trend),
    trend: trend > 0 ? 'increasing' : 'decreasing',
    confidence: Math.min(n / 10, 1) // Daha fazla veri = daha yüksek güven
  };
};

module.exports = mongoose.model('Product', productSchema);