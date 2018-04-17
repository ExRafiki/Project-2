const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  content: String,
  rating: Number,
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

const showSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String},
  year: Date,
  popularity: { type: String},
  season: { type: Number},
  platform: { type: String},
  image: { type: String, required: true },
  reviews: [reviewSchema],
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Show', showSchema);
