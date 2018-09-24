'use strict'
const express = require('express')
const router = express.Router()
// models
const Spot = require('../models/spot')

/* GET home page. */
router.get('/', (req, res)=>{
  const user = req.user
  Spot.find()
      .populate('addedBy')
      .exec((err, data)=>{
        if (err) {
          res.send('Error en el find del Spot')
        }
        res.render('index', {title: 'Hobby It', user: user, listing:data})
      })
})
// Spot Routes

router.route('/spot')
    .get((req, res)=>{
      const user = req.user
      var successMsg = req.flash('success')[0];
      res.render('spot', {user: user, successMsg: successMsg, noMessages: !successMsg})
    })
    .post((req, res)=>{
      let spot = new Spot()
      spot.status = true
      spot.name = req.body.name
      spot.description = req.body.description
      spot.addedBy = req.user
      spot.address.lat = req.body.lat
      spot.address.lng = req.body.lng

      spot.save((err,result)=>{
        if (err) {
          return err
        }
        console.log(result);
        req.flash('success', 'Successfully Post')
        res.redirect('/spot')
      })
    })

// Spot Details
router.get('/detail/:id', (req, res)=>{
  const spotId = req.params.id
  Spot.findById(spotId, (err, info)=>{
    if (err) {
      res.send('El detalle tiene error' + err)
    }
    res.render('detail', {spot: info} )
  })
})

// router.post('/api/spot', (req, res)=>{
//   console.log('POST /api/spot/')
//   console.log(req.body)
//
//   let spot = Spot()
//   spot.title = req.body.title
//   spot.picture = req.body.picture
//   spot.description = req.body.description
//   spot.ranking = req.body.ranking
//   spot.category = req.body.category
//
//   spot.save((err, data)=>{
//     if (err) res.status(500).send({message: `Error ${err}`})
//     res.status(200).send({spot: data})
//   })
// })
//
// router.get('/api/spot', (req, res)=>{
//   Spot.find({}, (err, data)=>{
//     if(err) return res.status(500).send({message: "Error en la base de datos"})
//     if(!data) return res.status(404).send({message: `No se encuentra`})
//
//     res.status(200).send({data})
//   })
// })

module.exports = router;
