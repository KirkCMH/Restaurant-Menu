const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

// read JSON file
const restaurants = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))


// setting the route and corresponding response
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurants.results})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurant = restaurants.results.filter(restaurant => { 
    // allow multiple search results (name, category)
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())

  })
  if (restaurant.length > 0) {
    res.render('index', { restaurant: restaurant, keyword: keyword})
  } else {
    res.render('show_no_result', { restaurant: restaurant, keyword: keyword})
  }
})

app.get('/restaurants/:id', (req, res) => {
  console.log('req.params.restaurants', req.params.id)
  const restaurant = restaurants.results.find(r => r.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})