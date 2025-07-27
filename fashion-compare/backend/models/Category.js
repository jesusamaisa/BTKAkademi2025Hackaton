// backend/models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  icon: String,
  image: String,
  description: String,
  attributes: [{
    name: String,
    type: String, // 'text', 'select', 'multiselect'
    options: [String]
  }],
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Category', categorySchema);