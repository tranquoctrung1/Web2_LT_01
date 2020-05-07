const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.use(express.urlencoded({
  extended: true
}));

app.engine('hbs', exphbs({
  layoutsDir: 'views/_layouts',
  defaultLayout: 'main',
  partialsDir: 'views/_partials',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  // res.send('hello expressjs');
  res.render('home');
})

app.get('/about', function (req, res) {
  res.render('about');
})

app.get('/bs', function (req, res) {
  res.sendFile(__dirname + '/bs.html');
})

app.use('/admin/categories', require('./routes/category.route'));
app.use('/admin/products', require('./routes/product.route'));

app.use(function (req, res) {
  res.render('404', { layout: false });
})

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server is running at http://localhost:${PORT}`);
})