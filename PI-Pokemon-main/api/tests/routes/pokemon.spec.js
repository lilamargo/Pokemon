/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Toco",
  hp: 35,
  attack: 55,
  defense: 40,
  speed: 90,
  height: 4,
  weight: 60,
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );

  describe("GET /pokemon/:id", () => {
    it("should get 200", function () {
      agent.get("/api/pokemon/25").then(() => done(expect(200)));
    });
  });
  describe("GET /pokemon?name", () => {
    it("Should be 200 un successful post", function () {
      agent.get("/api/pokemon?name=pikachu").then(() => done(expect(200)));
    });
  });
});
