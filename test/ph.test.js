const server = require("../src/server");
const sequelize = require("../src/utils/database");
const supertest = require("supertest");

const request = supertest(server);
describe("ph logs", () => {
  test("Get all ph logs", async () => {
    const res = await request.post("/graphql").send({
      query: "{ phLogs{ id ph createdAt updatedAt } }",
    });
    expect(res.status).toEqual(200);
    const logs = res.body.data.phLogs;
    expect(logs.length).toBeGreaterThan(1);
    expect(logs[0]).toHaveProperty("ph");
  });
  test("Get ph log by id", async () => {
    const res = await request.post("/graphql").send({
      query: "{ phLogs(id:1){ id ph createdAt updatedAt } }",
    });
    expect(res.status).toEqual(200);
    const logs = res.body.data.phLogs;
    expect(logs.length).toEqual(1);
    expect(logs[0].id).toEqual("1");
    expect(logs[0]).toHaveProperty("ph");
    expect(logs[0]).toHaveProperty("createdAt");
    expect(logs[0]).toHaveProperty("updatedAt");
  });
  test("Get ph logs by timestamp range", async () => {
    const res1 = await request.post("/graphql").send({
      query: "{ phLogs{ createdAt } }",
    });
    let logs = res1.body.data.phLogs;
    const subset = logs.length - 5;
    const startDate = logs[subset].createdAt;
    const res = await request.post("/graphql").send({
      query: `{ phLogs(startTime: {datetime: "${startDate}"}, endTime: {datetime: "2023-02-25 23:00:00"}){ id ph createdAt updatedAt } }`,
    });
    expect(res.status).toEqual(200);
    logs = res.body.data.phLogs;
    expect(logs.length).toEqual(4);
    expect(logs[0]).toHaveProperty("ph");
    expect(logs[0]).toHaveProperty("createdAt");
    expect(logs[0]).toHaveProperty("updatedAt");
  });
});

afterAll(() => {
  sequelize.close();
  server.close();
});
