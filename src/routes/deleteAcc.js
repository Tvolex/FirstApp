const mongodb = require ('mongodb');
const config = require ('../config');
const express = require ('express');

const router = express.Router();
const MongoClient = mongodb.MongoClient;
const DBurl = config.DBurl;

var deleteAcc = router.post("/", (req,res) => {
    console.log("Session destroyed");
    var UserEmail =  req.session.UserEmail;
    try{
        MongoClient.connect(DBurl, (err, db) => {
            if(err) {
                console.log(err);
                res.status(err.status)
                    .send(err)
                    .end();
            } else {
                console.log("Connection to db: " + DBurl);
                var collection = db.collection("users");
                var userDelete = collection.removeOne({"UserEmail" : UserEmail});
                if(userDelete) {
                    res.clearCookie('btnExit')
                        .status(200)
                        .end();
                } else {
                    res.status(400)
                        .end();
                }
                db.close();
            }
        });
    } catch (e) {
        console.log(e);
        res.status(400);
    }

    req.session.destroy();
});

module.exports = deleteAcc;