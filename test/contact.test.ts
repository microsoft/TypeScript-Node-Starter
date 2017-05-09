import * as supertest from "supertest";
const request = supertest("http://localhost:8000");

describe("GET /contact", () => {
  it("should return 200 OK", (done) => {
    request.get("/contact")
      .expect(200, done);
  });
});