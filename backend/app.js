const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


//middleware to extract data fro req bbody
app.use(cors());
app.options('*', cors())
//app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

//env routes
//const api = process.env.API_URL


//db connection
const url = 'mongodb://127.0.0.1:27017/eshop';

mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology : true })
.then(()=>{
    console.log('database connection success')
})
.catch((err) => {
    console.log(err);
})


//routes
const productRouter = require('./routes/Products');
const categoryRouter = require('./routes/Categories');
const usersRouter = require('./routes/Users');
const orderRouter = require('./routes/Orders');


//get data
//app.use(`${process.env.API_URL}/products`, productRouter);

//get and post data
app.use(`${process.env.API_URL}/products`, productRouter);
app.use(`${process.env.API_URL}/categories`, categoryRouter);
app.use(`${process.env.API_URL}/users`, usersRouter);
app.use(`${process.env.API_URL}/orders`, orderRouter);

const PORT = 3000;
app.listen(PORT, ()=>(
    //console.log(api)
    console.log(`listening on port : ${PORT}`)
))





