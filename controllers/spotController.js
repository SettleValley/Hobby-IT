const express = require('express')
const router = express.Router()
const Spot = require('../models/spot')
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
    //let box = await Spot.find({"categories": {"name" : {$regex: query, $options: "i"}} })
    let box = await Spot.find({"categories": { $elemMatch: {name: {$regex: query, $options: "i"}}}})

    return box
  }catch(err){
    return err
  }
}

const createSpot = async(req, res)=>{
   //nuevo
   let spot = new Spot()
   spot.status = true
   spot.name = req.body.name
   spot.description = req.body.description
   spot.addedBy = req.user
   spot.address.lat = req.body.lat
   spot.address.lng = req.body.lng
   spot.gallery = req.files
   spot.categories.push({"name":req.body.categories})
   let newSpot = await spot.save()
   return newSpot 
}


//array functions
const spotController = {
    listingSpot: listingSpot,
    filterSpot: filterSpot,
    createSpot: createSpot
}
module.exports = spotController
