import {} from "jest";
import * as supertest from "supertest";
const app = require("../src/app");
const request = supertest(app);

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
