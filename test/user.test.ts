import request from "supertest";
import { App } from "../src/app";

const chai = require("chai");
const expect = chai.expect;
const app = new App();
app.Execute();

describe("GET /login", () => {
  it("should return 200 OK", () => {
    return request(app.expressApp).get("/login")
      .expect(200);
  });
});

describe("GET /signup", () => {
  it("should return 200 OK", () => {
    return request(app.expressApp).get("/signup")
      .expect(200);
  });
});


describe("POST /login", () => {
  it("should return some defined error message with valid parameters", (done) => {
    return request(app.expressApp).post("/login")
      .field("email", "john@me.com")
      .field("password", "Hunter2")
      .expect(302)
      .end(function(err, res) {
        expect(res.error).not.to.be.undefined;
        done();
      });

  });
});
