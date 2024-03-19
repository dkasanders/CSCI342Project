const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../server")
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
  });
  
/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});


describe("GET /user/:_id", () => {
    it("should return a user", async () => {
      const res = await request(app).get("/user/65f3b38fb294e9b3348c358c");
      expect(res.statusCode).toBe(200);
      expect(res.body.firstName).toBe("thomas");
    });
  });


describe("Test user signup login and delete", () => {
    it("should create a user", async () => {
        const user = await request(app).post("/signup").send({
            firstName: "Alex",
            lastName: "Socha",
            email : "tester@tester.com",
            phoneNumber : "0123456789",
            password : "testtest",
            confirmPassword : "testtest"
        });
        expect(user.statusCode).toBe(201);
        expect(user.body.user.firstName).toBe("Alex");

        const login = await request(app).post("/login").send({
            email : "tester@tester.com",
            password : "testtest"
        });

        expect(login.statusCode).toBe(200);
        expect(login.body.user.firstName).toBe("Alex");

        const del = await request(app).delete("/user/").send({
              _id : login.body.user._id
          });
        expect(del.statusCode).toBe(200);

        const res = await request(app).get("/user/" + login.body.user._id);
        expect(res.statusCode).toBe(401);
    });

    
  });


describe("PUT /user/:_id", () => {
    it("should update a user", async () => {
      const res = await request(app)
        .put("/user")
        .send({
          _id: "65f3b38fb294e9b3348c358c",
          firstName: "thomas",
          lastName: "wyndham"
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.user.firstName).toBe("thomas");
    });
  });
  
describe("GET /product/:_id", () => {
    it("should return a product", async () => {
      const res = await request(app).get("/product/65f4c8ece713a976c00595b7");
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Katalox Blank");
    });
  });
describe("GET /product/all", () => {
    it("should get all products", async () => {
        const res = await request(app).get("/product/all");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("GET /product/byname/:name", () => {
    it("should get all products", async () => {
        const res = await request(app).get("/product/byname/Katalox%20Blank");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("GET /product/category/:category", () => {
    it("should get all products", async () => {
        const res = await request(app).get("/product/category/Hard");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("POST, PUT, DELETE /product", () => {
    it("should create a product", async () => {
        const res = await request(app).post("/product").send({
            name: "Purple Heart", 
            description: "A distinct Purple wood, Caused by the oxidization of iron in the wood. Dimensions 12 x 12 x 2", 
            categories: [{"category": "Purple"}, {"category": "Heart"}, {"category": "Soft"}], 
            images: [], 
            price : "50",
            inventory : "5"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.product.name).toBe("Purple Heart");

        const update = await request(app).put("/product").send({
            _id: res.body.product._id, 
            name: "Purple Heart", 
            description: "changed", 
            categories: [{"category": "Purple"}, {"category": "Heart"}, {"category": "Soft"}], 
            images: [], 
            price : "50",
            inventory : "5"
        });
        expect(update.statusCode).toBe(200);
        expect(update.body.product.description).toBe("changed");

        const del = await request(app).delete("/product").send({
            _id: res.body.product._id
        })
        expect(del.statusCode).toBe(200);

    });
});

  