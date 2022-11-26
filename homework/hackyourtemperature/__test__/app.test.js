import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  // if we provide city is not exist in the database should return the 400 status code,
  it("should return 400 status code in the case of wrong city name", async () => {
    const response = await request.post("/weather").send({
      cityName: "Ista",
    });
    expect(response.statusCode).toBe(400);
  });

  // if we were able to fetch the data properly it will return 200 status code
  it("should return 200 status code in the case of true city name", async () => {
    const response = await request.post("/weather").send({
      cityName: "Istanbul",
    });
    expect(response.statusCode).toBe(200);
  });
});
