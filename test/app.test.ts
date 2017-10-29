import * as supertest from "supertest";
import * as app from "../src/server";

describe("GET /random-url", () => {
  const request = supertest(app);

  it("should return 404", (done) => {
    request.get("/reset")
      .expect(404, done);
  });
});
