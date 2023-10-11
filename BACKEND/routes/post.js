const express = require('express')
const router = express.Router();
const User = require('../models/post');
const checkauth = require('../check-auth')

router.get('', (req,res) => {
})

router.post('', checkauth, (req,res) => {
    const post = new post(
        {
            name:req.body.name,
            department:req.body.depatment,
            id: req.body.id
            
        }
    )
    user.save().then(()=>{
        res.status(201).json({
            message:'Post Created',
            post:post
        })
    })
})

router.delete('/;id', checkauth, (req,res) => {
})

module.exports = router