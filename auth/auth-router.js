const router = require('express').Router();
const jwt = require('jsonwebtoken')
const Users = require('./user-model')
const bcrypt = require('bcryptjs')

router.post('/register', (req, res) => {
  // implement registration
  const userCreds = req.body
  const rounds = 3
  const hash = bcrypt.hashSync(userCreds.password, rounds)
  userCreds.password = hash
  Users.addUser(userCreds)
    .then(user=>{
      res.status(201).json(user)
    })
    .catch(err=>{
      res.status(500).json({
        message: 'unable to save user',
        error: err
      })
    })
});

router.post('/login', (req, res) => {
  // implement login
  const creds = req.body

  Users.getUsersBy({username: creds.username})
    .then(([user])=>{
      if(user && bcrypt.compareSync(creds.password, user.password)){
        const token = createToken(user)
        res.status(200).json({
          message: 'logged in!',
          token: token
        })
      }else{
        res.status(401).json({ message: "Invalid credentials" })
      }
    })
    .catch(err=>{
      res.status(500).json({
        message: 'trouble logging in'
      })
    })
  
});

function createToken(user){
  const payload = {
    sub: user.id,
    username: user.username
  }
  const secret = 'shhhhhhhhhh'
  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload,secret,options)
}

module.exports = router;
