const express = require('express')
const router = express.Router()
const Spot = require('../models/spot')

//const data =()=> Spot.find().populate('addedBy').then(function(datos){return datos}).catch(function(err){console.log(err)})
const dataSpot = async()=>{
  try{
    let box = await Spot.find().populate('addedBy')
    return box

  }catch(err){
    return 'error occured';
  }
}
//function
const spotController = {
    listingSpot: function(req, res){
        const user = req.user
        Spot.find()
            .populate('addedBy')
            .exec((err, data)=>{
              if (err) {
                res.send('Error en el find del Spot')
              }
              res.render('index', {title: 'Hobby It', user: user, listing:data})
            })
    },
    listing: function(req,res){
     Spot.find().populate('addedBy').exec((err, data)=>{
        if (err) {
          res.send('Error en el find del Spot')
        }  
        return data
      })
    },
    prueba: dataSpot
}
module.exports = spotController
