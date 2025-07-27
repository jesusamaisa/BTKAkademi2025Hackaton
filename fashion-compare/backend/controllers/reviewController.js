// backend/controllers/reviewController.js
const Review = require('../models/Review');
const Product = require('../models/Product');

exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { sort = '-createdAt', page = 1, limit = 10 } = req.query;

    const reviews = await Review.find({ product: productId })
      .populate('user', 'name avatar')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Review.countDocuments({ product: productId });

    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id; // Auth middleware'den geliyor
    
    // Kullanıcı daha önce yorum yapmış mı kontrol et
    const existingReview = await Review.findOne({
      product: productId,
      user: userId
    });

    if (existingReview) {
      return res.status(400).json({ message: 'Bu ürüne zaten yorum yaptınız' });
    }

    const review = new Review({
      product: productId,
      user: userId,
      ...req.body
    });

    await review.save();

    // Ürün ortalama puanını güncelle
    await updateProductRatings(productId);

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.voteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { type } = req.body; // 'helpful' veya 'not-helpful'
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Yorum bulunamadı' });
    }

    // Daha önce oy kullanmış mı?
    const existingVoteIndex = review.votes.findIndex(
      v => v.user.toString() === userId
    );

    if (existingVoteIndex > -1) {
      // Oy değiştir
      review.votes[existingVoteIndex].type = type;
    } else {
      // Yeni oy ekle
      review.votes.push({ user: userId, type });
    }

    // Sayıları güncelle
    review.helpful = review.votes.filter(v => v.type === 'helpful').length;
    review.notHelpful = review.votes.filter(v => v.type === 'not-helpful').length;

    await review.save();

    res.json({ helpful: review.helpful, notHelpful: review.notHelpful });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function updateProductRatings(productId) {
  const reviews = await Review.find({ product: productId });
  
  if (reviews.length === 0) return;

  const ratings = {
    overall: 0,
    quality: 0,
    comfort: 0,
    durability: 0,
    value: 0
  };

  reviews.forEach(review => {
    ratings.overall += review.ratings.overall;
    ratings.quality += review.ratings.quality || 0;
    ratings.comfort += review.ratings.comfort || 0;
    ratings.durability += review.ratings.durability || 0;
    ratings.value += review.ratings.value || 0;
  });

  const count = reviews.length;
  
  await Product.findByIdAndUpdate(productId, {
    'ratings.average': ratings.overall / count,
    'ratings.count': count,
    'ratings.quality': ratings.quality / reviews.filter(r => r.ratings.quality).length || 0,
    'ratings.comfort': ratings.comfort / reviews.filter(r => r.ratings.comfort).length || 0,
    'ratings.durability': ratings.durability / reviews.filter(r => r.ratings.durability).length || 0,
    'ratings.value': ratings.value / reviews.filter(r => r.ratings.value).length || 0
  });
}