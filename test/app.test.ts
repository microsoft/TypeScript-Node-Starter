import request from "supertest";
import { App } from "../src/app";

const app = new App();
app.Execute();

describe("GET /random-url", () => {
  it("should return 404", (done) => {
    request(app.expressApp).get("/reset")
      .expect(404, done);
  });
});
