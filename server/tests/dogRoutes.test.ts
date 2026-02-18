
import { describe, test, expect, vi } from "vitest";
import request from "supertest";
import express from "express";

// Mock controller
vi.mock("../controllers/dogController", () => ({
  getDogImage: vi.fn(),
}));

import dogRoutes from "../routes/dogRoutes";
import { getDogImage } from "../controllers/dogController";

describe("dogRoutes", () => {

  test("should return 200, success true, and mocked imageUrl", async () => {

    // Arrange: mocked JSON response
    const mockedJson = {
      success: true,
      data: {
        imageUrl: "https://images.dog.ceo/breeds/test.jpg",
        status: "success"
      }
    };

    // Mock controller implementation
    (getDogImage as any).mockImplementation((_req: any, res: any) => {
      return res.status(200).json(mockedJson);
    });

    // Create test app
    const app = express();
    app.use("/api/dogs", dogRoutes);

    // Act: make GET request
    const response = await request(app).get("/api/dogs/random");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toContain("test.jpg");

  });

});
