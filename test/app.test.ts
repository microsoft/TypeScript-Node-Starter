import request from "supertest";
import { App } from "../src/app";

const app = new App(3000, "test");
app.execute();

describe("GET /random-url", () => {
  it("should return 404", (done) => {
    request(app.express).get("/reset")
      .expect(404, done);
  });
});
