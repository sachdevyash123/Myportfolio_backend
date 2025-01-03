const express=require('express')
const app=express();
const cors=require('cors')
const dotenv=require('dotenv')
const portfolioRoute=require('./routes/portfolioRoute')
app.use(cors())
app.use(express.json())
dotenv.config()

//routes
app.use('/api/v1/portfolio',portfolioRoute)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
})