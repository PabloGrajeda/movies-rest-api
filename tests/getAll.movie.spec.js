import { expect } from 'chai'
import sinon from 'sinon'
import moviesRepo from '../repositories/movie.repository.js'
import { getMovies } from '../controllers/movieControllers.js'
import 'mocha'

describe("moviesController", function () {
  describe("getMovies", function () {

    let status, json, req, res
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    const stubValue = [{
      _id: '60710c00bd10166b7bd3fb18',
      title: 'Doctor Strange: hechicero supremo',
      description: 'En Katmandú, Nepal, el hechicero Kaecilius y sus fanáticos entran en el recinto secreto de Kamar-Taj y asesinan a su bibliotecario',
      img: '"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1-MK7tHomhOcaLsoMzbNaTsfDIYG4nvx9iOXJEV93wtDdFTbC"',
      stars: '4.7',
      director: 'cott Derrickson',
      contentType: 'movie',
      __v: 0
    }];

    it("should get an array of movies", async function () {
      const stub = sinon.stub(moviesRepo, "getMovies").returns(stubValue)
      await getMovies(req, res)
      expect(status.calledOnce).to.be.true;
      expect(json.args[0][0]).to.be.an('array')
      expect(status.args[0][0]).to.equal(200)
      stub.restore()
    });

    it("shouldn't get an array of movies", async function () {
      const stub = sinon.stub(moviesRepo, "getMovies").callsFake(() => {
        throw new Error("Internal server error")
      })
      await getMovies(req, res)
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(500)
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.be.equal("Internal server error");
      stub.restore()
    });
  });
});
