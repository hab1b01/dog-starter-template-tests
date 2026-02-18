
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

  // Test Case 4 (positive)
  test("should return 200, success true, and mocked imageUrl", async () => {
    const mockedJson = {
      success: true,
      data: {
        imageUrl: "https://images.dog.ceo/breeds/test.jpg",
        status: "success",
      },
    };
    (getDogImage as any).mockImplementation((_req: any, res: any) =>
      res.status(200).json(mockedJson)
    );
const app = express();
    app.use("/api/dogs", dogRoutes);

    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toContain("test.jpg");

  });


  // Test Case 5 (negative)
  test("should return 500 and error when controller fails", async () => {

    const mockedErrorJson = {
      success: false,
      error: "Failed to fetch dog image: Network error",
    };

    (getDogImage as any).mockImplementation((_req: any, res: any) =>
      res.status(500).json(mockedErrorJson)
    );

    const app = express();
    app.use("/api/dogs", dogRoutes);

    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Failed to fetch dog image: Network error");

  });

});
