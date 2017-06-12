const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const DBurl = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

var getNews = router.get("/", (req,res) => {
   // const allNews = {};

    MongoClient.connect(DBurl, (err, db) => {
        if (err) {
            console.log('Unable to connect to the MongoDB server. Error:', err);
        } else {
            console.log('Connection to db', DBurl);
            var collection = db.collection('news');
            collection.find().sort({$natural: -1}).toArray((e, result) => {
                if(!e) {
                    res.status(302)
                        .send(result);
                } else {
                    res.status(e.status)
                        .send(e);
                }
            });
        }
        db.close();
    });
});
module.exports = getNews;
