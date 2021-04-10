import { expect } from 'chai'
import sinon from 'sinon'
import moviesRepo from '../repositories/movie.repository.js'
import { createMovie } from '../controllers/movieControllers.js'
import 'mocha'

describe("moviesController", function () {
  describe("createMovie", function () {

    let status, json, req, res, body
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    body = {
      title: 'Doctor Strange: hechicero supremo',
      description: 'En Katmandú, Nepal, el hechicero Kaecilius y sus fanáticos entran en el recinto secreto de Kamar-Taj y asesinan a su bibliotecario',
      img: '"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1-MK7tHomhOcaLsoMzbNaTsfDIYG4nvx9iOXJEV93wtDdFTbC"',
      stars: '4.7',
      director: 'cott Derrickson',
      contentType: 'movie',
    };
    const stubValue = {
      _id: '60710c00bd10166b7bd3fb18',
      title: 'Doctor Strange: hechicero supremo',
      description: 'En Katmandú, Nepal, el hechicero Kaecilius y sus fanáticos entran en el recinto secreto de Kamar-Taj y asesinan a su bibliotecario',
      img: '"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1-MK7tHomhOcaLsoMzbNaTsfDIYG4nvx9iOXJEV93wtDdFTbC"',
      stars: '4.7',
      director: 'cott Derrickson',
      contentType: 'movie',
      __v: 0
    };

    req = { body }
    it("should add a new movie", async function () {
      const stub = sinon.stub(moviesRepo, "movieCreate").returns(stubValue)
      await createMovie(req, res)
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201)
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.be.equal(undefined);
      stub.restore()
    });



    body = {
      description: 'En Katmandú, Nepal, el hechicero Kaecilius y sus fanáticos entran en el recinto secreto de Kamar-Taj y asesinan a su bibliotecario',
      img: '"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1-MK7tHomhOcaLsoMzbNaTsfDIYG4nvx9iOXJEV93wtDdFTbC"',
      stars: '4.7',
      director: 'cott Derrickson',
      contentType: 'movie',
    };
    req = { body }
    it("shouldn't add a new movie because of missing title", async function () {
      const stub = sinon.stub(moviesRepo, "movieCreate").callsFake(() => {
        throw new Error("Movie validation failed: title: Path `title` is required.")
      })
      await createMovie(req, res)
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400)
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.be.equal("Movie validation failed: title: Path `title` is required.");
      stub.restore()
    });
  });
});




























// describe("moviesController", function () {
//   describe("createMovie", function () {
//     const body = {
//       title: faker.lorem.words(),
//       description: faker.lorem.paragraph(),
//       img: faker.image.imageUrl(),
//       stars: (Math.floor(Math.random() * (5 - 1)) + 1),
//       director: faker.lorem.words(),
//       contentType: aker.lorem.word(),
//     };

//     let req, res, json, status;
//     beforeEach(() => {
//       req = { body }
//       json = sinon.spy();
//       status = sinon.stub();
//       res = { json, status };
//       status.returns(res)
//     });
//     it("should add a new movie", async function () {
//       const movie = await moviesController.createMovie(req, res);
//       expect(movie.status).to.be.be.equal(201);
//     });
//   });
// });





























// describe("moviesController", function () {

//   let req;
//   let res;
//   let movieService;
//   this.beforeEach

//   const stubValue = {
//     id: faker.random.uuid(),
//     title: faker.lorem.words(),
//     description: faker.lorem.paragraph(),
//     img: faker.image.imageUrl(),
//     stars: (Math.floor(Math.random() * (5 - 1)) + 1),
//     director: faker.lorem.words(),
//     contentType: aker.lorem.word(),
//   };
//   describe("create", function () {
//     it("should add a new movie to the db", async function () {
//       const stub = sinon.stub(moviesController, "createMovie").returns(stubValue);
//       const movie = await moviesController.createMovie(stubValue.name, stubValue.email);
//       expect(stub.calledOnce).to.be.true;
//       expect(user.id).to.equal(stubValue.id);
//       expect(user.name).to.equal(stubValue.name);
//       expect(user.email).to.equal(stubValue.email);
//       expect(user.createdAt).to.equal(stubValue.createdAt);
//       expect(user.updatedAt).to.equal(stubValue.updatedAt);
//     });
//   });
// });