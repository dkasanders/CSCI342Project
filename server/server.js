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
        //TODO make this talk to the CRUD api instead
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
            res.status(201).json({message: "User created successfully", user: { ...user._doc, password: undefined }});
      });
    } catch (err) {
      return res.status(500).json({ message: err.message || "Error while signup" });
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
                  return res.status(500).json({ message: "Error comparing password" });
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
            return res.status(500).json({ message: "Error finding user" });
        }
    });

    app.route("/user")
      //GET
      .get(async (req, res) => {
        if (!req.body) {
          return res.status(404).send({
            message: "No ID found"
          });
        }
        const {_id} = req.body
        try {
          const user = await Models.User.findById(_id);
          res.send(user);
        }
        catch (error){
          response.status(500).send({ error });
        }
      })
      //PUT
      .put(async (req, res) => {
        if (!req.body) {
          return res.status(400).send({
            message: "Data to update can not be empty!"
          });
        }
        const {_id} = req.body
        Models.User.findByIdAndUpdate(_id, req.body)
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update User with id=${id}.`
              });
            }
            else {
              res.status(201).json({message: "User updated successfully", data})
            }
          }
        )
      });

  app.get("/user/address/:userid", async (req, res) => {
    const _id = req.params.userid;
    try {
      Models.Address.find({user: _id})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot find addresses for User with id=${id}.`
          })
        }
        else {
          res.send(data)
        }
      })
    }
    catch (error){
      response.status(500).send({ message: error.message });
    }
  });

  app.get("/user/orders", async (req, res) => {
    const _id = req.params.userid;
    try {
      Models.Order.find({user: _id})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot find orders for User with id=${id}.`
          })
        }
        else {
          res.send(data)
        }
      })

    }
    catch (error){
      response.status(500).send({ message: error.message });
    }
  });

  //--------------------PRODUCT API -----------------
  app.get("/product/all", async (req, res) => {
    try {
      const products = await Models.Product.find({});
      res.send(products);
    }
    catch (error){
      response.status(500).send({ message: error.message });
    }
  });

  app.get ("/product/catagory/:category", async (req, res) => {
    const category = req.params.category;
    try {
      const products = await Models.Product.find( {categories: {$elemMatch: {category: category}}});
      res.send(products);
    }
    catch (error){
      res.status(500).send({ message: error.message });
    }
  });
  
  app.route("/product")
    .get(async (req, res) => {
      // check if the id exists in the models file
      // return the product or send an error
      
      if (!req.body) {
        return res.status(404).send({
          message: "No ID found"
        });
      }
      const {_id} = req.body
      try {
        const product = await Models.Product.findById(_id);
        res.send(product);
      }
      catch (error){
        response.status(500).send({ message: error.message });
      }
    })
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
          res.status(201).json({message: "Product created successfully", product: { ...product._doc}});
      } catch (err) {
        return res.status(500).json({ message: err.message || "Error while creating product" });
      }
    })
    .put(async (req, res) => {
      // find one product and update
      // return created response with the updated object or an error
      if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const {_id} = req.body
      Models.Product.findByIdAndUpdate(_id,  req.body)
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Product with id=${id}.`
            });
          }
          else {
            res.status(201).json({message: "Product updated successfully", data})
          }
        }
        )
    })


//--------------------ADDRESS API------------------
app.route("/address")
    .get(async (req, res) => {
      if (!req.body) {
        return res.status(404).send({
          message: "No ID found"
        });
      }
      const {_id} = req.body
      try {
        const address = await Models.Address.findById(_id);
        res.send(address);
      }
      catch (error){
        response.status(500).send({ message: error.message });
      }
    })
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
          res.status(201).json({message: "Address created successfully", address: { ...address._doc}});
      } catch (err) {
        return res.status(500).json({ message: err.message || "Error while creating product" });
      }
    })
    .put(async (req, res) => {
      if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const {_id} = req.body
      Models.Address.findByIdAndUpdate(_id, req.body)
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Address with id=${id}.`
            });
          }
          else {
            res.status(201).json({message: "Address updated successfully", data})
          }
        }
      )
    })




//------------------Cart API------------------

app.route("/cart")
    .get(async (req, res) => {
      if (!req.body) {
        return res.status(404).send({
          message: "No ID found"
        });
      }
      const {user} = req.body;
      try {
        const cart = await Models.Cart.findOne({user: user});
        res.send(cart);
      }
      catch (error){
        response.status(500).send({ message: error.message });
      }
    })
    .post(async (req, res) => {
      const {user} = req.body;
      if (!user) {
        return res.status(400).json({ message: "user Id required" });
      }
      try {
        const usercheck = await Models.User.findOne({ _id: user});
        if (!usercheck) {
          res.status(404).send({
            message: "No User found"
          });
        }
      }
      catch (error) {
        response.status(500).send({ message: error.message });
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
        return res.status(500).json({ message: err.message || "Error while creating product" });
      }
    })
    .put(async (req, res) => {
      if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const {_id} = req.body
      Models.Cart.findByIdAndUpdate(_id,  req.body)
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Cart with id=${id}.`
            });
          }
          else {
            res.status(201).json({message: "Cart updated successfully", data})
          }
        }
      )
    });

    app.put("/cart/newproduct", async (req, res) => {
      const {user, product, quantity} = req.body;
      if (!user|| !product || !quantity) {
        return res.status(400).json({ message: "user ID, product ID, and quantity required" });
      }
      try {
        const usercheck = await Models.User.findOne({ _id: user});
        if (!usercheck) {
          res.status(404).send({
            message: "No User found"
          });
        }
        const productcheck = await Models.Product.findOne({ _id: product});
        if (!productcheck) {
          res.status(404).send({
            message: "No product found"
          });
        }
        const cart = await Models.Cart.findOne({user: user});

        const newproduct = {product: product, quantity: quantity};
        cart.products.push(newproduct);
        cart.save();
        res.status(201).send({message: "Cart updated successfully"})
      }
      catch (error) {
        response.status(500).send({ message: error.message });
      }
    });


  //-------------------ORDER API------------------------------

    app.route("/order")
    .get(async (req, res) => {
      if (!req.body) {
        return res.status(404).send({
          message: "No ID found"
        });
      }
      const {_id} = req.body;
      try {
        const order = await Models.Order.findOne({_id: _id});
        res.send(order);
      }
      catch (error){
        response.status(500).send({ message: error.message });
      }
    })
    .post(async (req, res) => {
      const {orderNumber, user, address, products} = req.body;
      try {
        const usercheck = await Models.User.findOne({ _id: user});
        if (!usercheck) {
          res.status(404).send({
            message: "No User found"
          });
        }
        const addresscheck = await Models.Address.findOne({ _id: address});
        if (!addresscheck) {
          res.status(404).send({
            message: "Address not found"
          });
        }
      }
      catch (error) {
        response.status(500).send({ message: error.message});
      }
      const _id = new mongoose.Types.ObjectId();
      try {
        const order = new Models.Order({
          _id,
          orderNumber,
          user,
          address,
          products
        });
        order.save();
        res.status(201).json({message: "Order submitted successfully", order: { ...order._doc}});
    } catch (err) {
      return res.status(500).json({ message: err.message || "Error while creating Order" });
    }

    })
    .put(async (req, res) => {
      if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const {_id} = req.body
      Models.Order.findByIdAndUpdate(_id, req.body)
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Order with id=${_id}.`
            });
          }
          else {
            res.status(201).json({message: "Order updated successfully", data})
          }
        }
      )
    })


  // ---------------------PATHS-------------------------------
  app.get("/", (req, res) => {
    res.send("Root Path");
  
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));