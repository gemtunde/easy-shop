const {User} = require('../models/User');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//getting list of users
// select is used to display fields wanted or not wanted.
//here minus sign is added to the passwordhash to remove it from response to the frontend
router.get('/', async (req,res)=>{

     const userList = await User.find().select('-passwordHash');

    if(!userList) {
        res.status(500).json({success: failed})
    }
     res.status(200).send(userList)
});

//getting a single user
// select is used to display fields wanted or not wanted.
//here minus sign is added to the passwordhash to remove it from response to the frontend
router.get('/:id', async(req, res)=> {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if(!user) return res.status(500).send('user not found');
    res.status(200).send(user)
})


//post or creating a user will be used for the admin who wants to create a user
router.post('/', async(req, res) => {
        const {name, email, phone,password, isAdmin,street,apartment, zip, city,country} = req.body
        let user = new User({
            name, email, phone, passwordHash: bcrypt.hashSync(password, 10),isAdmin,street,apartment, zip, city,country
        });

        user = await user.save();

        if(!user) return res.status(400). send('server error');
        res.status(200).send(user)

});

//creating a user register
router.post('/register', async(req, res) => {
      //  const {name, email, phone,password, isAdmin,street,apartment, zip, city,country} = req.body
        let user = new User({
            name : req.body.name,
            email: req.body.email,
            phone : req.body.phone,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            isAdmin : req.body.isAdmin,
            street: req.body.street,
            apartment : req.body.apartment, 
            zip: req.body.zip,
             city: req.body.city,
             country: req.body.country

        });

        user = await user.save();

        if(!user) return res.status(400). send('server error');
        res.status(200).send(user)

})

//login
router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    const secret = process.env.secret;
    if(!user) return res.status(404).send('user not found');

    if(user && bcrypt.compareSync(password, user.passwordHash)){
        const token = jwt.sign(
            {
                userId : user.id,
                isAdmin : user.isAdmin
            },
            secret,    {expiresIn : '1d'}

        )
      return  res.status(200).send({user:user.email, token: token});
    }
    else{
        res.status(400).send('wrong password');
    }
   })

//usse to count number of users in user collection.
//this is used for statistics purpose in admin or user dashboard
router.get('/get/count', async (req, res)=>{
    const userCount = await User.countDocuments()

    if(!userCount) return res.status(500).json({success : false})

    res.status(200).send({ userCount : userCount  });

})






module.exports = router















