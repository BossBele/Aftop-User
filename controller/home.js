let videos = require('./videos');
let bucket = videos.storage;
let index_media = {};
let all_series = [];
let all_movies_latest = [];
let all_movies_action = [];
let all_movies_horror = [];
let all_movies_latest_c = [];
let all_movies_action_c = [];
let all_movies_animation_c = [];
let all_movies_comedy_c = [];
let max_like_movie = [];
let max_like_movie_all = [];
let tokens = null;
let original_name = null;
let LOADING_COMPLETE = false;
let reference_movies_latest = videos.all_videos().movies_latest;
let reference_movies_action = videos.all_videos().movies_action;
let reference_movies_horror = videos.all_videos().movies_horror;
let reference_movies_max_like = videos.all_videos().max_like_movie;
let reference_movies_max_like_all = videos.all_videos().max_like_movie_all;
let reference_series_all = videos.all_videos().series_all;
let reference_movie_latest_all = videos.latest_movie();
let reference_movie_action_all = videos.action_movie();
let reference_movie_animation_all = videos.animation_movie();
let reference_movie_comedy_all = videos.comedy_movie();

exports.index = function(request, response) {

  view_all_series(reference_series_all, all_series, tokens, original_name, response);

};

function view_all_series(reference_series_all, all_series, tokens, original_name, response) {
  //for all_series
  reference_series_all.get()
    .then((snapshot) => {
      arrayObject(snapshot);
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

  function arrayObject(snapshot) {
    snapshot.forEach((doc) => {
      all_series.push(doc.data())
    });

    let count = 0;
    all_series.forEach((data) => {
      bucket.file(data.cover_photo).get().then(function(data) {
        bindToken(data, count, all_series);
        count++;
      });
    });
  }

  function bindToken(data, index, all_series) {
    const file = data[0];
    all_series.forEach((info) => {
      if (info.cover_photo === file.name) {
        tokens = file.metadata.metadata.firebaseStorageDownloadTokens;
        original_name = file.name.split('/')[1];
        info.tokens = tokens;
        info.file_name = original_name;
      }
    });

    if (all_series.length === index + 1) {
      toView(response, "series", all_series);
    }

  }
  //end for all_series
}

function view_all_movie(reference_movies_latest, all_movies_latest, tokens, original_name, response, key) {
  //for all_series
  reference_movies_latest.get()
    .then((snapshot) => {
      arrayObject(snapshot);
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

  function arrayObject(snapshot) {
    snapshot.forEach((doc) => {
      all_movies_latest.push(doc.data())
    });

    let count = 0;

    if (all_movies_latest.length === 0) {
      bindToken(null, null, all_movies_latest);
    } else {
      all_movies_latest.forEach((data) => {
        bucket.file(data.cover_photo).get().then(function(data) {
          bindToken(data, count, all_movies_latest);
          count++;
        });
      });
    }

  }

  function bindToken(data, index, all_movies_latest) {

    if (all_movies_latest.length === 0) {
      toView(response, key, all_movies_latest);
    } else {
      const file = data[0];
      all_movies_latest.forEach((info) => {
        if (info.cover_photo === file.name) {
          tokens = file.metadata.metadata.firebaseStorageDownloadTokens;
          original_name = file.name.split('/')[1];
          info.tokens = tokens;
          info.file_name = original_name;
        }
      });

      if (all_movies_latest.length === index + 1) {
        toView(response, key, all_movies_latest);
      }
    }

  }
  //end for all_series
}

function toView(response, key, videos) {
  if (index_media.hasOwnProperty(key) === false) {
    index_media[key] = videos;
  }

  //index page media
  if (Object.keys(index_media).length === 1) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_latest, all_movies_latest, tokens, original_name, response, "movies_latest");

  } else if (Object.keys(index_media).length === 2) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_action, all_movies_action, tokens, original_name, response, "action_movie");

  } else if (Object.keys(index_media).length === 3) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_horror, all_movies_horror, tokens, original_name, response, "horror_movie");

  } else if (Object.keys(index_media).length === 4) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_max_like, max_like_movie, tokens, original_name, response, "max_like_movie");

  } else if (Object.keys(index_media).length === 5) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_max_like_all, max_like_movie_all, tokens, original_name, response, "max_like_movie_all");

  } else if (Object.keys(index_media).length === 6) {
    response.render('index.ejs', {
      series_videos: index_media.series,
      movies_videos: index_media.movies_latest,
      movies_action_videos: index_media.action_movie,
      movies_horror_videos: index_media.horror_movie,
      movies_max_like: index_media.max_like_movie,
      movies_max_like_all: index_media.max_like_movie_all
    });

  }

  // for category page media
  switch (key) {
    case 'latest_movie_all':
      response.render('category.ejs', {
        heading: 'Latest',
        movies_videos: index_media.latest_movie_all,
      });
      break;
    case 'movie_action_all':
      response.render('category.ejs', {
        heading: 'Action',
        movies_videos: index_media.movie_action_all,
      });
      break;
    case 'movie_animation_all':
      response.render('category.ejs', {
        heading: 'Animation',
        movies_videos: index_media.movie_animation_all,
      });
      break;
    case 'movie_comedy_all':
      response.render('category.ejs', {
        heading: 'Comedy',
        movies_videos: index_media.movie_comedy_all,
      });
      break;
    default:

  }
  if (key == "latest_movie_all") {

  }

}

exports.download = function(request, response) {
  response.render('downloads.ejs')
};

exports.category = function(request, response) {
  switch (request.params.type) {
    case 'latest':
      all_movies_latest_c = [];
      view_all_movie(reference_movie_latest_all, all_movies_latest_c, tokens, original_name, response, "latest_movie_all");
      break;
    case 'action':
      all_movies_action_c = [];
      view_all_movie(reference_movie_action_all, all_movies_action_c, tokens, original_name, response, "movie_action_all");
      break;
    case 'animation':
      all_movies_animation_c = [];
      view_all_movie(reference_movie_animation_all, all_movies_animation_c, tokens, original_name, response, "movie_animation_all");
      break;
    case 'comedy':
      all_movies_comedy_c = [];
      view_all_movie(reference_movie_comedy_all, all_movies_comedy_c, tokens, original_name, response, "movie_comedy_all");
      break;
    default:

  }


};

exports.view = function(request, response) {

  let reference = videos.series(request.params.movie_id);
  let series = [];
  let tokens = null;
  let original_name = null;
  let bucket = videos.storage;

  reference.get()
    .then((snapshot) => {
      arrayObject(snapshot);
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

  function arrayObject(snapshot) {
    snapshot.forEach((doc) => {
      series.push(doc.data())
    });

    let count = 0;
    series.forEach((data) => {
      bucket.file(data.trailer).get().then(function(data) {
        bindToken(data, count, series);
        count++;
      });
    });
  }

  function bindToken(data, index, series) {
    const file = data[0];
    series.forEach((info) => {
      if (info.trailer === file.name) {
        tokens = file.metadata.metadata.firebaseStorageDownloadTokens;
        original_name = file.name.split('/')[1];
        info.tokens = tokens;
        info.file_name = original_name;
      }
    });

    if (series.length === index + 1) {
      if (series.length !== 0) {

        if (series[0].video_id) {
          // movies
          switch (series[0].genre) {
            case "Action":
              response.render('view.ejs', {
                video: series,
                similar_video: index_media.action_movie,
                movie_id: request.params.movie_id
              });
              break;
            case "Horror":
              response.render('view.ejs', {
                video: series,
                similar_video: index_media.horror_movie
              });
              break;
            default:

          }
        } else {
          // series
          switch (series[0].genre) {
            case "Action":
              response.render('view.ejs', {
                video: series,
                similar_video: index_media.series
              });
              break;
            default:

          }
        }

      }

    }

  }

};
