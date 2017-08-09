import * as supertest from "supertest";
const request = supertest("http://localhost:3000");

describe("GET /contact", () => {
  it("should return 200 OK", () => {
    return request.get("/contact")
      .expect(200);
  });
});
