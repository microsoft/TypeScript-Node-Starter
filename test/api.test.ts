import * as request from "supertest";
import * as app from "../src/app";

describe("GET /api", () => {
  it("should return 200 OK", () => {
    return request(app).get("/api")
      .expect(200);
  });
});
