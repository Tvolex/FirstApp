const download = require('image-downloader');
const router = require('express').Router();
const Request = require('request');

const randomPhoto = router.get('/photo/:w/:h', (req, res) => {
    var width = req.params.w;
    var height = req.params.h;
    var uri = `https://source.unsplash.com/random/${width}x${height}`;
    Request(uri, (request, response, body) =>{
        var url = response.request.uri.href;
        console.log(url);
        res.send(`<img src='${url}'/>`);
    });


});
module.exports = randomPhoto;