import "reflect-metadata";
import request from "supertest";

const queryData = {
  query: `
    mutation CheckLogin {
      Login(name: "Abdi Urgessa", email: "abdiurgessa9@gmail.com", password: "12345") {
        name
        password
        email
      }
    }
  `,
};

describe("Login Tests", () => {
  it("logs in successfully", async () => {
    const response = await request("http://localhost:4000")
      .post("/")
      .send(queryData);

    expect(response.errors).toBeUndefined();
    expect(response.body.data?.Login.name).toBe("Abdi Urgessa");
    expect(response.body.data?.Login.email).toBe("abdiurgessa9@gmail.com");
    expect(response.body.data?.Login.password).toBeNull(); // for security reasons, the password should not be returned in the response
  }, 100000000);
});
