import request from "supertest";
import app from "../app";

describe("Items Endpoint GET /items", () => {
  it("un-Authenticated users can't get items", async () => {
    const res: any = await request(app).get("/items");

    expect(res.statusCode).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.data).toEqual(null);
  });

  it("Autenticated users Fetch Items successfully", async () => {
    const res: any = await request(app)
      .get("/items")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JvbGUiOiJBZG1pbiIsImlhdCI6MTU5NDA0MjY4M30.9Q0oN59o-J-REjgiIgdNxj82RHXaRTCweSWIgjOjjd8",
      );
    expect(res.statusCode).toEqual(200);
    expect(res.body).not.toBe(null);
  });
});
