const express = require('express')
const router = express.Router()
const Spot = require('../models/spot')

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
    }
    
}
module.exports = spotController
