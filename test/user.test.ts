import * as request from "supertest";
import * as app from "../src/app";

describe("GET /login", () => {
  it("should return 200 OK", () => {
    return request(app).get("/login")
      .expect(200);
  });
});

describe("GET /signup", () => {
  it("should return 200 OK", () => {
    return request(app).get("/signup")
      .expect(200);
  });
});
