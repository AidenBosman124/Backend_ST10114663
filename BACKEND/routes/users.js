const express = require('express')
const router = express.Router();
const User = require('../models/users');
router.post('/signup', (req,res) => {

User.findOne({username: req.body.username})
.then(user => {
    // Prevent users with the same name
    if (user) {
        // i am teapot
        return res.status(418).json({
            message: "Name already taken!"
        });
    }
    // Generate a salt for the user
    const salt = bcrypt.genSaltSync(10);
    // Hash password with generated salt
    bcrypt.hash(req.body.password, salt)
    .then(hash => {
        // Store user in mongoDB
        const user = new User({
            username: req.body.username,
            password: hash,
            salt: salt
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: "User created",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    })
})
})

//signup for users
router.post('/signup', (req,res) => {
    const user = new User(
        {
            name:req.body.name,
            department:req.body.depatment,
            username:req.body.username,
            password:req.body.password
        }
    )
    user.save().then(()=>{
        res.status(201).json({
            message:'User Created',
            user:user
        })
    })
})

//Login for users
router.post('/login', (req, res)=>{
    let fetchedUser;
    User.findone({username:req.body.username})
    .then(user=>{
    })
    .then(result=>{
        if(!result)
        {
            return res.status(401).json(
            {
                message: "Authentication Failure"
            });
        }

        //check username and password
        if (req.body.username == "" || req.body.password == "") {
            return res.status(409).json({
                message: "One or more input fields are blank!"
            });
        };

        //generate token
        const token = jwt.sign({username:fetchedUser.username,userid:fetchedUser._id},
                      'secret_this_should_be_longer_than_it_is',
                      {expiresIn:'1h'});

        res.status(200).json({token:token});
    })
    .catch(err =>{
    return res.status(401).json({
    message:"Authentication Failure"
    });
    })
})

module.exports = router