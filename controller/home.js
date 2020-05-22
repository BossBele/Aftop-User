let videos = require('./videos');
exports.index = function (request, response) {
    let reference = videos.all_videos();
    let all_videos = [];

    reference.get()
        .then((snapshot) => {
            arrayObject(snapshot);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });

    function arrayObject(snapshot){
        snapshot.forEach((doc) => {
            all_videos.push(doc.data())
        });

        response.render('index', {
            videos: all_videos
        });

    }
};

exports.download = function (request, response) {
    response.render('downloads.ejs')
};

exports.category = function (request, response) {
    response.render('category.ejs')
};

exports.view = function (request, response) {
    response.render('view.ejs')
};