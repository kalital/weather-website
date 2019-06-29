const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partailsDir = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partailsDir)


//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) =>{res.render('index', {
         title: 'Weather App',
         name: 'Khalid Talaf'
     })
 })

 app.get('/about', (req, res) => res.render('about', {
     title: 'About Me',
     name: 'Khalid Issa'
 }))

 app.get('/help', (req, res) => res.render('help', {
     message: 'Click the link in the footer to contact me',
     title: 'Help',
     name: 'Khalid Issa'
 }))
    

app.get('/weather', (req, res) => {
 if (!req.query.address) {
    return res.send({
         error: 'you must provide an address'
     })
 }
   geocode(req.query.address, ( error, { latitude, longitude, location }= {}) => {
       if(error) {
           return res.send({ error })
       }

       forecast(latitude, longitude, (error, forecastData) => {
           if(error) {
               return res.send({ error })
           }

           res.send({
               forecast: forecastData,
               location,
               address: req.query.address
           })
       })
   })
})

app.get('/products', (req, res) => {

  if (!req.query.search) {
    return  res.send({
         error: 'You must provide a search terms'
     })
  }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

 app.get('/help/*', (req, res) => res.render('404', {
     title: '404',
     name: 'Khalid Issa',
     errormessage: 'Help article not found'
 }))

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Khalid',
        errormessage: 'Page not found'
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))