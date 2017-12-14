import * as request from "supertest";
import * as app from "../src/app";

describe("GET /contact", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/contact")
      .expect(200, done);
  });
});
