let videos = require('./videos');

exports.index = function (request, response) {
    let reference = videos.all_videos();
    let all_videos = [];
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
            all_videos.push(doc.data())
        });

        let count = 0;
        all_videos.forEach((data) => {
            bucket.file(data.cover_photo).get().then(function (data) {
                bindToken(data,count,all_videos);
                count++;
            });
        });
    }

    function bindToken(data,index,all_videos) {
        const file = data[0];
        all_videos.forEach((info)=>{
           if (info.cover_photo === file.name){
               tokens = file.metadata.metadata.firebaseStorageDownloadTokens;
               original_name = file.name.split('/')[1];
               info.xxx = tokens;
               info.file_name = original_name;
           }
        });

        if (all_videos.length === index+1){
            response.render('index', {
                videos: all_videos
            });
        }

    }


};

exports.download = function (request, response) {
    response.render('downloads.ejs')
};

exports.category = function (request, response) {
    response.render('category.ejs')
};

exports.view = function (request, response) {
    
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
                bucket.file(data.trailer).get().then(function (data) {
                    bindToken(data,count,series);
                    count++;
                });
            });
        }

        function bindToken(data,index,series) {
            const file = data[0];
            series.forEach((info)=>{
               if (info.trailer === file.name){
                   tokens = file.metadata.metadata.firebaseStorageDownloadTokens;
                   original_name = file.name.split('/')[1];
                   info.xxx = tokens;
                   info.file_name = original_name;
               }
            });

            if (series.length === index+1){
                response.render('view.ejs', {
                    video: series
                });
            }

        }

};
