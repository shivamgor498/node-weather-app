const request = require('request')
const forecast = ({ latitude,longitude } = {},callback) => {
	const url = 'https://api.darksky.net/forecast/25596a0e8a4df6d019facfda8c108f46/' + latitude + ',' + longitude
	request({ url,json: true}, (error,{ body } = {}) => {
		if(error)
			callback('Unable to connect to weather service',undefined)
		else if(body.error)
			callback('Unable to find location',undefined)
		else{
			const data = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.\nTemperature High is ' + body.daily.data[0].temperatureMax + ' and Low temperature is ' + body.daily.data[0].temperatureMin
			callback(undefined,data)
		}
	})
}
module.exports = forecast