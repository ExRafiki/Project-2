const mongoose     = require('mongoose');
const reviewSchema = new mongoose.Schema({
//----------Review SCHEMA---------------------------------------------------------
  content: String,
  rating: Number,
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});
//------------------------------------------------------------------------------
module.exports = mongoose.model('Review', reviewSchema);
