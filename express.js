require('dotenv').config()
const petRoute = require('./3-routes/petRoute')
const authRoute = require('./3-routes/authRoute')
const userRoute = require('./3-routes/userRoute')
const errorMW = require('./6-middlerWares/errorMW')
const cors = require('cors')

const express = require('express')
const {MongoClient, ServerApiVersion} = require('mongodb')

const app = express()
app.use(
	cors({
		origin: '*',
	})
)
app.use(express.json())

const mongoose = require('mongoose')
const e = require('express')
mongoose
	.connect(`mongodb+srv://jonathan_kelman:mediaNo1030@cluster0.nhark3v.mongodb.net/petAdoption?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log('connected to petAdoption DB')
	})
	.catch((e) => {
		console.log('error', e)
	})
app.use('/api/pet', petRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

app.use(errorMW)

app.listen(4000, () => {
	console.log('listening on port 4000...')
})
