//------------Promise setup and database link-----------------------------------
const mongoose        = require('mongoose');
mongoose.Promise      = require('bluebird');
const { databaseURI } = require('../config/environment');
mongoose.connect(databaseURI);
//------------Require the models------------------------------------------------
const Tvshow          = require('../models/show');
const Poster          = require('../models/poster');
//------------Drop previous seeds-----------------------------------------------
Tvshow.collection.drop();
Poster.collection.drop();
//------------Creation of poster then the tvshow--------------------------------
Poster.create([{
  url: 'https://dgeiu3fz282x5.cloudfront.net/g/l/lgPP32842.jpg',
  comments: [
    'Awesome show',
    'Great stuff'
  ]
},{
  url: 'https://media-cache.cinematerial.com/p/500x/ovn9sdn4/the-big-bang-theory-movie-poster.jpg',
  comments: [
    'Cage is the best',
    'Great stuff'
  ]
},{
  url: 'https://cdn.europosters.eu/image/750/posters/big-bang-theory-line-up-i13387.jpg',
  comments: [
    'Lets go',
    'Great stuff'
  ]
}])

  .then((posters) => {
    return Tvshow.create({
      name: 'The Big Bang Theory',
      genre: 'Comedy',
      startdate: '2003',
      enddate: 'n/a',
      popularity: 'High',
      season: 15,
      platform: 'traditional / internet',
      posters: posters.map(poster => poster._id)
    });
  })

  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
