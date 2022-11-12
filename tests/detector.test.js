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

describe("POST /api/detector/", () => {
    
  it("Debería enviar la imagen al visionapi", async () => {
    const res = await request(app).post("/api/detector").send({
        fileName: "image1.jpg"
    })
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
