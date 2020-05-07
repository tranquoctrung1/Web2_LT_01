const express = require('express');
const productModel = require('../models/product.model');
const CategoriesModel  = require('../models/category.model');

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await productModel.all();
  res.render('vwProducts/list', {
    products: list,
    empty: list.length === 0
  });
})

router.get('/add', async function(req, res)
{
  const Categories = await CategoriesModel.all();
  res.render('vwProducts/add', {
    Categories: Categories
  });
})

router.post('/add', function(req, res)
{
  productModel.add(req.body);
  res.redirect('/admin/products');
});

router.get('/edit/:id', async function(req, res)
{
  const id = +req.params.id || -1;
  const rows = await productModel.single(id);
  const Categories = await CategoriesModel.all();

  
  if (rows.length === 0)
    return res.send('Invalid parameter.');

    const product = rows[0];
  res.render('vwProducts/edit', {
    Product: product,
    Categories: Categories,
  });
});

router.post('/update', async function(req, res)
{
  await productModel.patch(req.body);
  res.redirect('/admin/products');
})

router.post('/remove/:id', async function(req, res)
{
  const id = +req.params.id || -1;
  await productModel.del(id);

  res.redirect('/admin/products');
})

module.exports = router;