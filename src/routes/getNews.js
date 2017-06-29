const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const DBurl = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

const getNews = router.get("/", (req,res) => {
    const lastNewsId = req.query.lastNewsId;
    MongoClient.connect(DBurl, (err, db) => {
        if (err) {
            console.log('Unable to connect to the MongoDB server. Error:', err);
        } else {
            console.log('Connection to db', DBurl);
            const collection = db.collection('news');
            collection.find().sort({$natural: -1}).toArray((e, result) => {
                if(!e) {
                    if (lastNewsId > 0) {
                        const sres = result.slice(lastNewsId, result.length);
                        res.status(200)
                            .json(sres);
                    } else {
                        res.status(200)
                            .json(result)
                    }
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
