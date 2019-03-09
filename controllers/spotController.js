const express = require('express')
const router = express.Router()
const Spot = require('../models/spot')
const Category = require('../models/category')
//Querys
const listingSpot = async()=>{ // All data spot with merge User who added
  try{
    let box = await Spot.find().populate('addedBy')
    return box
  }catch(err){
    return 'error occured';
  }
}

const filterSpot = async(query)=>{ //Filter data using Category Schema and populate all the spot data
  try{
    let box = await Category.find({"title":{$regex: query, $options: "i"}})
                            .populate({path:'userBy', select: 'name email'})
                            .populate('spotBy')
    return box
  }catch(err){
    return err
  }
}

//array functions
const spotController = {
    listingSpot: listingSpot,
    filterSpot: function(query){
      filterSpot(query)
        .then(function(content){
          return content
        })
    }
}
module.exports = spotController
