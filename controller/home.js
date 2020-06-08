let videos = require('./videos');
let bucket = videos.storage;
let index_media = {};
let all_series = [];
let all_movies_latest = [];
let movies_view = [];
let all_movies_c = [];
let tokens = null;
let original_name = null;
let LOADING_COMPLETE = false;
let reference_movies_latest = videos.all_videos().movies_latest;
let reference_movies_action = videos.all_videos().movies_action;
let reference_movies_horror = videos.all_videos().movies_horror;
let reference_movies_max_like = videos.all_videos().max_like_movie;
let reference_movies_max_like_all = videos.all_videos().max_like_movie_all;
let reference_series_all = videos.all_videos().series_all;
let reference_movies_drama = videos.all_videos().movie_drama;
let reference_movies_historical = videos.all_videos().movie_historical;
let reference_movies_fantasy = videos.all_videos().movie_fantasy;
let reference_movies_horrors = videos.all_videos().movie_horror;
let reference_movies_romance = videos.all_videos().movie_romance;
let reference_movies_thriller = videos.all_videos().movie_thriller;
let reference_movies_western = videos.all_videos().movie_western;
let reference_movie_latest_all = videos.latest_movie();
let reference_movie_action_all = videos.action_movie();
let reference_movie_animation_all = videos.animation_movie();
let reference_movie_comedy_all = videos.comedy_movie();
let reference_movie_crime_all = videos.crime_movie();
let reference_movie_drama_all = videos.drama_movie();
let reference_movie_fantasy_all = videos.fantasy_movie();
let reference_movie_historical_all = videos.historical_movie();
let reference_movie_horror_all = videos.horror_movie();
let reference_movie_romance_all = videos.romance_movie();
let reference_movie_thriller_all = videos.thriller_movie();
let reference_movie_western_all = videos.western_movie();

exports.index = function(request, response) {

  view_all_series(reference_series_all, all_series, tokens, original_name, response);

};

function view_all_series(reference_series_all, all_series, tokens, original_name, response) {
  //for all_series
  all_series = [];
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
    if (all_series.length === 0) {
      bindToken(null, null, all_series);
    } else {
      all_series.forEach((data) => {
        bucket.file(data.cover_photo).get().then(function(data) {
          bindToken(data, count, all_series);
          count++;
        });
      });
    }

  }

  function bindToken(data, index, all_series) {

    if (all_series.length === 0) {
      toView(response, "series", all_movies_latest);
    } else {
      const file = data[0];
      all_series.forEach((info) => {
        if (info.cover_photo === file.name) {
          tokens = file.metadata.metadata.firebaseStorageDownloadTokens;
          original_name = file.name.split('/')[1];
          info.tokens = tokens;
          info.file_name = original_name;
        }
      });
    }

    if (all_series.length === index + 1) {
      toView(response, "series", all_series);
    }

  }
  //end for all_series
}

function view_all_movie(reference_movies_latest, all_movies_latest, tokens, original_name, response, key) {
  //for all_series
  if ((key !== 'movies_latest')) {
    reference_movies_latest.get()
      .then((snapshot) => {
        toView(response, key, snapshot.size);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  } else {
    reference_movies_latest.get()
      .then((snapshot) => {
        arrayObject(snapshot);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }


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

function view_all_movie_c(reference_movies_latest, all_movies_latest, tokens, original_name, response, key) {
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

function view_movie(reference_movies_latest, movies_view, tokens, original_name, response, key, reference) {
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
      movies_view.push(doc.data())
    });

    movies_view = removeDuplicates(movies_view, "video_id");

    let count = 0;
    // console.log(movies_view);
    if (movies_view.length === 0) {
      bindToken(null, null, movies_view);
    } else {
      movies_view.forEach((data) => {
        bucket.file(data.cover_photo).get().then(function(data) {
          bindToken(data, count, movies_view);
          count++;
        });
      });
    }

  }

  function bindToken(data, index, movies_view) {
    let series = [];
    if (movies_view.length === 0) {
      if (index_media.hasOwnProperty(key) === false) {
        index_media[key] = movies_view;
      }
    } else {
      const file = data[0];
      movies_view.forEach((info) => {
        if (info.cover_photo === file.name) {
          tokens = file.metadata.metadata.firebaseStorageDownloadTokens;
          original_name = file.name.split('/')[1];
          info.tokens = tokens;
          info.file_name = original_name;
        }
      });

      if (movies_view.length === index + 1) {
        if (index_media.hasOwnProperty(key) === false) {
          index_media[key] = movies_view;
        }

      }
    }


    reference.get()
      .then((snapshot) => {
        arrayObjects(snapshot);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });

    function arrayObjects(snapshot) {
      snapshot.forEach((doc) => {
        series.push(doc.data())
      });

      let count = 0;
      series.forEach((data) => {
        bucket.file(data.trailer).get().then(function(data) {
          bindTokens(data, count, series);
          count++;
        });
      });
    }

    function bindTokens(data, index, series) {
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
                  similar_video: index_media.similar_video,
                  movies_action_videos: index_media.action_movie,
                  movies_horror_videos: index_media.horror_movie,
                  movies_max_like: index_media.max_like_movie,
                  movies_max_like_all: index_media.max_like_movie_all,
                  drama: index_media.drama,
                  historical: index_media.historical,
                  fantasy: index_media.fantasy,
                  horror: index_media.horror,
                  romance: index_media.romance,
                  thriller: index_media.thriller,
                  western: index_media.western
                });
                break;
              case "Animation":
                response.render('view.ejs', {
                  video: series,
                  similar_video: index_media.similar_video,
                  movies_action_videos: index_media.action_movie,
                  movies_horror_videos: index_media.horror_movie,
                  movies_max_like: index_media.max_like_movie,
                  movies_max_like_all: index_media.max_like_movie_all,
                  drama: index_media.drama,
                  historical: index_media.historical,
                  fantasy: index_media.fantasy,
                  horror: index_media.horror,
                  romance: index_media.romance,
                  thriller: index_media.thriller,
                  western: index_media.western
                });
                break;
              case "Comedy":
                response.render('view.ejs', {
                  video: series,
                  similar_video: index_media.similar_video,
                  movies_action_videos: index_media.action_movie,
                  movies_horror_videos: index_media.horror_movie,
                  movies_max_like: index_media.max_like_movie,
                  movies_max_like_all: index_media.max_like_movie_all,
                  drama: index_media.drama,
                  historical: index_media.historical,
                  fantasy: index_media.fantasy,
                  horror: index_media.horror,
                  romance: index_media.romance,
                  thriller: index_media.thriller,
                  western: index_media.western
                });
                break;
              case "Crime":
                response.render('view.ejs', {
                  video: series,
                  similar_video: index_media.similar_video,
                  movies_action_videos: index_media.action_movie,
                  movies_horror_videos: index_media.horror_movie,
                  movies_max_like: index_media.max_like_movie,
                  movies_max_like_all: index_media.max_like_movie_all,
                  drama: index_media.drama,
                  historical: index_media.historical,
                  fantasy: index_media.fantasy,
                  horror: index_media.horror,
                  romance: index_media.romance,
                  thriller: index_media.thriller,
                  western: index_media.western
                });
                break;
              case "Drama":
                response.render('view.ejs', {
                  video: series,
                  similar_video: index_media.similar_video,
                  movies_action_videos: index_media.action_movie,
                  movies_horror_videos: index_media.horror_movie,
                  movies_max_like: index_media.max_like_movie,
                  movies_max_like_all: index_media.max_like_movie_all,
                  drama: index_media.drama,
                  historical: index_media.historical,
                  fantasy: index_media.fantasy,
                  horror: index_media.horror,
                  romance: index_media.romance,
                  thriller: index_media.thriller,
                  western: index_media.western
                });
                break;
              case "Historical":
                response.render('view.ejs', {
                  video: series,
                  similar_video: index_media.similar_video,
                  movies_action_videos: index_media.action_movie,
                  movies_horror_videos: index_media.horror_movie,
                  movies_max_like: index_media.max_like_movie,
                  movies_max_like_all: index_media.max_like_movie_all,
                  drama: index_media.drama,
                  historical: index_media.historical,
                  fantasy: index_media.fantasy,
                  horror: index_media.horror,
                  romance: index_media.romance,
                  thriller: index_media.thriller,
                  western: index_media.western
                });
                break;
              case "Fantasy":
                response.render('view.ejs', {
                  video: series,
                  similar_video: index_media.similar_video,
                  movies_action_videos: index_media.action_movie,
                  movies_horror_videos: index_media.horror_movie,
                  movies_max_like: index_media.max_like_movie,
                  movies_max_like_all: index_media.max_like_movie_all,
                  drama: index_media.drama,
                  historical: index_media.historical,
                  fantasy: index_media.fantasy,
                  horror: index_media.horror,
                  romance: index_media.romance,
                  thriller: index_media.thriller,
                  western: index_media.western
                });
                break;
              case "Horror":
                response.render('view.ejs', {
                  video: series,
                  similar_video: index_media.similar_video,
                  movies_action_videos: index_media.action_movie,
                  movies_horror_videos: index_media.horror_movie,
                  movies_max_like: index_media.max_like_movie,
                  movies_max_like_all: index_media.max_like_movie_all,
                  drama: index_media.drama,
                  historical: index_media.historical,
                  fantasy: index_media.fantasy,
                  horror: index_media.horror,
                  romance: index_media.romance,
                  thriller: index_media.thriller,
                  western: index_media.western
                });
                break;
              case "Romance":
                response.render('view.ejs', {
                  video: series,
                  similar_video: index_media.similar_video,
                  movies_action_videos: index_media.action_movie,
                  movies_horror_videos: index_media.horror_movie,
                  movies_max_like: index_media.max_like_movie,
                  movies_max_like_all: index_media.max_like_movie_all,
                  drama: index_media.drama,
                  historical: index_media.historical,
                  fantasy: index_media.fantasy,
                  horror: index_media.horror,
                  romance: index_media.romance,
                  thriller: index_media.thriller,
                  western: index_media.western
                });
                break;
              case "Thriller":
                response.render('view.ejs', {
                  video: series,
                  similar_video: index_media.similar_video,
                  movies_action_videos: index_media.action_movie,
                  movies_horror_videos: index_media.horror_movie,
                  movies_max_like: index_media.max_like_movie,
                  movies_max_like_all: index_media.max_like_movie_all,
                  drama: index_media.drama,
                  historical: index_media.historical,
                  fantasy: index_media.fantasy,
                  horror: index_media.horror,
                  romance: index_media.romance,
                  thriller: index_media.thriller,
                  western: index_media.western
                });
                break;
              case "Western":
                response.render('view.ejs', {
                  video: series,
                  similar_video: index_media.similar_video,
                  movies_action_videos: index_media.action_movie,
                  movies_horror_videos: index_media.horror_movie,
                  movies_max_like: index_media.max_like_movie,
                  movies_max_like_all: index_media.max_like_movie_all,
                  drama: index_media.drama,
                  historical: index_media.historical,
                  fantasy: index_media.fantasy,
                  horror: index_media.horror,
                  romance: index_media.romance,
                  thriller: index_media.thriller,
                  western: index_media.western
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
                  similar_video: index_media.series,
                  movies_action_videos: index_media.action_movie,
                  movies_horror_videos: index_media.horror_movie,
                  movies_max_like: index_media.max_like_movie,
                  movies_max_like_all: index_media.max_like_movie_all,
                  drama: index_media.drama,
                  historical: index_media.historical,
                  fantasy: index_media.fantasy,
                  horror: index_media.horror,
                  romance: index_media.romance,
                  thriller: index_media.thriller,
                  western: index_media.western
                });
                break;
              default:

            }
          }

        }

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
    view_all_movie(reference_movies_action, all_movies_latest, tokens, original_name, response, "action_movie");

  } else if (Object.keys(index_media).length === 3) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_horror, all_movies_latest, tokens, original_name, response, "horror_movie");

  } else if (Object.keys(index_media).length === 4) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_max_like, all_movies_latest, tokens, original_name, response, "max_like_movie");

  } else if (Object.keys(index_media).length === 5) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_drama, all_movies_latest, tokens, original_name, response, "drama");

  } else if (Object.keys(index_media).length === 6) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_historical, all_movies_latest, tokens, original_name, response, "historical");

  } else if (Object.keys(index_media).length === 7) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_fantasy, all_movies_latest, tokens, original_name, response, "fantasy");

  } else if (Object.keys(index_media).length === 8) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_horrors, all_movies_latest, tokens, original_name, response, "horror");

  } else if (Object.keys(index_media).length === 9) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_romance, all_movies_latest, tokens, original_name, response, "romance");

  } else if (Object.keys(index_media).length === 10) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_thriller, all_movies_latest, tokens, original_name, response, "thriller");

  } else if (Object.keys(index_media).length === 11) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_western, all_movies_latest, tokens, original_name, response, "western");

  } else if (Object.keys(index_media).length === 12) {

    LOADING_COMPLETE = false;
    view_all_movie(reference_movies_max_like_all, all_movies_latest, tokens, original_name, response, "max_like_movie_all");

  } else if (Object.keys(index_media).length === 13) {
    response.render('index.ejs', {
      series_videos: index_media.series,
      movies_videos: index_media.movies_latest,
      movies_action_videos: index_media.action_movie,
      movies_horror_videos: index_media.horror_movie,
      movies_max_like: index_media.max_like_movie,
      movies_max_like_all: index_media.max_like_movie_all,
      drama: index_media.drama,
      historical: index_media.historical,
      fantasy: index_media.fantasy,
      horror: index_media.horror,
      romance: index_media.romance,
      thriller: index_media.thriller,
      western: index_media.western
    });

  }

  // for category page media
  switch (key) {
    case 'latest_movie_all':
      response.render('category.ejs', {
        heading: 'Latest',
        movies_videos: index_media.latest_movie_all,
        movies_action_videos: index_media.action_movie,
        movies_horror_videos: index_media.horror_movie,
        movies_max_like: index_media.max_like_movie,
        movies_max_like_all: index_media.max_like_movie_all,
        drama: index_media.drama,
        historical: index_media.historical,
        fantasy: index_media.fantasy,
        horror: index_media.horror,
        romance: index_media.romance,
        thriller: index_media.thriller,
        western: index_media.western
      });
      break;
    case 'movie_action_all':
      response.render('category.ejs', {
        heading: 'Action',
        movies_videos: index_media.movie_action_all,
        movies_action_videos: index_media.action_movie,
        movies_horror_videos: index_media.horror_movie,
        movies_max_like: index_media.max_like_movie,
        movies_max_like_all: index_media.max_like_movie_all,
        drama: index_media.drama,
        historical: index_media.historical,
        fantasy: index_media.fantasy,
        horror: index_media.horror,
        romance: index_media.romance,
        thriller: index_media.thriller,
        western: index_media.western
      });
      break;
    case 'movie_animation_all':
      response.render('category.ejs', {
        heading: 'Animation',
        movies_videos: index_media.movie_animation_all,
        movies_action_videos: index_media.action_movie,
        movies_horror_videos: index_media.horror_movie,
        movies_max_like: index_media.max_like_movie,
        movies_max_like_all: index_media.max_like_movie_all,
        drama: index_media.drama,
        historical: index_media.historical,
        fantasy: index_media.fantasy,
        horror: index_media.horror,
        romance: index_media.romance,
        thriller: index_media.thriller,
        western: index_media.western
      });
      break;
    case 'movie_comedy_all':
      response.render('category.ejs', {
        heading: 'Comedy',
        movies_videos: index_media.movie_comedy_all,
        movies_action_videos: index_media.action_movie,
        movies_horror_videos: index_media.horror_movie,
        movies_max_like: index_media.max_like_movie,
        movies_max_like_all: index_media.max_like_movie_all,
        drama: index_media.drama,
        historical: index_media.historical,
        fantasy: index_media.fantasy,
        horror: index_media.horror,
        romance: index_media.romance,
        thriller: index_media.thriller,
        western: index_media.western
      });
      break;
    case 'movie_crime_all':
      response.render('category.ejs', {
        heading: 'Crime',
        movies_videos: index_media.movie_crime_all,
        movies_action_videos: index_media.action_movie,
        movies_horror_videos: index_media.horror_movie,
        movies_max_like: index_media.max_like_movie,
        movies_max_like_all: index_media.max_like_movie_all,
        drama: index_media.drama,
        historical: index_media.historical,
        fantasy: index_media.fantasy,
        horror: index_media.horror,
        romance: index_media.romance,
        thriller: index_media.thriller,
        western: index_media.western
      });
      break;
    case 'movie_drama_all':
      response.render('category.ejs', {
        heading: 'Drama',
        movies_videos: index_media.movie_drama_all,
        movies_action_videos: index_media.action_movie,
        movies_horror_videos: index_media.horror_movie,
        movies_max_like: index_media.max_like_movie,
        movies_max_like_all: index_media.max_like_movie_all,
        drama: index_media.drama,
        historical: index_media.historical,
        fantasy: index_media.fantasy,
        horror: index_media.horror,
        romance: index_media.romance,
        thriller: index_media.thriller,
        western: index_media.western
      });
      break;
    case 'movie_fantasy_all':
      response.render('category.ejs', {
        heading: 'Fantasy',
        movies_videos: index_media.movie_fantasy_all,
        movies_action_videos: index_media.action_movie,
        movies_horror_videos: index_media.horror_movie,
        movies_max_like: index_media.max_like_movie,
        movies_max_like_all: index_media.max_like_movie_all,
        drama: index_media.drama,
        historical: index_media.historical,
        fantasy: index_media.fantasy,
        horror: index_media.horror,
        romance: index_media.romance,
        thriller: index_media.thriller,
        western: index_media.western
      });
      break;
    case 'movie_historical_all':
      response.render('category.ejs', {
        heading: 'Historical',
        movies_videos: index_media.movie_historical_all,
        movies_action_videos: index_media.action_movie,
        movies_horror_videos: index_media.horror_movie,
        movies_max_like: index_media.max_like_movie,
        movies_max_like_all: index_media.max_like_movie_all,
        drama: index_media.drama,
        historical: index_media.historical,
        fantasy: index_media.fantasy,
        horror: index_media.horror,
        romance: index_media.romance,
        thriller: index_media.thriller,
        western: index_media.western
      });
      break;
    case 'movie_horror_all':
      response.render('category.ejs', {
        heading: 'Horror',
        movies_videos: index_media.movie_horror_all,
        movies_action_videos: index_media.action_movie,
        movies_horror_videos: index_media.horror_movie,
        movies_max_like: index_media.max_like_movie,
        movies_max_like_all: index_media.max_like_movie_all,
        drama: index_media.drama,
        historical: index_media.historical,
        fantasy: index_media.fantasy,
        horror: index_media.horror,
        romance: index_media.romance,
        thriller: index_media.thriller,
        western: index_media.western
      });
      break;
    case 'movie_romance_all':
      response.render('category.ejs', {
        heading: 'Romance',
        movies_videos: index_media.movie_romance_all,
        movies_action_videos: index_media.action_movie,
        movies_horror_videos: index_media.horror_movie,
        movies_max_like: index_media.max_like_movie,
        movies_max_like_all: index_media.max_like_movie_all,
        drama: index_media.drama,
        historical: index_media.historical,
        fantasy: index_media.fantasy,
        horror: index_media.horror,
        romance: index_media.romance,
        thriller: index_media.thriller,
        western: index_media.western
      });
      break;
    case 'movie_thriller_all':
      response.render('category.ejs', {
        heading: 'Thriller',
        movies_videos: index_media.movie_thriller_all,
        movies_action_videos: index_media.action_movie,
        movies_horror_videos: index_media.horror_movie,
        movies_max_like: index_media.max_like_movie,
        movies_max_like_all: index_media.max_like_movie_all,
        drama: index_media.drama,
        historical: index_media.historical,
        fantasy: index_media.fantasy,
        horror: index_media.horror,
        romance: index_media.romance,
        thriller: index_media.thriller,
        western: index_media.western
      });
      break;
    case 'movie_western_all':
      response.render('category.ejs', {
        heading: 'Western',
        movies_videos: index_media.movie_western_all,
        movies_action_videos: index_media.action_movie,
        movies_horror_videos: index_media.horror_movie,
        movies_max_like: index_media.max_like_movie,
        movies_max_like_all: index_media.max_like_movie_all,
        drama: index_media.drama,
        historical: index_media.historical,
        fantasy: index_media.fantasy,
        horror: index_media.horror,
        romance: index_media.romance,
        thriller: index_media.thriller,
        western: index_media.western
      });
      break;
    default:

  }


}

exports.download = function(request, response) {
  response.render('downloads.ejs')
};

exports.category = function(request, response) {
  all_movies_c = [];
  switch (request.params.type) {
    case 'latest':
      view_all_movie_c(reference_movie_latest_all, all_movies_c, tokens, original_name, response, "latest_movie_all");
      break;
    case 'action':
      view_all_movie_c(reference_movie_action_all, all_movies_c, tokens, original_name, response, "movie_action_all");
      break;
    case 'animation':
      view_all_movie_c(reference_movie_animation_all, all_movies_c, tokens, original_name, response, "movie_animation_all");
      break;
    case 'comedy':
      view_all_movie_c(reference_movie_comedy_all, all_movies_c, tokens, original_name, response, "movie_comedy_all");
      break;
    case 'crime':
      view_all_movie_c(reference_movie_crime_all, all_movies_c, tokens, original_name, response, "movie_crime_all");
      break;
    case 'drama':
      view_all_movie_c(reference_movie_drama_all, all_movies_c, tokens, original_name, response, "movie_drama_all");
      break;
    case 'fantasy':
      view_all_movie_c(reference_movie_fantasy_all, all_movies_c, tokens, original_name, response, "movie_fantasy_all");
      break;
    case 'historical':
      view_all_movie_c(reference_movie_historical_all, all_movies_c, tokens, original_name, response, "movie_historical_all");
      break;
    case 'horror':
      view_all_movie_c(reference_movie_horror_all, all_movies_c, tokens, original_name, response, "movie_horror_all");
      break;
    case 'romance':
      view_all_movie_c(reference_movie_romance_all, all_movies_c, tokens, original_name, response, "movie_romance_all");
      break;
    case 'thriller':
      view_all_movie_c(reference_movie_thriller_all, all_movies_c, tokens, original_name, response, "movie_thriller_all");
      break;
    case 'western':
      view_all_movie_c(reference_movie_western_all, all_movies_c, tokens, original_name, response, "movie_western_all");
      break;
    default:

  }


};

exports.view = function(request, response) {

  let all = videos.series(request.params.movie_id, request.params.genre);
  let reference = all.trailer;
  let reference_v = all.movies;
  let series = [];
  let tokens = null;
  let original_name = null;
  let bucket = videos.storage;

  view_movie(reference_v, all_movies_latest, tokens, original_name, response, 'similar_video', reference);


};

function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}
