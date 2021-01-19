process.env.NODE_ENV = "test";

const { mongoose } = require("../config/mongoose");
const { app } = require("../app");

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

const { expect } = chai;

describe("Tests that database connects to test environment", () => {
  describe("Tests that mongoose connects to test not development", () => {
    it("checks mongoose has connected to the test database not development", (done) => {
      chai.request(app);
      expect(mongoose.connection.name === "santa_site_test");
      done();
    });

    it("should not connect to test when node_env is not test", (done) => {
      NODE_ENV = "development";
      chai.request(app);
      expect(mongoose.connection.name === "santa_site");
      NODE_ENV = "test";
      done();
    });
  });
});
