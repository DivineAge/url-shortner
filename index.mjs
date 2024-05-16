import express from 'express'
import mongoose from 'mongoose';
import router from './routers/routers.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';


const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(session({
    secret : "ismurfihack",
    saveUninitialized : false,  
    resave : false,
    cookie: {
        // secure : true,
        maxAge : 60000*60,
        
    }
}));


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