// backend/controllers/productController.js
const Product = require('../models/Product');
const Review = require('../models/Review');

exports.getProducts = async (req, res) => {
  try {
    const {
      category,
      subcategory,
      brand,
      minPrice,
      maxPrice,
      sort = '-createdAt',
      page = 1,
      limit = 20,
      search
    } = req.query;

    const query = {};
    
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) {
      query.currentPrice = {};
      if (minPrice) query.currentPrice.$gte = Number(minPrice);
      if (maxPrice) query.currentPrice.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query)
      .populate('category')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category');
    
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }

    // Fiyat tahmini ekle
    const pricePredict = product.predictPrice();
    
    res.json({
      ...product.toObject(),
      pricePredict
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePriceHistory = async (req, res) => {
  try {
    const { productId } = req.params;
    const { price, store } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }

    product.priceHistory.push({ price, store });
    product.currentPrice = price;
    
    await product.save();
    
    res.json({ message: 'Fiyat geçmişi güncellendi', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ trending: true })
      .populate('category')
      .limit(10)
      .sort('-ratings.average');
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};