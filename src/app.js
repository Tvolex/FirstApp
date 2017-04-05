const config = require ('./config');
const express = require ('express');
const bodyParser = require ('body-parser');
const session = require ('express-session');
const cookieParser = require ('cookie-parser');
const path = require ('path');
const login = require ('./routes/login');
const Authorization = require ('./routes/Authorization');
const AuthFD = require ('./routes/AuthForDesktop');
const Register = require ('./routes/Register');
const MyOffice = require ('./routes/MyOffice');
const deleteAcc = require ('./routes/deleteAcc');
const change = require ('./routes/change');
const deleteS = require ('./routes/deleteS');
const getPhoto = require ('./routes/getPhoto');
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
app.use('/login', login);
app.use('/deleteAcc', deleteAcc);
app.use('/change', change);
app.use('/delete', deleteS);
app.use('/photo/', getPhoto);
app.get('/test', (req, res) => {
    res.json({success: true});
});

app.listen(config.port, () => {
    console.log('Server start on port ' + config.port);
   
});
module.exports = app;

