import express from 'express'
import mongoose from 'mongoose';
import router from './routers/routers.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(session({
    secret : "i-smurf-i-hack-omak",
    saveUninitialized : false,  
    resave : false,
    cookie: {
        // secure : true,
        maxAge : 60000*60,
        
    },
    store : MongoStore.create({
        mongoUrl : 'mongodb://localhost:27017/Url-Shortner'
    }),
}));

app.use(passport.initialize())
app.use(passport.session())
app.use('/', router);


mongoose.connect('mongodb://localhost:27017/Url-Shortner')
    .then(() => {
        console.log("DataBase connected!")
        app.listen(80, () => {
            console.log("Server is running on port 80")
        })
    })
    .catch((error) => {
        console.log(error)
    });