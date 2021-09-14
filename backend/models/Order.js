
const mongoose = require('mongoose');


// product model
const orderSchema = mongoose.Schema({
  
      orderItems:[{
        type : mongoose.Schema.Types.ObjectId,
       // ref : 'Products',
        ref : 'OrderItems',
      }],
      shippingAddress1 : {
        type : String,
        require : true,
    },
      shippingAddress2 : {
        type : String,        
    },
      city : {
        type : String,
        require : true
    },
      zip : {
        type : String,
        require : true,
    },
      country : {
        type : String,
        require : true,
    },
      phone : {
        type : String,
        require : true,
    },
      status : {
        type : String,
        require : true,
        default : 'Pending',
    },
      totalprice : {
        type : Number ,
    },
      user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require : true,
    },
      dateOrdered : {
        type : Date,
        default : Date.now,
    },

  })

  orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals : true,
});

 exports.Order = mongoose.model('Order', orderSchema)











