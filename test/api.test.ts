import * as supertest from "supertest";

const app = require("../src/app");
const request = supertest(app);

describe("GET /api", () => {
  const request = supertest(app);

  it("should return 200 OK", () => {
    return request
      .get("/api")
      .expect(200);
  });
});
