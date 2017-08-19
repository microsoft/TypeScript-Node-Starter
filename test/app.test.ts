import * as supertest from "supertest";
const app = require("../src/app");
const request = supertest(app);

describe("GET /random-url", () => {
  it("should return 404", () => {
    return request.get("/reset")
      .expect(404);
  });
});
