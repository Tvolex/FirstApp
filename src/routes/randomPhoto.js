const download = require('image-downloader');


const randomPhoto = router.get('/photo:w/:h', (req,res) => {
    var width = req.params.w;
    var height = req.params.h;
    res.send('Width: ' + width + '<br>' + 'heigth: ' + height)
});
module.exports = randomPhoto;