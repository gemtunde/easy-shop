
const {Category} = require('../models/Category');

const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {

    const categoryList = await Category.find();

    if(!categoryList){
        res.status(404).json({ success : failed   })
    }
    res.status(200).send(categoryList)
})

router.get('/:id', (req,res)=> {
    Category.findById(req.params.id)
    .then(category=>{
        if(category){
            return res.status(200).send(category)
        }
        else{
            return res.status(404).json({
                success:false,
                message: 'category not found'
            })
        }
    })
    .catch(err=>{
        return res.status(400).json({
            success:false,
            error : err,
            message:'internal server error'
        })
    })
})

router.put('/:id', async (req,res)=> {
   // const {id} = req.params.id;  not working
    const {name , color, icon} = req.body;

    const category = await Category.findByIdAndUpdate(
        req.params.id, { name, color, icon}, {new : true}   );
    
    if(!category) return res.status(404).send('the category not found')
    
    res.status(200).send(category);

})

router.post('/', async (req, res) => {

    const {name, icon, color} = req.body
    let category =  Category({
        name, icon, color
    });

    category = await category.save();

    if(!category) return res.status(400).send('category list is empty');

    res.status(200).send(category);

})

router.delete('/:id', (req, res) => {
   // const {id} = req.params.id ;
    Category.findByIdAndRemove(req.params.id)
    .then(category => {
        if(category){
            return res.status(200).json({
                success : true,
                message : 'Category deleted sucessfully'
            })
        }else{
            return res.status(404).json({
                success: false,
                message : 'category not found'
            })
        }
    })
    .catch(err =>{
        return res.status(400).json({
            success : false,
            error : err,
            message : 'internal server error'
        })
    })
})

module.exports = router












