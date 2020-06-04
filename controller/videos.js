const credential = require('./connection/firebase_credential');
const firebase = require('./connection/firebase_client_auth');
const db = credential.firestore();
exports.storage = credential.storage().bucket();

exports.all_videos = function() {
  return getVideos(db);
};

exports.watch_movie = function(request, response) {
  // check auth
  // console.log(request.params.movie_name);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('signin');
      // 1. check for Payment
      // 2. watch movie
    } else {
      return response.send('not signin');
    }
  });
}

exports.series = function(series_id) {
  let check = series_id.split('_');

  if (check[0] === "movie") {
    trailer = db.collection('movies').where('video_id', '==', series_id);
  } else {
    trailer = db.collection('series').where('series_id', '==', series_id);
  }

  return trailer;

}

exports.latest_movie = function() {
  let movies_latest;
  movies_latest = db.collection('movies')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc');

  return movies_latest;

};

exports.action_movie = function() {
  let movies_action;
  movies_action = db.collection('movies')
    .where('genre', '==', 'Action')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc');

  return movies_action;
};

exports.animation_movie = function() {
  let movies_animation;
  movies_animation = db.collection('movies')
    .where('genre', '==', 'Animation')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc');

  return movies_animation;
};

exports.comedy_movie = function() {
  let movies_comedy;
  movies_comedy = db.collection('movies')
    .where('genre', '==', 'Comedy')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc');

  return movies_comedy;
};

exports.crime_movie = function() {
  let movies_crime;
  movies_crime = db.collection('movies')
    .where('genre', '==', 'Crime')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc');

  return movies_crime;
};

exports.drama_movie = function() {
  let movies_drama;
  movies_drama = db.collection('movies')
    .where('genre', '==', 'Drama')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc');

  return movies_drama;
};

exports.fantasy_movie = function() {
  let movies_fantasy;
  movies_fantasy = db.collection('movies')
    .where('genre', '==', 'Fantasy')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc');

  return movies_fantasy;
};

exports.historical_movie = function() {
  let movies_historical;
  movies_historical = db.collection('movies')
    .where('genre', '==', 'Historical')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc');

  return movies_historical;
};

exports.horror_movie = function() {
  let movies_horror;
  movies_horror = db.collection('movies')
    .where('genre', '==', 'Horror')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc');

  return movies_horror;
};

exports.romance_movie = function() {
  let movies_romance;
  movies_romance = db.collection('movies')
    .where('genre', '==', 'Romance')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc');

  return movies_romance;
};

exports.thriller_movie = function() {
  let movies_thriller;
  movies_thriller = db.collection('movies')
    .where('genre', '==', 'Thriller')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc');

  return movies_thriller;
};

exports.western_movie = function() {
  let movies_western;
  movies_western = db.collection('movies')
    .where('genre', '==', 'Western')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc');

  return movies_western;
};

function getVideos(db) {

  let series_all;
  let series_latest;
  let movies_all;
  let movies_latest;
  let movies_action;
  let movies_horror;
  let max_like_movie;
  let max_like_movie_all;
  let data = {};

  movies_action = db.collection('movies')
    .where('genre', '==', 'Action')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc')
    .limit(50);

  movies_horror = db.collection('movies')
    .where('genre', '==', 'Horror')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc');

  movies_latest = db.collection('movies')
    .where('launched', '==', true)
    .orderBy('launch_date', 'desc')
    .limit(50);

  max_like_movie = db.collection('movies')
    .orderBy('likes', 'desc')
    .limit(1);

  max_like_movie_all = db.collection('movies')
    .orderBy('likes', 'desc')
    .startAt(2);

  movies_all = db.collection('movies')
    .orderBy('launch_date', 'desc');

  series_all = db.collection('series')
    .orderBy('release_date', 'desc');


  data.movies_action = movies_action;
  data.movies_latest = movies_latest;
  data.movies_all = movies_all;
  data.series_all = series_all;
  data.movies_horror = movies_horror;
  data.max_like_movie = max_like_movie;
  data.max_like_movie_all = max_like_movie_all;

  return data;

}
