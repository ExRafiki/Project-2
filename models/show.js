const mongoose = require('mongoose');
const poster   = require('./poster');
//------------------------------------------------------------------------------
const showSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String},
  startdate: { type: String},
  enddate: { type: String},
  popularity: { type: String},
  season: { type: Number},
  platform: { type: String},
  posters: [{type: mongoose.Schema.ObjectId, ref: 'Poster'}]
});
//------------------------------------------------------------------------------
module.exports = mongoose.model('Show', showSchema);
