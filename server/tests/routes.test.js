const request = require("supertest");
const app = require("../app");

describe("test Blog-API", () => {
  describe("Endpoint success test", () => {
    test("test endpoint /posts", (done) => {
      request(app)
        .get("/posts")
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body[0]).toHaveProperty("userId");
          expect(res.body[0]).toHaveProperty("title");
          expect(res.body[0]).toHaveProperty("content");
          expect(typeof res.body[0]).toBe("object");
          expect(res.body.length).toBeGreaterThan(0);
          expect(Array.isArray(res.body)).toBe(true);
          done();
        });
    });

    test("test endpoint /posts/user/:userId", (done) => {
      request(app)
        .get("/posts/user/1")
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body[0]).toHaveProperty("userId");
          expect(res.body[0].userId).toBe(1);
          done();
        });
    });

    test("test endpoint /users => add user", (done) => {
      request(app)
        .post("/users")
        .send({
          id: 7,
          firstname: "walaa",
          secondname: "volidis",
          password: "walaa",
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(typeof(res.body)).toBe("object");
          done();
        });
    });

    test("test endpoint /posts => add post", (done) => {
      request(app)
        .post("/posts")
        .send({
            userId: 1,
            title: "My First Post",
            content: "This is the content of my very first post. Hello world!"
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(typeof(res.body)).toBe("object");
          done();
        });
    });
  });

  describe("ُEndpoint Failure test", () => {
    test("test not exist user in endpoint /posts/user/:userId", (done) => {
      request(app)
        .get("/posts/user/0")
        .expect(404)
        .expect("Content-Type", /text/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).toBe('User 0 Not Fount')
          done();
        });
    });


    test("test exist user endpoint /users => add user", (done) => {
      request(app)
        .post("/users")
        .send({
            id: 1,
            firstname: "aysha",
            secondname: "volidis",
            password: "aysha22"
        })
        .expect("Content-Type", /text/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).toBe("There is user has this id ,Enter anthor one");
          done();
        });
    });

    test("test not vaild user endpoint /users => add user", (done) => {
      request(app)
        .post("/users")
        .send({
          id: 3,
          firstname: "aysha",
          password: "aysha22",
        })
        .expect("Content-Type", /text/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).toBe('Enter vaild user with data id,firstname,secondname,password');
          done();
        });
    });

    test("test empty user endpoint /users => add user", (done) => {
      request(app)
        .post("/users")
        .send({})
        .expect("Content-Type", /text/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).toBe('Enter vaild user');
          done();
        });
    });

    test("test empty post endpoint /post => add post", (done) => {
      request(app)
        .post("/posts")
        .send({})
        .expect("Content-Type", /text/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).toBe('Enter vaild post');
          done();
        });
    });

    test("test not exist user endpoint /posts => add post", (done) => {
      request(app)
        .post("/posts")
        .send({
            userId: 5,
            title: "My First Post",
            content: "This is the content of my very first post. Hello world!"
        })
        .expect("Content-Type", /text/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).toBe("No User has this Id ,Enter vaild id");
          done();
        });
    });

    test("test not vaild endpoint /posts => add post", (done) => {
      request(app)
        .post("/posts")
        .send({
            userId: 5,
            content: "This is the content of my very first post. Hello world!"
        })
        .expect("Content-Type", /text/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).toBe('Enter vaild post with data userId,title,content');
          done();
        });
    });
  });
});
