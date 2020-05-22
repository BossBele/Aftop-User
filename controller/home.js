exports.index = function (request, response) {
    response.render('index.ejs')
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