import * as supertest from "supertest";
const request = supertest("http://localhost:3000");

describe("GET /login", () => {
  it("should return 200 OK", () => {
    return request.get("/login")
      .expect(200);
  });
});

describe("GET /signup", () => {
  it("should return 200 OK", () => {
    return request.get("/signup")
      .expect(200);
  });
});
