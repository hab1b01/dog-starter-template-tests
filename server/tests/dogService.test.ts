

import { describe, test, expect, vi } from "vitest";
import { getRandomDogImage } from "../services/dogService";

describe("dogService", () => {
test("should return imageUrl and success status when API call succeeds", async () => { // Arrange: create mocked API response
const mockedApiData = {
    message: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
    status: "success"
};

// Mock fetch function
const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue(mockedApiData)
});

// Replace global fetch with mock
vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

// Act: call the service
const result = await getRandomDogImage();

// Assert: check result values
expect(result.imageUrl).toBe(mockedApiData.message);
expect(result.status).toBe("success");

// Assert: fetch called once
expect(fetchMock).toHaveBeenCalledOnce();


});

});
