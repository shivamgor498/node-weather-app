const request = require('request')
const geocode = (address,callback) => {
	const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2hpdmFtZ29yNDk4IiwiYSI6ImNqdW1hbng2ajI4ZHY0ZG9hcWcxYjgyaG4ifQ.QWh-6Eim8DHovZMJNW53rg&limit=1'
	request({ url,json: true},(error,{ body } = { } ) => {
		if(error)
			callback('Unable to connect to geocode service',undefined)
		else if(body.message==='Not Found')
			callback('Unable to find location',undefined)
		else if(body.features.length===0)
			callback('Unable to find location',undefined)
		else{
			const data = {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				place: body.features[0].place_name
			}
			callback(undefined,data)
		}
	})
}
module.exports = geocode