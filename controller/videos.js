const credential = require('./connection/firebase_credential');
const db = credential.firestore();
exports.storage = credential.storage().bucket();

exports.all_videos = function () {
    let category = "all";
    let collection = "series";
    return getVideos(db, category, collection);
};

exports.series = function (series_id) {
    series = db.collection('series').where('series_id','==',series_id);

    return series;

}

function getVideos(db, category, collection) {

    let ref;

    if (collection === "movies") {

        if (category === "all" || category === "latest") {
            ref = db.collection(collection)
                .where('launched', '==', true)
                .orderBy('launch_date', 'desc');
        } else {
            ref = db.collection(collection)
                .where('genre', '==', category)
                .where('launched', '==', true)
                .orderBy('launch_date', 'desc');
        }

    } else if (collection === "series") {

        if (category === "all" || category === "latest") {

            ref = db.collection(collection)
                .orderBy('release_date', 'desc');
        } else {
            ref = db.collection(collection)
                .where('genre', '==', category)
                .orderBy('release_date', 'desc');
        }

    }

    return ref;

}
