import request from "supertest";
import { App } from "../src/app";

const app = new App(3000, "test");
app.execute();

describe("GET /api", () => {
  it("should return 200 OK", () => {
    return request(app.express).get("/api")
      .expect(200);
  });
});
