import request from "supertest";
import { App } from "../src/app";

const chai = require("chai");
const expect = chai.expect;
const app = App.getApp("test");
app.execute();

describe("GET /contact", () => {
  it("should return 200 OK", (done) => {
    request(app.express).get("/contact")
      .expect(200, done);
  });
});


describe("POST /contact", () => {
  it("should return false from assert when no message is found", (done) => {
    request(app.express).post("/contact")
      .field("name", "John Doe")
      .field("email", "john@me.com")
      .end(function(err, res) {
        expect(res.error).to.be.false;
        done();
      })
      .expect(302);

  });
});