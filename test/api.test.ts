import request from "supertest";
import { App } from "../src/app";
import * as http from "http";

const app = App.getApp("test");
app.execute();

describe("GET /api", () => {
  it("should return 200 OK", () => {
    return request(app.express).get("/api")
      .expect(200);
  });
});
