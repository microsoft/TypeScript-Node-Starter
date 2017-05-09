import * as supertest from "supertest";
import {default as app} from "../src/server";

const request = supertest("http://localhost:8000");

describe("GET /api", () => {
  it("should return 200 OK", () => {
    request
      .get("/api")
      .expect(200);
  });
});
