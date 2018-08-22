import request from "supertest";
import { App } from "../src/app";
import * as http from "http";

const app = App.getApp("test");
app.execute();

describe("GET /random-url", () => {
  it("should return 404", (done) => {
    request(app.express).get("/reset")
      .expect(404, done);
  });
});
