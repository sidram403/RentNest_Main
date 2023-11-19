import express from 'express';
import mongoose from 'mongoose';
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';

mongoose.connect('mongodb+srv://siddharthpatil9108:log123@logs.95y1w94.mongodb.net/?retryWrites=true&w=majority').then(() =>{
    console.log("Connected to MongoDB!");
}).catch((err) =>{
    console.log(err)
})


const app = express();

app.use(express.json())

app.use(cookieParser())

app.listen(3000, () =>{
    console.log('listening on port 3000!')
})

app.use("/api/listing", listingRouter)

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })

})