
const {Order} = require('../models/Order');
const {OrderItem} = require('../models/Order-Item')

const express= require('express');
const router = express.Router();

//get multiple orders
//sortordersby date. sort('dateOrdered') or reversed as in below
router.get( '/', async(req, res) => {
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});
    
    if(!orderList){
        res.status(500).json({success : failed});
    }
    res.status(200).send(orderList);
});

//get single orders
router.get( '/:id', async(req, res) => {
    const order = await Order.findById(req.params.id)
    .populate('user', 'name')

    //not working check later chapter 6  video 62
   // .populate('Products')
    //.populate({path : 'OrderItems', populate:'product'});
    
    if(!order){
        res.status(500).json({success : failed});
    }
    res.status(200).send(order);
});

//post orders
router.post('/', async(req, res) => {
    
    const orderItemIds = Promise.all(req.body.orderItems.map( async orderItem=>{
        let newOrderItem = new OrderItem({
            quantity : orderItem.quantity,
            product : orderItem.product,
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id ;
    }))
    const orderItemsIdsResolved = await orderItemIds
    console.log(orderItemsIdsResolved)

    let order = new Order({
        orderItems : orderItemsIdsResolved,
        shippingAddress1 : req.body.shippingAddress1,
        shippingAddress2 : req.body.shippingAddress2,
        city : req.body.city,
        zip : req.body.zip,
        country : req.body.country,
        phone : req.body.phone,
        status: req.body.status,
        totalPrice : req.body.totalPrice,
        user : req.body.user,
    })
   order = await order.save();

    if(!order) return res.status(500).send('order cannot be created')
    res.status(200).send(order)
});

//update the status by the admin

router.put('/:id', async (req, res) => {

    const order = await Order.findByIdAndUpdate(
        req.params.id, {status : req.body.status}, {new : true}
    )
   
    if(!order) return res.status(400).send('error updating status');
    res.status(200).json({
        message : 'successfully update',
        status: order})
})

//delete the status by the admin

router.delete('/:id' , async(req, res) => {
    const order = await Order.findOneAndRemove(req.params.id);
    
    //continue from chapter 6 video 7 solution
    // if(order){
    //     order.orderItems.map(orderItem => {

    //     })
    // }

    if(!order) return res.status(400).send('error deleting order ');
    res.status(200).json({
        message : 'successfully deleted'})

})

module.exports = router;








