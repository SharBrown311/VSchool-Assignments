const express = require("express")
const movieRouter = express.Router()
// const { v4: uuidv4 } = require('uuid');
const Movie = require("../models/movie.js");

//GET ALL MOVIES
movieRouter.get("/", (req, res, next) => {
    Movie.find((err, movies) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(movies)
    })
})


//GET ONE MOVIE
movieRouter.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId
  const foundMovie = Movie.find(movie => movie._id === movieId)
  if(!foundMovie){
    const error = new Error(`The item with ${movieId} was not found, please try again. `)
    res.status(500)
    return next(error)
  }
})



//POST ONE
movieRouter.post("/", (req, res, next) => {
  const newMovie = new Movie(req.body)
  newMovie.save((err, savedMovie) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(savedMovie)
  })
})

//DELETE ONE
movieRouter.delete("/:movieId", (req, res, next) => {
  Movie.findOneAndDelete({_id: req.params.movieId}, (err, deletedMovie) =>{
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(`Successfully deleted ${deletedMovie.title} from the database`)
  })
})


//PUT or UPDATE ONE
movieRouter.put("/:movieId", (req, res, next) => {
  Movie.findOneAndUpdate(
    {_id: req.params.movieId}, //find this one to update
    req.body,    //update the body with this data
    {new: true},//sends back the updated version
    (err, updatedMovie) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedMovie)
    }
  )
})



module.exports = movieRouter


