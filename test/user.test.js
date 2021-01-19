process.env.NODE_ENV = "test";

const { mongoose } = require("../config/mongoose");
const User = require("../models/user");
const { app } = require("../app");

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

describe("User Tests", () => {
  const testUser = new User({
    username: "Tester",
    email: "tester@email.com",
  });

  before((done) => {
    User.create(testUser);
    done();
  });

  after((done) => {
    mongoose.connection;
    User.deleteMany({}, (err) => {}).then(() => {
      mongoose.disconnect();
    });
    done();
  });

  // Tests that you can retrieve a user.
  describe("/GET /dashboard/:userId", () => {
    it("should return a user given a userid", (done) => {
      const newUser = new User({
        username: "Test User",
        email: "test@email.com",
        password: "this_is_a_password",
      });

      newUser.save((err, user) => {
        chai
          .request(app)
          .get("/dashboard/" + user.id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.username.should.be.eql("Test User");
          });
      });
      done();
    });
  });

  // Tests that you can add a child to a user.
  describe("/POST /dashboard/:userId/addchild", () => {
    it("should add a new child to the user", (done) => {
      const userWithChild = new User({
        username: "Parent",
        email: "parent@email.com",
        password: "this_is_a_password",
      });

      const child = {
        name: "Baby",
        age: "1",
        uid: "new uid",
      };

      userWithChild.save((err, user) => {
        chai
          .request(app)
          .post("/dashboard/" + user.id + "addchild")
          .send(child)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.child.name.should.be.eql("Baby");
          });
      });
      done();
    });
  });
});
