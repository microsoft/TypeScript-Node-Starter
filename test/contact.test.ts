import request from "supertest";
import { App } from "../src/app";

const chai = require("chai");
const expect = chai.expect;
const app = new App();
app.Execute();

describe("GET /contact", () => {
  it("should return 200 OK", (done) => {
    request(app.expressApp).get("/contact")
      .expect(200, done);
  });
});


describe("POST /contact", () => {
  it("should return false from assert when no message is found", (done) => {
    request(app.expressApp).post("/contact")
      .field("name", "John Doe")
      .field("email", "john@me.com")
      .end(function(err, res) {
        expect(res.error).to.be.false;
        done();
      })
      .expect(302);

  });
});