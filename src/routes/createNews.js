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



const createNews = router.post('/', (req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    let lastNewsId = req.body.sizeNews;


    const news = {
        _id: parseInt(lastNewsId) + 1,
        "title": title,
        "description": description,
        "createdAt": new Date(),
        "watches": 0,
    };
    MongoClient.connect(DBurl, (error, db) => {
        console.log('Connection to db', DBurl);
        const collection = db.collection('news');
        if (error) {
            console.log(error);
            res.status(error.status)
                .send(error);
        } else {
            collection.insertOne(news);
            res.status(200)
                .send("");
        }
        db.close();
    })
});

module.exports = createNews;