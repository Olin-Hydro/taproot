const server = require("../src/server");
const sequelize = require("../src/database");
const supertest = require("supertest");

const request = supertest(server);

describe("sensor logs", () => {
  test("Get all sensor logs", async () => {
    const res = await request.post("/graphql").send({
      query: "{ sensorLogs{ id type data createdAt updatedAt } }",
    });
    expect(res.status).toEqual(200);
    const logs = res.body.data.sensorLogs;
    expect(logs.length).toBeGreaterThan(1);
    expect(logs[0]).toHaveProperty("data");
  });
  test("Get sensor log by id", async () => {
    const res = await request.post("/graphql").send({
      query: "{ sensorLogs(id:1){ id type data createdAt updatedAt } }",
    });
    expect(res.status).toEqual(200);
    const logs = res.body.data.sensorLogs;
    expect(logs.length).toEqual(1);
    expect(logs[0].id).toEqual("1");
    expect(logs[0]).toHaveProperty("type");
    expect(logs[0]).toHaveProperty("createdAt");
    expect(logs[0]).toHaveProperty("updatedAt");
  });
  test("Get sensor log by type", async () => {
    const res = await request.post("/graphql").send({
      query: `{ sensorLogs(type:"ph"){ id type data createdAt updatedAt } }`,
    });
    expect(res.status).toEqual(200);
    const logs = res.body.data.sensorLogs;
    expect(logs[0].type).toEqual("ph");
    expect(logs[0]).toHaveProperty("data");
    expect(logs[0]).toHaveProperty("createdAt");
    expect(logs[0]).toHaveProperty("updatedAt");
  });
  test("Get sensor logs by timestamp range", async () => {
    const res1 = await request.post("/graphql").send({
      query: "{ sensorLogs{ createdAt } }",
    });
    let logs = res1.body.data.sensorLogs;
    const subset = logs.length - 5;
    const startDate = logs[subset].createdAt;
    const res = await request.post("/graphql").send({
      query: `{ sensorLogs(startTime: {datetime: "${startDate}"}, endTime: {datetime: "2023-02-25 23:00:00"}){ id type data createdAt updatedAt } }`,
    });
    expect(res.status).toEqual(200);
    logs = res.body.data.sensorLogs;
    expect(logs.length).toEqual(4);
    expect(logs[0]).toHaveProperty("data");
    expect(logs[0]).toHaveProperty("createdAt");
    expect(logs[0]).toHaveProperty("updatedAt");
  });
  test("Get sensor logs by timestamp range and type", async () => {
    const res1 = await request.post("/graphql").send({
      query: `{ sensorLogs(type:"ph"){ createdAt } }`,
    });
    let logs = res1.body.data.sensorLogs;
    const subset = logs.length - 3;
    const startDate = logs[subset].createdAt;
    const res = await request.post("/graphql").send({
      query: `{ sensorLogs(type:"ph", startTime: {datetime: "${startDate}"}, endTime: {datetime: "2023-02-25 23:00:00"}){ id type data createdAt updatedAt } }`,
    });
    expect(res.status).toEqual(200);
    logs = res.body.data.sensorLogs;
    expect(logs.length).toEqual(2);
    expect(logs[0].type).toEqual("ph");
    expect(logs[0]).toHaveProperty("data");
    expect(logs[0]).toHaveProperty("createdAt");
    expect(logs[0]).toHaveProperty("updatedAt");
  });
});

afterAll(() => {
  sequelize.close();
  server.close();
});
