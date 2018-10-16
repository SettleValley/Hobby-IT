'use strict'
const express = require('express')
const router = express.Router()
// models
const Spot = require('../models/spot')
const Comment = require('../models/comment')
const Category = require('../models/category')
//middleware
const authLogin = require('../middleware/userAuth')
//Multer Config
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/uploads/')
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname)
  }
});
const fileFilter = (req, file, cb)=>{
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  }else {
    cb(null, false)
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5120 * 5120 * 5
  },
  fileFilter: fileFilter
}).array('spotImage', 12)

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
// Execute middleware under this router ../middleware/userAuth.js
router.use('/', authLogin.isLoggedIn)

// Spot Routes
router.route('/spot')
    .get((req, res)=>{
      const user = req.user
      var successMsg = req.flash('success')[0];
      res.render('spot', {user: user, successMsg: successMsg, noMessages: !successMsg})
    })
    .post((req, res)=>{
      // console.log(req.files)
      upload(req, res, function(err){
        if (err) {
          res.send('Error al subir la imagen')
        }
        let spot = new Spot()
        spot.status = true
        spot.name = req.body.name
        spot.description = req.body.description
        spot.addedBy = req.user
        spot.address.lat = req.body.lat
        spot.address.lng = req.body.lng
        spot.gallery = req.files
        spot.save((err,result)=>{
          if (err) {
            console.log(err);
            return err
          }
          req.flash('success', 'Successfully Post')
          res.redirect('/detail/' + spot.id)
          // Spot.findById(spot.id, (err, data)=>{
          //   if (err) {
          //     res.send(err)
          //   }
          //
          //   let category = new Category()
          //   category.spotBy = result._id
          //   category.userBy = result.addedBy
          //   category.title = req.body.category
          //   category.save((err, result)=>{
          //     if (err) {
          //       res.send(err)
          //     }
          //
          //   })
          // })

        })
      });
    })

// Spot Details
router.route('/detail/:id')
      .get((req, res)=>{
        Spot.findById(req.params.id)
            .populate('addedBy')
            .populate('comments')
            .exec((err, info)=>{
              if (err) {
                res.send(err)
              }
              console.log(info)
              res.render('detail',{spot:info})
            })
      })
      .post((req, res)=>{
        let comment = new Comment()
        comment.feed = req.body.feedback
        comment.userBy = req.user._id
        comment.spotBy = req.params.id
        comment.save((err, result)=>{
          if (err) {
            res.send(err)
          }
          Spot.findById(req.params.id, (err, spot)=>{
            spot.comments.push(result._id)
            spot.save((err, kash)=>{
              if (err) {
                return err
              }
              res.redirect('/detail/' + req.params.id)
            })
          })
        })
      })
// router.get('/detail/:id', (req, res)=>{
//   const spotId = req.params.id
//   Spot.findById(spotId, (err, info)=>{
//     if (err) {
//       res.send('El detalle tiene error' + err)
//     }
//     res.render('detail', {spot: info} )
//   })
// })

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
