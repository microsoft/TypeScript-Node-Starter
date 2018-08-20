import request from "supertest";
import { App } from "../src/app";

const app = new App();
app.Execute();

describe("GET /api", () => {
  it("should return 200 OK", () => {
    return request(app.expressApp).get("/api")
      .expect(200);
  });
});
