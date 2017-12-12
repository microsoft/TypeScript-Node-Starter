import * as supertest from "supertest";
import * as app from "../src/server";

const request = supertest(app);

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
