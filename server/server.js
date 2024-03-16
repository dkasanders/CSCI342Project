require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");

const Models = require("./models.js")

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());

// -----------------------USER API-----------------------------------
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, phoneNumber} = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Attempt to find an existing user in the database with the provided email.
    const user = await Models.User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Proceed to hash the provided password using bcrypt with 10 salt rounds.
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }
      const _id = new mongoose.Types.ObjectId();
      const user = new Models.User({
        _id,
        firstName, 
        lastName,   
        phoneNumber,  
        email,
        password: hashedPassword,
      });

      // Save the new user instance to the database.
      user.save();
      res.status(201).json({message: "User created successfully", user: user});
    });
  } catch (err) {
    return res.status(500);
  }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all required fields" });
    }

    try {
          const user = await Models.User.findOne({ email: email });
          if (!user) {
            return res.status(401).json({ message: "User does not exist" });
          }
          // Use bcrypt to compare the provided password with the hashed password stored in the database.
          bcrypt.compare(password, user.password, (err, isMatch) => {
          // If an error occurs during the comparison, return a 500 Internal Server Error status.
          if (err) {
              return res.status(500);
          }

          // If the passwords do not match, return a 401 Unauthorized status to indicate invalid credentials.
          if (!isMatch) {
              return res.status(401).json({ message: "Invalid credentials" });
          }

          // If the passwords match, generate a JWT token using the user's email as the payload.
          // Set the token to expire in 1 hour.
          const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, {
              expiresIn: "1h",
          });

          // Return a 200 OK status with a success message, the generated token, and the user object.
          // This indicates a successful login.
          res.status(200).json({ message: "Login successful", token, user: user });
        });
    } catch (err) {
        // If an error occurs while finding the user, return a 500 Internal Server Error status.
        // This helps to handle unexpected errors that may occur during the database query operation.
        return res.status(500);
    }
});

app.get("/user/:_id", async (req, res) => {
  
  const _id = req.params._id;
  try {
    const user = await Models.User.findById(_id);
    if (!user) {
      res.status(401).json({message: "no user found"});
    }
    res.status(200).json(user);
  }
  catch (error){
    return res.status(500);
  }
});

app.route("/user")
  //PUT
  .put(async (req, res) => {
    try{
      const _id = req.body
      if (!_id) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      
      const data = await Models.User.findByIdAndUpdate(_id, req.body)
      if (!data) {
        res.status(404).json({
          message: `Cannot update User with id=${_id}.`
        });
      }
      const updated = await Models.User.findById(_id);
      return res.status(200).json({message: "User updated successfully", user: data});  
    }
    catch (error) {
      res.status(500);
    }
        
  })
  .delete(async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message: "Data to remove can not be empty!"
      });
    }
    const {_id} = req.body
    try {
      await Models.User.findByIdAndDelete(_id);
      //Cascade
  
      await Models.Cart.deleteOne({user: _id});
      await Models.Address.deleteMany({user: _id});
      //Return complete status
      res.status(200).json({message: "User deleted successfully"})
    }
    catch (error) {
      res.status(500);
    }
      
  });

app.get("/user/address/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    const user = await Models.Address.find({user: _id})
    if (!data) {
      res.status(404).json({
        message: `Cannot find addresses for User with id=${id}.`
      })
    }
    else {
      res.status(200).json(data)
    }
  }
  catch (error){
    res.status(500);
  }
});

app.get("/user/orders/:_id", async (req, res) => {
  const _id = req.params.userid;
  try {
    const orders = Models.Order.find({user: _id})
    
    if (!orders) {
      res.status(401).json({
        message: `Cannot find orders for User with id=${id}.`
      })
    }
    else {
      res.status(200).json(data)
    }
  }
  catch (error){
    res.status(500);
  }
});

  //--------------------PRODUCT API -----------------
app.get("/product/all", async (req, res) => {
  try {
    const products = await Models.Product.find({});
    if (!products) {
      res.status(401).json({message: "no products found"});
    }
    res.status(200).json(products);
  }
  catch (error){
    res.status(500);
  }
});

app.get ("/product/category/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const products = await Models.Product.find( {categories: {$elemMatch: {category: category}}});
    if (!products) {
      res.status(401).json({message: "no products found"});
    }
    res.status(200).json(products);
  }
  catch (error){
    res.status(500);
  }
});

app.get("/product/byname/:name", async (req, res) => {
  try {
    const name = req.params.name;
    if (!name) {
      res.status(400).json({ message: "no name provided"});
    }
    const products = await Models.Product.find({name: name});
    if (!products) {
      res.status(401).json({message: "no products found"});
    }
    return res.status(200).json(products);
  }
  catch (error){
    return res.status(500);
  }
});

app.get("/product/:_id", async (req, res) => {
  // check if the id exists in the models file
  // return the product or send an error
  const _id = req.params._id;
  if (!_id) {
    return res.status(404).json({
      message: "No ID found"
    });
  }
  try {
    const product = await Models.Product.findById(_id);
    if (!product) {
      res.status(401).json({message: "no product found"});
    }
    res.status(200).json(product);
  }
  catch (error){
    res.status(500);
  }
})

app.route("/product")
  .post(async (req, res) => {
    // validate all of the necessary fields
    // return created response with the new object or an error
    const {name, description, categories, images, price, inventory} = req.body;
    if (!name || !description || !categories || !price || !inventory ) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const _id = new mongoose.Types.ObjectId();
    try {
        const product = new Models.Product({
          _id,
          name, 
          description,
          categories,   
          images,  
          price,
          inventory,
        });
        product.save();
        res.status(201).json({message: "Product created successfully", product: product});
    } catch (err) {
      return res.status(500);
    }
  })
  .put(async (req, res) => {
    // find one product and update
    // return created response with the updated object or an error
    try{
      if (!req.body) {
        return res.status(400).json({
          message: "Data to update can not be empty!"
        });
      }
      const {_id} = req.body
      const data = await Models.Product.findByIdAndUpdate(_id, req.body)
      if (!data) {
        res.status(404).json({
          message: `Cannot update Product with id=${_id}.`
        });
      }

      const updated = await Models.Product.findById(_id);
      return res.status(200).json({message: "Product updated successfully", product: updated});  
    }
    catch (error) {
      res.status(500);
    }
  })
  .delete(async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message: "Data to remove can not be empty!"
      });
    }
    const {_id} = req.body
    try {
      Models.Product.findByIdAndDelete(_id);
      //Return complete status
      res.status(200).json({message: "Product deleted successfully"})
    }
    catch (error) {
      res.status(500);
    }
  });


//--------------------ADDRESS API------------------
app.get("/address/:_id", async (req, res) => {
  
  const _id = req.params._id;
  if (!_id) {
    return res.status(404).json({
      message: "No ID found"
    });
  }
  try {
    const address = await Models.Address.findById(_id);
    if (!address) {
      res.status(401).json({message: "no address found"});
    }
    res.status(200).json(address);
  }
  catch (error){
    res.status(500);
  }
})


app.route("/address")
  .post(async (req, res) => {
    const {user, streetAddress, zipCode, state, primary, billing} = req.body;
    if (!user || !streetAddress || !zipCode || !state || !primary || !billing) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const _id = new mongoose.Types.ObjectId();
    try {
        const address = new Models.Address({
          _id,
          user, 
          streetAddress,   
          zipCode,  
          state,
          primary,
          billing
        });
        address.save();
        const updated = await Models.Address.findById(_id);
        res.status(201).json({message: "Address created successfully", address: updated});
    } catch (err) {
      return res.status(500);
    }
  })
  .put(async (req, res) => {
    try{
      if (!req.body) {
        return res.status(400).json({
          message: "Data to update can not be empty!"
        });
      }
      const {_id} = req.body
      const data = await Models.Address.findByIdAndUpdate(_id, req.body)
      if (!data) {
        res.status(404).json({
          message: `Cannot update Address with id=${_id}.`
        });
      }
      const updated = await Models.Address.findById(_id);
      return res.status(200).json({message: "Address updated successfully", data});  
    }
    catch (error) {
      res.status(500);
    }
  })
  .delete(async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message: "Data to remove can not be empty!"
      });
    }
    const {_id} = req.body
    try {
      Models.Address.findByIdAndDelete(_id);
      //Return complete status
      res.status(200).json({message: "Address deleted successfully"})
    }
    catch (error) {
      res.status(500);
    }
  });




//------------------Cart API------------------

app.get("/cart/:userid", async (req, res) => {
  const user = req.params.userid;
  if (!user) {
    return res.status(404).json({
      message: "No ID found"
    });
  }
  try {
    const cart = await Models.Cart.findOne({user: user});
    if (!cart) {
      res.status(401).json({message: "no cart found"});
    }
    res.status(200).json(cart);
  }
  catch (error){
    res.status(500);
  }
  })

app.route("/cart")
  .post(async (req, res) => {
    const {user} = req.body;
    if (!user) {
      return res.status(400).json({ message: "user Id required" });
    }
    try {
      const usercheck = await Models.User.findOne({ _id: user});
      if (!usercheck) {
        res.status(404).json({
          message: "No User found"
        });
      }
    }
    catch (error) {
      res.status(500);
    }
    const _id = new mongoose.Types.ObjectId();
    try {
        const cart = new Models.Cart({
          _id,
          user, 
          products: []
        });
        cart.save();
        res.status(201).json({message: "Cart created successfully", cart: { ...cart._doc}});
    } catch (err) {
      return res.status(500);
    }
  })
  .put(async (req, res) => {
    try{
      if (!req.body) {
        return res.status(400).json({
          message: "Data to update can not be empty!"
        });
      }
      const {_id} = req.body
      const data = await Models.Cart.findByIdAndUpdate(_id, req.body)
      if (!data) {
        res.status(404).json({
          message: `Cannot update Cart with id=${_id}.`
        });
      }
      const updated = await Models.Cart.findById(_id);
      return res.status(200).json({message: "Cart updated successfully", cart: updated});  
    }
    catch (error) {
      res.status(500);
    }
  })
  .delete(async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message: "Data to remove can not be empty!"
      });
    }
    const {_id} = req.body
    try {
      Models.Cart.findByIdAndDelete(_id);
      //Return complete status
      res.status(201).json({message: "Cart deleted successfully"})
    }
    catch (error) {
      res.status(500);
    }
  });

app.put("/cart/newproduct", async (req, res) => {
  const {user, product, quantity} = req.body;
  if (!user|| !product || !quantity) {
    return res.status(400).json({ message: "user ID, product ID, and quantity required" });
  }
  try {
    const usercheck = await Models.User.findOne({ _id: user});
    if (!usercheck) {
      res.status(404).json({
        message: "No User found"
      });
    }
    const productcheck = await Models.Product.findOne({ _id: product});
    if (!productcheck) {
      res.status(404).json({
        message: "No product found"
      });
      
    }
    const cart = await Models.Cart.findOne({user: user});
    if (!cart) {
      res.status(401).json({message: "no cart found"});
    }
    const name = productcheck.name;
    const newproduct = {product: product, name: name, quantity: quantity};
    cart.products.push(newproduct);
    cart.save();
    res.status(200).json({message: "Cart updated successfully"})
  }
  catch (error) {
    res.status(500);
  }
});


  //-------------------ORDER API------------------------------

app.get("/order/:_id", async (req, res) => {
  const {_id} = req.params._id;
  if (!_id) {
    return res.status(404).json({
      message: "No ID found"
    });
  }
  try {
    const order = await Models.Order.findOne({_id: _id});
    if (!order) {
      res.status(401).json({message: "no order found"});
    }
    res.status(200).json(order);
  }
  catch (error){
    res.status(500);
  }
})

app.route("/order")
  .post(async (req, res) => {
    const {orderNumber, user, address, products, note} = req.body;
    try {
      const usercheck = await Models.User.findOne({ _id: user});
      if (!usercheck) {
        res.status(404).json({
          message: "No User found"
        });
      }
      const addresscheck = await Models.Address.findOne({ _id: address});
      if (!addresscheck) {
        res.status(404).json({
          message: "Address not found"
        });
      }
    }
    catch (error) {
      res.status(500);
    }
    const _id = new mongoose.Types.ObjectId();
    try {
      const order = new Models.Order({
        _id,
        orderNumber,
        user,
        address,
        products,
        note
      });
      order.save();
      res.status(201).json({message: "Order submitted successfully", order: { ...order._doc}});
  } catch (err) {
    return res.status(500);
  }

  })
  .put(async (req, res) => {
    try{
      if (!req.body) {
        return res.status(400).json({
          message: "Data to update can not be empty!"
        });
      }
      const {_id} = req.body
      const data = await Models.Order.findByIdAndUpdate(_id, req.body)
      if (!data) {
        res.status(404).json({
          message: `Cannot update Order with id=${_id}.`
        });
      }
      const updated = await Models.Order.findById(_id);
      return res.status(200).json({message: "Order updated successfully", order: updated});  
    }
    catch (error) {
      res.status(500);
    }
  })
  .delete(async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message: "Data to remove can not be empty!"
      });
    }
    const {_id} = req.body
    try {
      Models.Order.findByIdAndDelete(_id);
      //Return complete status
      res.status(200).json({message: "Order deleted successfully"})
    }
    catch (error) {
      res.status(500);
    }
  });


// ---------------------PATHS-------------------------------
app.get("/", (req, res) => {
  res.send("Root Path");

});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
