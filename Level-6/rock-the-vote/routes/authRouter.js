const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

//Get all Users path = auth/users
authRouter.get('/users', (req, res, next) => {
  User.find((err,User) => {
    if(err){
    res.status(500)
    return next(err)
    }
    return res.status(200).send(User)
  })
})


//signup new user
//path = auth/signup
authRouter.post('/signup', (req, res, next) => {
  User.findOne({
    username: req.body.username.toLowerCase()
  }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(user){
      res.status(403)
      return next(new Error("That username is not available, Please try again."))
    }
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
      if(err){
        res.status(500)
        return next(err)
      }
       // payload,            // secret
      const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
      return res.status(201).send( { token, user: savedUser.withoutPassword() } )
    })
  })
})

//Login the users
//path = auth/users/login
authRouter.post("/login", (req, res, next) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(!user){
      res.status(403)
      return next(new Error("Login Unsuccessful, Username or Password are incorrect"))
    }
    user.checkPassword(req.body.password, (err, isMatch) => {
      if (err) {
        req.status(403)
        return next(new Error("Login Unsuccessful, Username or Password are incorrect"))
      }
      if (!isMatch) {
        res.status(403)
        return next(new Error("Login Unsuccessful, Username or Password are incorrect"))
      }
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
      return res.status(200).send({ token, user: user.withoutPassword() })
    })
  })
})
//update user information


module.exports = authRouter