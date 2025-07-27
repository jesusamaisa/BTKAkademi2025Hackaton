// backend/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ratings: {
    overall: { type: Number, required: true, min: 1, max: 5 },
    quality: { type: Number, min: 1, max: 5 },
    comfort: { type: Number, min: 1, max: 5 },
    durability: { type: Number, min: 1, max: 5 },
    value: { type: Number, min: 1, max: 5 },
    fit: { type: String, enum: ['too-small', 'perfect', 'too-large'] }
  },
  title: String,
  comment: { type: String, required: true },
  pros: [String],
  cons: [String],
  images: [String],
  helpful: { type: Number, default: 0 },
  notHelpful: { type: Number, default: 0 },
  votes: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['helpful', 'not-helpful'] }
  }],
  verified: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);