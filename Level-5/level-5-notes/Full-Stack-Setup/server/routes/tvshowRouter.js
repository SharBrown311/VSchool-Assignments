const express = require("express")
const tvshowRouter = express.Router()
// const { v4: uuidv4 } = require('uuid');
const Show = require("../models/show.js")
//GET ALL MOVIES


tvshowRouter.get("/", (req, res, next) => {
    Show.find((err, shows) =>{
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(shows)
    })
})


//GET ONE MOVIE
tvshowRouter.get("/:tvshowId", (req, res, next) => {
  const tvshowId = req.params.tvshowId
  const foundTvshow = Show.find(show => show._id === tvshowId)
  if(!foundTvshow){
    const error = new Error(`The item with ${tvshowId} was not found, please try again. `)
    res.status(500)
    return next(error)
  }
})


//POST ONE
tvshowRouter.post("/", (req, res, next) => {
  const newShow = new Show(req.body)
  newShow.save((err, savedShow) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(savedShow)
  })
})

//DELETE ONE
tvshowRouter.delete("/:tvshowId", (req, res, next) => {
  Show.findOneAndDelete({_id: req.params.tvshowId}, (err, deletedShow) =>{
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(`Successfully deleted ${deletedShow.title} from the database`)
  })
})

//PUT or UPDATE ONE
tvshowRouter.put("/:tvshowId", (req, res, next) => {
  Show.findOneAndUpdate(
    {_id: req.params.tvshowId}, //find this one to update
    req.body,    //update the body with this data
    {new: true},//sends back the updated version
    (err, updatedShow) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedShow)
    }
  )
})




module.exports = tvshowRouter