const request = require('request')


const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/87068a59d747aa5dedb2fcac388705f7/${latitude},${longitude}?units=si`
  request({ url , json: true}, (error, {body}) => {
              if (error) {
                  callback('Unable to connect to weather service ', undefined)
              } else if(body.error) {
                   callback('unable to find location', undefined)
              } else {
                  callback(undefined, `${body.daily.data[2].summary}It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain. ` )
              }
  })
}

module.exports = forecast;