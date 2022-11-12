const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

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

/*import path from "path";
import fs from 'fs';
describe("POST /api/images/saveimg/", () => {
    
  it("Debería guardar imagen en GCS", async () => {
    const jpegImage = fs.readFileSync(path.resolve(__dirname, '/resources/images/test.jpg'));

    const res = await request(app).post("/api/images/saveimg/").send({
      file: jpegImage
    });

    expect(res.statusCode).toBe(200);
  });
});*/
var prueba = Math.random() * (99 - 11);
describe("POST /api/images/savedbimg/", () => {
    
  it("Debería guardar información de imagen en db", async () => {
    const login = await request(app).post("/api/auth/").send({
      email:"tester@gmail.com",
      password:"123456"
    })
    var randname = prueba.toString();
    const res = await request(app).post("/api/images/savedbimg/").set('x-token',login.body.token).send({
      tourname:"Testing"+randname,
      filename: "image"+randname,
      description: "this is a description",
      latitude: -13.174471599999999,
      longitude: -72.5425042,
      fileUrl: "https://storage.googleapis.com/holotourismbucket/image1.jpg"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.ok).toBe(true);
  });
});



