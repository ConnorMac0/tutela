import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import stripeWebhookRouter from './routes/stripeWebhookRoute.js'

// App config
const https = await import('https');
const fs = await import('fs');
const app = express()
const port = process.env.PORT || 8080
connectDB()
connectCloudinary()

// Options for ssl certification
const options = {
    key: fs.readFileSync('./ssl/origin.key'),
    cert: fs.readFileSync('./ssl/origin.pem'),
  };

// Middleware

app.use(cors())
app.use('/api/stripe-webhook', stripeWebhookRouter)
app.use(express.json())
// API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)


app.get('/',(req,res)=>{
    res.send("Server Is Running")
})

// Starts server using https
https.createServer(options, app).listen(port, () => {
    console.log(`Server is running on HTTPS port ${port}`);
  });