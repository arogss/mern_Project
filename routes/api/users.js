const express = require('express')
const users = express.Router()
const uuidv4 = require('uuid/v4');
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator');

const User = require('../../models/User')

process.env.SECRET_KEY = 'secret'

users.post('/register', [
  check('fullname', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please enter valid email').isEmail(),
  check('password', 'please enter password with 3 or more').isLength({
    min: 3
  })
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      //check if user email is already in the database
      let user1 = await User.findOne({ email: req.body.email });
      if (user1) {
        return res.status(400).json({ error: [{ msg: 'user already exits' }] });
      }

      //create a user
      const newUser = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password
      });

      //hash the password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(req.body.password, salt);
      //save the user
      await newUser.save();

      //generate token
      const payload = {
        user: {
          id: newUser.id,
          name: newUser.name
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);


users.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 360000
          })
          res.send(token)
        } else {
          // Passwords don't match
          res.json({ error: 'User does not exist' })
        }
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users