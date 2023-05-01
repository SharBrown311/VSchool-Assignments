const express = require('express')
const authRouter = express.Router()
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

// signup
authRouter.post("/signup", (req, res, next) => {
  User.findOne({
    username: req.body.username.toLowerCase()
  }, (err, user) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    if (user) {
      res.status(403)
      return next(new Error("That username is already taken"))
    }
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      // payload,            // secret
      const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
      return res.status(201).send({
        token,
        user: savedUser.withoutPassword()
      })
    })
  })
})

// login
authRouter.post("/login", (req, res, next) => {
  User.findOne({
    username: req.body.username.toLowerCase()
  }, (err, user) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    if (!user) {
      res.status(403)
      return next(new Error("Username or Password are incorrect"))
    }
    user.checkPassword(req.body.password, (err, isMatch) => {
      if (err) {
        res.status(403)
        return next(new Error("Username or Password are incorrect"))
      }
      if (!isMatch) {
        res.status(403)
        return next(new Error("Username or Password are incorrect"))
      }
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
      return res.status(200).send({
        token,
        user: user.withoutPassword()
      })
    })
  })
})

// update user information
authRouter.put("/user/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }
    const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
    return res.status(200).send({
      token,
      user: user.withoutPassword()
    });
  });
});

//get all users
authRouter.get('/user', (req, res, next) => {
  User.find((err, User) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(User)
  })
})

// get all user information by the user id
authRouter.get("/users/:id", (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }
    const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
    return res.status(200).send({
      token,
      user: user.withoutPassword()
    });
  });
});



module.exports = authRouter