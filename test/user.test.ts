import * as supertest from "supertest";
const request = supertest("http://localhost:8000");

describe("GET /login", () => {
  it("should return 200 OK", (done) => {
    request.get("/login")
      .expect(200, done);
  });
});

describe("GET /signup", () => {
  it("should return 200 OK", (done) => {
    request.get("/signup")
      .expect(200, done);
  });
});