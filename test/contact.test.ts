import * as supertest from "supertest";
const app = require("../src/app");
const request = supertest(app);

describe("GET /contact", () => {
  it("should return 200 OK", () => {
    return request.get("/contact")
      .expect(200);
  });
});
