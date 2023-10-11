const express = require('express')
const app = express();
const urlprefix = '/api'
const mongoose = require('mongoose')
//const users = require('./models/users')
const fs = require('fs');
//const users = require('./models/users');
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
    server: {sslCA: cert}};
const connstring = 'mongodb+srv://aidenbosman:Roh20aid@cluster0.b95xpuu.mongodb.net/?retryWrites=true&w=majority'

//const user = require('./routes/users')
const auth = require('./check-auth')
const postRoutes = require('./routes/post')
const usersRoutes = require("./routes/users");

mongoose.connect(connstring)
.then(()=>
{
    console.log('Connected :-)')
})
.catch(()=>
{
    console.log('NOT connected :-(')
},options);


app.use(express.json())

app.use((reg,res,next)=>
{
res.setHeader('Access-Control-allow-orings', '*');
res.setHeader('Acess-Control-Allow-Headers',
'Origin,X-Requested-With,Content-Type,Accept,Authorization');
res.setHeader('Acess-Control-Allow-Methods','*');
next();
})

app.get(urlprefix+'/', (req, res) => {

})

app.use(urlprefix+'/post', postRoutes)
app.use(urlprefix+'/users', usersRoutes)
app.use(urlprefix+'/check-auth', auth)


app.post(urlprefix+'/users', (req,res) => {
    const users = new users (
        {
            name: req.body.name,
            username: req.body.username,
            department: req.body.department
        }
    )
    bulletin.save();
    res.status(201).json({
        message: 'User Created',
        users:users
    })
})

const port = 3000

module.exports = app;