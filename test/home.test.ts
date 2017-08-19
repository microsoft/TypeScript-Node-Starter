import * as supertest from "supertest";
const app = require("../src/app");
const request = supertest(app);

describe("GET /", () => {
  it("should return 200 OK", () => {
    return request.get("/")
      .expect(200);
  });
});
