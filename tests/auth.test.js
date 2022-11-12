const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const { deleteOne } = require("../models/User");

require("dotenv").config();

beforeAll(async () => {
  await mongoose.connection.close();
})

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DB_CNN_TEST);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

//   const characters ='abcdefghijklmnopqrstuvwxyz';
//   const email03 = "bkbuip";

//   function generateString(length) {
//       let result = ' ';
//       const charactersLength = characters.length;
//       for ( let i = 0; i < length; i++ ) {
//           result += characters.charAt(Math.floor(Math.random() * charactersLength));
//       }
  
//       return result;
//   }
var prueba = Math.random() * (99 - 11);

describe("POST /api/auth/new", () => {
    
  it("debería registra usuario", async () => {
    var emailRand = prueba.toString();
    const res = await request(app).post("/api/auth/new").send({
      name: emailRand,
      email: emailRand+"@gmail.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(emailRand);
  });
});

describe("POST /api/auth/", () => {
  it("debería Logear usuario", async () => {
    var emailRand = prueba.toString();
    const res = await request(app).post("/api/auth/").send({
      email: emailRand+"@gmail.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(emailRand);
  });
});