const express = require('express');
const categoryModel = require('../models/category.model');

const router = express.Router();

router.get('/', async function (req, res) {
  // const list = [
  //   { CatID: 1, CatName: 'Laptop' },
  //   { CatID: 2, CatName: 'Smartphone' },
  //   { CatID: 3, CatName: 'Tablet' },
  // ];

  const list = await categoryModel.all();
  res.render('vwCategories/list', {
    categories: list,
    empty: list.length === 0
  });
})

router.get('/add', function (req, res) {
  res.render('vwCategories/add');
})

router.post('/add', async function (req, res) {
  // req.body = {
  //   CatName: ....
  // }
  await categoryModel.add(req.body);
  res.render('vwCategories/add');
})

router.get('/edit/:id', async function (req, res) {
  // const id = +req.query.id || -1;
  const id = +req.params.id || -1;
  const rows = await categoryModel.single(id);
  if (rows.length === 0)
    return res.send('Invalid parameter.');

  const category = rows[0];
  res.render('vwCategories/edit', { category });
})

router.post('/del', async function (req, res) {
  await categoryModel.del(req.body.CatID);
  res.redirect('/admin/categories');
})

router.post('/update', async function (req, res) {
  await categoryModel.patch(req.body);
  res.redirect('/admin/categories');
})

module.exports = router;