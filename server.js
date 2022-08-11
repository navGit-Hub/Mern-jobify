import express from 'express';


//db and authenticateUser
import connectDB from './db/connect.js';

const app=express();

import dotenv from 'dotenv';

//router
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRouter.js';

dotenv.config();
import 'express-async-errors';
import morgan from 'morgan';


//middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

if(process.env.NODE_ENV!=='production'){
    app.use(morgan('dev'));
}
app.use(express.json());


app.get("/",(req,res)=>{
res.send("Welcome");

});

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',jobsRouter);



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port=process.env.PORT || 5000;



const start=async ()=>{
    try{
       await connectDB(process.env.MONGO_URI);
       app.listen(port
        ,()=>console.log(`The server is listening from the port ${port}`));
    }
    catch(error)
    {
        console.log(error);
    }
}
start();