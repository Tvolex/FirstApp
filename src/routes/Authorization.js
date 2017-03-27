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
                collection.find({"UserEmail": UserEmail, "password": UserPassword}).toArray((err, doc) => {
                    if (err) {
                        console.log(err);
                    } else if (doc) {                                                      // в бд є такий юзер
                        User.UserEmail = UserEmail;
                        req.session.UserEmail = UserEmail;
                        collection.updateOne({"UserEmail": UserEmail}, {$set: {"SessionID" : req.sessionID}});
                        res.cookie('btnExit', true)
                            .send(User);
                    } else {                                                                  // в бд немає такого юзера
                        User.UserEmail = undefined;
                        res.status(401)
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