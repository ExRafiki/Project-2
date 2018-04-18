//------------Promise setup and database link-----------------------------------
const mongoose        = require('mongoose');
mongoose.Promise      = require('bluebird');
const { databaseURI } = require('../config/environment');
mongoose.connect(databaseURI);
//------------Require the models------------------------------------------------
const Tvshow          = require('../models/show');
const User            = require('../models/user');
//------------Drop previous seeds-----------------------------------------------
Tvshow.collection.drop();
User.collection.drop();

User
  .create([
    {
      username: 'Fil',
      email: 'a@a.com',
      password: 'gop',
      passwordConfirmation: 'gop'
    },
    {
      username: 'kenny',
      email: 'k@k',
      password: 'k',
      passwordConfirmation: 'k'
    }
  ])
  .then(users => {
    console.log(`${users.length} users were created.`);

    return Tvshow.create({
      name: 'Marco Polo',
      genre: 'Adventure',
      year: new Date(2015,12,5),
      popularity: 'High',
      season: 1,
      platform: 'Netflix',
      image: 'https://static2.tribute.ca/poster/540x800/marco-polo-netflix-5823.jpg',
      user: users[0]._id
    },{
      name: 'Spartacus',
      genre: 'Action',
      year: new Date(2015,12,5),
      popularity: 'Low',
      season: 7,
      platform: 'HBO',
      image: 'https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/e6/e68879a4839773d105f0689875dace83_500x735.jpg',
      user: users[1]._id
    },{
      name: 'Breaking Bad',
      genre: 'Action',
      year: new Date(2015,12,5),
      popularity: 'High',
      season: 3,
      platform: 'Everywhere',
      image: 'https://cdn.europosters.eu/image/750/posters/breaking-bad-i-am-the-one-who-knocks-i15742.jpg',
      user: users[1]._id
    },{
      name: 'Have I Got News',
      genre: 'Comedy',
      year: new Date(2015,12,5),
      popularity: 'High',
      season: 3,
      platform: 'Channel 3',
      image: 'https://ia.media-imdb.com/images/M/MV5BYTY0NDcwNDAtODQ0Ni00MmQzLTgxZGItYjM0ZjU1OWI3ZjNlXkEyXkFqcGdeQXVyMTgyMzEyNDY@._V1_UY268_CR5,0,182,268_AL_.jpg',
      user: users[1]._id
    },{
      name: 'Lost in Space',
      genre: 'Adventure',
      year: new Date(2015,12,5),
      popularity: 'High',
      season: 1,
      platform: 'Netflix',
      image: 'https://ia.media-imdb.com/images/M/MV5BMjI3MjI5OTczNV5BMl5BanBnXkFtZTgwODA4MTc5NDM@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
      user: users[0]._id
    });
  })
  .then(shows => {
    console.log(`${shows.length} tvshows made!`);
  })
  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
