import {} from "jest";
import * as supertest from "supertest";
const request = supertest("http://localhost:3000");

describe("GET /random-url", () => {
  it("should return 404", () => {
    return request.get("/reset")
      .expect(404);
  });
});
