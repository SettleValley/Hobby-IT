'use strict'
var express = require('express');
var router = express.Router();
// models
const Spot = require('../models/spot')

/* GET home page. */
router.get('/', (req, res)=>{
  res.render('index', {title: 'Hobbit'})
})
// Spot Routes
router.post('/api/spot', (req, res)=>{
  console.log('POST /api/spot/')
  console.log(req.body)

  let spot = Spot()
  spot.title = req.body.title
  spot.picture = req.body.picture
  spot.description = req.body.description
  spot.ranking = req.body.ranking
  spot.category = req.body.category

  spot.save((err, data)=>{
    if (err) res.status(500).send({message: `Error ${err}`})
    res.status(200).send({spot: data})
  })
})

module.exports = router;
