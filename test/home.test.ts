import request from "supertest";
import { App } from "../src/app";

const app = new App();
app.Execute();

describe("GET /", () => {
  it("should return 200 OK", (done) => {
    request(app.expressApp).get("/")
      .expect(200, done);
  });
});
