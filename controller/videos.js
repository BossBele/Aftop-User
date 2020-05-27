const credential = require('./connection/firebase_credential');
const db = credential.firestore();
exports.storage = credential.storage().bucket();

exports.all_videos = function () {
    return getVideos(db);
};

exports.series = function (series_id) {
    let check = series_id.split('_');

    if (check[0] === "movie") {
        trailer = db.collection('movies').where('video_id','==',series_id);
    }else{
        trailer = db.collection('series').where('series_id','==',series_id);
    }

    return trailer;

}

function getVideos(db) {

    let series_all;
    let series_latest;
    let movies_all;
    let movies_latest;
    let movies_action;
    let movies_horror;
    let data = {};

    movies_action = db.collection('movies')
        .where('genre', '==', 'Action')
        .where('launched', '==', true)
        .orderBy('launch_date', 'desc');

    movies_horror = db.collection('movies')
        .where('genre', '==', 'Horror')
        .where('launched', '==', true)
        .orderBy('launch_date', 'desc');

    movies_latest = db.collection('movies')
        .where('launched', '==', true)
        .orderBy('launch_date', 'desc');

    movies_all = db.collection('movies')
        .orderBy('launch_date', 'desc');

    series_all = db.collection('series')
        .orderBy('release_date', 'desc');


    data.movies_action = movies_action;
    data.movies_latest = movies_latest;
    data.movies_all = movies_all;
    data.series_all = series_all;
    data.movies_horror = movies_horror;

    return data;

}
