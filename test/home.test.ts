import request from "supertest";
import { App } from "../src/app";

const app = new App(3000, "test");
app.execute();

describe("GET /", () => {
  it("should return 200 OK", (done) => {
    request(app.express).get("/")
      .expect(200, done);
  });
});
