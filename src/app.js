// import required modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const my_geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()
// set view engine
app.set('view engine','hbs')
// paths
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const port = process.env.PORT || 3000
// set views Path
app.set('views',viewsPath)
// register partials
hbs.registerPartials(partialsPath)
// use static files
app.use(express.static(publicPath))
app.get('',(req,res) => {
	res.render('index',{
		title: 'Home Page',
		name: 'Shivam Gor'
	})
})
app.get('/about',(req,res) => {
	res.render('about',{
		title: 'About Page',
		name: 'Shivam Gor'
	})
})
app.get('/about/*',(req,res) => {
	res.render('error',{
		err: 'About subpage not found'
	})
})
app.get('/help',(req,res) => {
	res.render('help',{
		title: 'Help Page',
		name: 'Shivam Gor'
	})
})
app.get('/help/*',(req,res) => {
	res.render('error',{
		err: 'Help subpage not found'
	})
})
app.get('/weather',(req,res) => {
	if(!req.query.address){
		return res.send({
			err: 'Please enter address'
		})
	}
	const address = req.query.address
	my_geocode(address,(error,data) => {
		if(error)
			res.send({
				err: error
			})
		else{
			forecast(data,(error,data) => {
				if(error)
					res.send({
						err: error
					})
				else
					res.send({
						location: address,
						data
					})
			})
		}
	})
})
app.get('*',(req,res) => {
	res.render('error',{
		err: 'Weather Page 404 not found'
	})
})
app.listen(port,() => {
	console.log('Server started')
})