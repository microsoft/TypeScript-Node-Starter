import * as supertest from "supertest";
import * as app from "../src/server";

describe("GET /api", () => {
  const request = supertest(app);

  it("should return 200 OK", () => {
    request
      .get("/api")
      .expect(200);
  });
});
