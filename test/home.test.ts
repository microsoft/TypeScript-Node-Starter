import {} from "jest";
import * as supertest from "supertest";
const request = supertest("http://localhost:3000");

describe("GET /", () => {
  it("should return 200 OK", () => {
    return request.get("/")
      .expect(200);
  });
});
