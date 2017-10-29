import * as supertest from "supertest";
import * as app from "../src/server";

describe("GET /", () => {
  const request = supertest(app);

  it("should return 200 OK", (done) => {
    request.get("/")
      .expect(200, done);
  });
});
