import request from "supertest";
import {app} from "../../app"; // Your Express app instance
import authService from "../authService"; // Your service file
import bcrypt from "bcrypt";
import pool from "../../config/db"; // Your PostgreSQL connection pool

jest.mock("../../config/db"); // Mock the database
jest.mock("bcrypt"); // Mock bcrypt

describe("POST /signup", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if email or password is missing", async () => {
    const response = await request(app).post("/signup").send({ email: "" });
    expect(response.status).toBe(400);
  });
  
});
