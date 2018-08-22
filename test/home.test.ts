import request from "supertest";
import { App } from "../src/app";
import * as http from "http";

const app = App.getApp("test");
app.execute();

describe("GET /", () => {
  it("should return 200 OK", (done) => {
    request(app.express).get("/")
      .expect(200, done);
  });
});
