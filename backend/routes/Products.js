

const express = require('express');
const { Category } = require('../models/Category');
const router = express.Router();
const {Product} = require('../models/Products');

//get all product list
 //populate is usd to bring data of the connected table(collection - i.e category) into this product table
  //using Select after the find() helps to select items to be display
//or send back to frontend
router.get('/', (req, res)=>{
    //use this method ...dont forget to place async b4 req
  // const productList = await Product.find()
  //if(!productList){res.status(500).json({success:failed})}
     // res.send(productList);
     //or 
     Product.find().select('name description -_id ').populate('category')
     .then((data)=>res.status(200).json(data))
     .catch((err)=>{
         res.status(500).json({
             error:err,
             success:false
         })
     })

    } );


    //get a single product 
    //populate is usd to bring data of the connected table(collection - i.e category) into this product table
    router.get('/:id', async(req, res)=> {
        const product = await Product.findById(req.params.id).populate('category');
       
        if(!product) return res.status(400).json({success:false, message:'product not found'});
        res.status(200).send(product);
        console.log(product);
    })

    //post data
router.post('/', async (req, res)=>{

    console.log(req.body);
    let category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('invalid category');

const {name, description, richDescription, image,
    brand,price,  countInStock, rating, numReviews, isFeatured} = req.body;

    let product = new Product({
    name, description, richDescription, image,
    brand,price, category, countInStock, rating, numReviews, isFeatured
});

  product = await product.save();

  if(!product) return res.status(500).json({success:false, message:'error sending products'})
  res.status(200).send(product)
  console.log(product)

})


//update product data
router.put('/:id', async(req, res) => {
    
    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send('invalid category')

    const {name, description, richDescription, image,
        brand,price, countInStock, rating, numReviews, isFeatured} = req.body;
    let product = await Product.findByIdAndUpdate(
        req.params.id,{
            name, description, richDescription, image,
             brand,price, category, countInStock, rating, numReviews, isFeatured, },
             {new : true}
             );

    product = product.save();
    if(!product) return res.status(400).json({success:false, message:'error updating product'})
     res.status(200).send(product);
});

//delete a product 

router.delete('/:id', async(req, res) => {
   let product = await Product.findByIdAndRemove(req.params.id)

   if(!product) return res.status(404).send('product not found')

   res.status(200).json({
       success:true,
       message:'product deleted successfully'
   })
});


//usse to count number of product in product collection.
//this is used for statistics purpose in admin or user dashboard
router.get('/get/count', async (req, res)=>{
    const productCount = await Product.countDocuments()

    if(!productCount) return res.status(500).json({success : false})

    res.status(200).send({ productCount : productCount  });

})

// get product by finding if it exist through its values.... not fiished yet chapter 4 video 13
router.get('/get/featured', async (req, res)=>{
    const product = await Product.find({isFeatured : true})

    if(!product) return res.status(500).json({success : false})

    res.status(200).send(product);

})
 module.exports = router













