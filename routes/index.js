'use strict'
const express = require('express')
const router = express.Router()
// models
const Spot = require('../models/spot')

/* GET home page. */
router.get('/', (req, res)=>{
  const user = req.user
  res.render('index', {title: 'Hobbit', user: user})
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

router.get('/api/spot', (req, res)=>{
  Spot.find({}, (err, data)=>{
    if(err) return res.status(500).send({message: "Error en la base de datos"})
    if(!data) return res.status(404).send({message: `No se encuentra`})

    res.status(200).send({data})
  })
})

module.exports = router;
