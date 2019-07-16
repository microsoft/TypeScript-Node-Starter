import request from "supertest";
import app from "../src/app";
import { expect} from "chai";

describe("GET /contact", () => {
    it("should return 200 OK", (done) => {
        request(app).get("/contact")
            .expect(200, done);
    });
});


describe("POST /contact", () => {
    it("should return false from assert when no message is found", (done) => {
        request(app).post("/contact")
            .field("name", "John Doe")
            .field("email", "john@me.com")
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);

    });
});