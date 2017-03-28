import config from '../config';
import mongodb from 'mongodb';
import express from 'express';

const DBurl = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

var Auth = router.post("/", (req,res) => {

    var User = {};
    var UserEmail = req.body.UserEmail;
    var UserPassword = req.body.password;

    try {
        MongoClient.connect(DBurl, (err, db) => {
            if (err) {
                console.log('Unable to connect to the MongoDB server. Error:', err);
            } else {
                console.log('Connection to db', DBurl);
                var collection = db.collection('users');
                collection.find({"UserEmail": UserEmail, "password": UserPassword}).limit(1).next((err, doc) => {
                    console.log(doc);
                    if (err) {
                        console.log(err);
                    } else if(doc) {
                        console.log("found user");
                        req.session.UserEmail = UserEmail;
                        collection.updateOne({"UserEmail": UserEmail}, {$set: {"SessionID" : req.sessionID}});
                        res.cookie('btnExit', true)
                            .status(200)
                            .send(User)
                    } else if(!doc) {                                                                  // в бд немає такого юзера
                        console.log("not found user");
                        res.status(401)
                            .cookie('btnExit', false)
                            .send(User)
                            .end();
                    }
                    db.close();
                });
            }
        });
    } catch (e){
        res.send(e.status);
        res.end();
    }
});

module.exports = Auth;