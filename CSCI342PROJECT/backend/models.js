const mongoose = require("mongoose");
require("dotenv").config();
conenctToDB().then((err) => {
    err ? console.log("an error message " + err + " Could not connect to MongoDB") : console.log("Connected to mongo db");
  })


async function conenctToDB(){
    await mongoose.connect(process.env.DATABASE_URL);
}

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        unique: true,
        require: true
      },
    password: {
        type: String,
        require: true
      },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    addresses: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Address'
    }]
});

const User = mongoose.model("User", userSchema);

const addressSchema = new mongoose.Schema({ 
    _id: mongoose.Schema.Types.ObjectId,
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    streetAddress: {
        type: String,
        require: true
    },
    zipCode: {
        type: Number,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    primary: {
        type: Boolean,
        require: true
    },
    billing: {
        type: Boolean,
        require: true
    }
});
const Address = mongoose.model("Address", addressSchema);

const cartSchema = new mongoose.Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

const Cart = mongoose.model("Cart", cartSchema);


const productSchema = new mongoose.Schema({ 
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    description: String,
    category: {
        type: String,
        require: true
    },
    images: [{
        data: Buffer,
        type: String
    }],
    price: {
        type: Number,
        require: true
    },
    inventory: {
        type: Number,
        require: true
    }
})
const Product = mongoose.model("Product", productSchema);


const orderSchema = new mongoose.Schema({ 
    _id: mongoose.Schema.Types.ObjectId,
    orderNumber: {
        type: Number,
        require: true, 
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        require: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    }],
    note: String,

})
const Order = mongoose.model("Order", orderSchema);


module.exports = {
    User, 
    Address, 
    Cart, 
    Product, 
    Order
};