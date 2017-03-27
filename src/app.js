import config from './config';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';

//noinspection JSUnresolvedVariable
import login from './routes/login';
//noinspection JSUnresolvedVariable
import Authorization from './routes/Authorization';
//noinspection JSUnresolvedVariable
import AuthFD from './routes/AuthForDesktop';
//noinspection JSUnresolvedVariable
import Register from './routes/Register';
//noinspection JSUnresolvedVariable
import MyOffice from './routes/MyOffice';
//noinspection JSUnresolvedVariable
import deleteAcc from './routes/deleteAcc';
//noinspection JSUnresolvedVariable
import CheckLogin from './routes/CheckLogin';
//noinspection JSUnresolvedVariable
import change from './routes/change';
//noinspection JSUnresolvedVariable
import deleteS from './routes/deleteS'
//noinspection JSUnresolvedVariable
import getPhoto from './routes/getPhoto';
const app = express();

app.use(cookieParser());
app.use(bodyParser());
app.use(session({
    secret: 'Tvolex hehehehe 2016',
    resave: false,
    saveUninitialized: true
}));



// view engine setup
app.set('views', path.join(__dirname, '../view'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
//noinspection JSUnresolvedVariable
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req,res)=>{
    res.render('index');
});
app.get('/index', (req,res)=>{
    res.render("index");
});
app.get('/Enter', (req,res)=>{
    res.render("Enter");
});
app.get('/analysis', (req, res)=> {
    res.render('analysis');
});
app.get('/AboutUs', (req,res)=>{
    res.render("AboutUs");
});
app.get('/Setting', (req,res)=>{
    res.render("Setting");
});
app.get('/RandomImages', (req,res)=>{
    res.render("RandomImages");
});
app.use('/MyOffice', MyOffice);
app.use('/Authorization', Authorization);
app.use('/AuthForDesktop', AuthFD);
app.use('/Register', Register);
app.use('/CheckLogin', CheckLogin);
app.use('/login', login);
app.use('/deleteAcc', deleteAcc);
app.use('/change', change);
app.use('/delete', deleteS);
app.use('/photo/', getPhoto);


app.listen(config.port, () => {
    console.log('Server start on port ' + config.port);
   
});
module.exports = app;

