const config = require ( '../config');
const mongodb = require ( 'mongodb');
const express = require ( 'express');

const DBurl = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

var getPhoto = router.get('/:id',(req, res) => {
    /** @namespace req.params */
    var idPhoto = req.params.id;
    try {
        MongoClient.connect(DBurl, (err,db) => {
            console.log("Connection to db: " + DBurl );
            var collection = db.collection('photos');
            collection.find({"idPhoto" : idPhoto}).limit(1).next((err, doc) => {
                if(err) {
                    console.log("Error : " + err);
                } else if(doc) {
                    res.json(doc);
                } else if(!doc) {
                    res.json(doc);
                }
                db.close();
            });
        })
    } catch (e) {
        console.log(e);
    }
    console.log("ID PHOTO: "  + idPhoto);
});
module.exports = getPhoto;