const server = require("../src/server");
const sequelize = require("../src/database");
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

describe("ec logs", () => {
  test("Get all ec logs", async () => {
    const res = await request.post("/graphql").send({
      query: "{ ecLogs{ id ec createdAt updatedAt } }",
    });
    expect(res.status).toEqual(200);
    const logs = res.body.data.ecLogs;
    expect(logs.length).toBeGreaterThan(1);
    expect(logs[0]).toHaveProperty("ec");
  });
  test("Get ec log by id", async () => {
    const res = await request.post("/graphql").send({
      query: "{ ecLogs(id:1){ id ec createdAt updatedAt } }",
    });
    expect(res.status).toEqual(200);
    const logs = res.body.data.ecLogs;
    expect(logs.length).toEqual(1);
    expect(logs[0].id).toEqual("1");
    expect(logs[0]).toHaveProperty("ec");
    expect(logs[0]).toHaveProperty("createdAt");
    expect(logs[0]).toHaveProperty("updatedAt");
  });
  test("Get ec logs by timestamp range", async () => {
    const res1 = await request.post("/graphql").send({
      query: "{ ecLogs{ createdAt } }",
    });
    let logs = res1.body.data.ecLogs;
    const subset = logs.length - 5;
    const startDate = logs[subset].createdAt;
    const res = await request.post("/graphql").send({
      query: `{ ecLogs(startTime: {datetime: "${startDate}"}, endTime: {datetime: "2023-02-25 23:00:00"}){ id ec createdAt updatedAt } }`,
    });
    expect(res.status).toEqual(200);
    logs = res.body.data.ecLogs;
    expect(logs.length).toEqual(4);
    expect(logs[0]).toHaveProperty("ec");
    expect(logs[0]).toHaveProperty("createdAt");
    expect(logs[0]).toHaveProperty("updatedAt");
  });
});

describe("temp logs", () => {
  test("Get all temp logs", async () => {
    const res = await request.post("/graphql").send({
      query: "{ tempLogs{ id temp createdAt updatedAt } }",
    });
    console.log(res);
    expect(res.status).toEqual(200);
    const logs = res.body.data.tempLogs;
    expect(logs.length).toBeGreaterThan(1);
    expect(logs[0]).toHaveProperty("temp");
  });
  test("Get temp log by id", async () => {
    const res = await request.post("/graphql").send({
      query: "{ tempLogs(id:1){ id temp createdAt updatedAt } }",
    });
    expect(res.status).toEqual(200);
    const logs = res.body.data.tempLogs;
    expect(logs.length).toEqual(1);
    expect(logs[0].id).toEqual("1");
    expect(logs[0]).toHaveProperty("temp");
    expect(logs[0]).toHaveProperty("createdAt");
    expect(logs[0]).toHaveProperty("updatedAt");
  });
  test("Get temp logs by timestamp range", async () => {
    const res1 = await request.post("/graphql").send({
      query: "{ tempLogs{ createdAt } }",
    });
    let logs = res1.body.data.tempLogs;
    const subset = logs.length - 5;
    const startDate = logs[subset].createdAt;
    const res = await request.post("/graphql").send({
      query: `{ tempLogs(startTime: {datetime: "${startDate}"}, endTime: {datetime: "2023-02-25 23:00:00"}){ id temp createdAt updatedAt } }`,
    });
    expect(res.status).toEqual(200);
    logs = res.body.data.tempLogs;
    expect(logs.length).toEqual(4);
    expect(logs[0]).toHaveProperty("temp");
    expect(logs[0]).toHaveProperty("createdAt");
    expect(logs[0]).toHaveProperty("updatedAt");
  });
});

afterAll(() => {
  sequelize.close();
  server.close();
});
