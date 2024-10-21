import {config} from 'dotenv';
config();
import express from 'express';
import userRoutes from './routes/user.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cors from 'cors';
import morgan from 'morgan';
import courseRoutes from './routes/course.routes.js';
import cookieParser from "cookie-parser";
import paymentRoutes from './routes/payment.routes.js';
import miscellaneousRoutes from './routes/miscellaneous.routes.js';


const app=express();



app.use(express.json()); 
app.use(express.urlencoded({extended:true}));


app.use(cookieParser());

app.use(cors({
	origin:process.env.FRONTEND_URL,
	credentials:true
}));

console.log("t1-",process.env.FRONTEND_URL);

app.use(morgan('dev'));


app.get('/ping',(req,res)=>{
	res.send("pong");
});

// all major routes 
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments',paymentRoutes);
app.use('/api/v1',miscellaneousRoutes);

app.all("*",(req,res)=>{
	res.status(404).send("OOOPS!! Page not found ");
})

// error handling middleware 
app.use(errorMiddleware);

export default app;                                                                                    