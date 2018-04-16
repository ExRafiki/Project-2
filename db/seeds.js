//------------Promise setup and database link-----------------------------------
const mongoose        = require('mongoose');
mongoose.Promise      = require('bluebird');
const { databaseURI } = require('../config/environment');
mongoose.connect(databaseURI);
//------------Require the models------------------------------------------------
const Tvshow          = require('../models/show');
const Poster          = require('../models/poster');
const User            = require('../models/user');
//------------Drop previous seeds-----------------------------------------------
Tvshow.collection.drop();
Poster.collection.drop();
User.collection.drop(); 
//------------Creation of poster then the tvshow--------------------------------
Poster.create([{
  url: 'https://occ-0-999-1001.1.nflxso.net/art/3ffe8/db82d304bffd998e912326eef880843e0a43ffe8.jpg',
  comments: [
    'Size test',
    'Great stuff'
  ]
},{
  url: 'https://upload.wikimedia.org/wikipedia/en/4/4f/Marco_Polo_2014_title_card.jpg',
  comments: [
    'Size test',
    'Nice'
  ]
},{
  url: 'https://ia.media-imdb.com/images/M/MV5BMjM5NTk1MTc4OF5BMl5BanBnXkFtZTgwNTE5ODIxOTE@._V1_UX182_CR0,0,182,268_AL_.jpg',
  comments: [
    'Size test',
    'Cool'
  ]
}])
//------------------------------------------------------------------------------
  .then((posters) => {
    return Tvshow.create({
      name: 'Marco Polo',
      genre: 'Adventure',
      year: new Date(2015,12,5),
      popularity: 'High',
      season: 1,
      platform: 'internet',
      image: 'undefined',
      posters: posters.map(poster => poster._id)
    });
  })

  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
