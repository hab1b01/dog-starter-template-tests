
import { describe, test, expect, vi } from "vitest";

// Mock the service
vi.mock("../services/dogService", () => ({
  getRandomDogImage: vi.fn(),
}));

import { getDogImage } from "../controllers/dogController";
import { getRandomDogImage } from "../services/dogService";

describe("dogController", () => {

  test("should return success true and mocked dog image JSON", async () => {

    const mockedServiceResponse = {
      imageUrl: "https://images.dog.ceo/test.jpg",
      status: "success"
    };

    (getRandomDogImage as any).mockResolvedValue(mockedServiceResponse);

    const jsonMock = vi.fn();
    const statusMock = vi.fn().mockReturnValue({ json: jsonMock });

    const res = { status: statusMock, json: jsonMock } as any;
    const req = {} as any;

    await getDogImage(req, res);

    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      data: mockedServiceResponse
    });

  });

});
