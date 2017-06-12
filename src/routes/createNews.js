const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const async = require('async');
const shortId = require('short-id');
const getMaxID = require('./getMaxID');
const ObjectId = require('objectid');
const DBurl = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;



var createNews = router.post('/', (req,res) => {
    var title = req.body.title;
    var description = req.body.description;
    var maxId = req.body.sizeNews;

    console.log("-------request---------");
    console.log(req.body.sizeNews);
    console.log("-------request---------");
    const news = {
        _id: parseInt(maxId) + 1,
        "title": title,
        "description": description,
        "createdAt": new Date(),
        "watches": 0,
    };
    MongoClient.connect(DBurl, (error, db) => {
        console.log('Connection to db', DBurl);
        var collection = db.collection('news');

        if (error) {
            console.log(error);
            res.status(error.status)
                .send(error);
        } else {
            console.log("news id: " + news._id);
            collection.insertOne(news);
            db.close();
        }
    })
});

module.exports = createNews;