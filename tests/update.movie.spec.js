import { expect } from 'chai'
import sinon from 'sinon'
import moviesRepo from '../repositories/movie.repository.js'
import { updateMovie } from '../controllers/movieControllers.js'
import 'mocha'

describe("moviesController", function () {
  describe("updateMovie", function () {

    let status, json, req, res, body
    const stubValue = {
      _id: '60710c00bd10166b7bd3fb18',
      title: 'Doctor Strange',
      description: 'En Katmandú, Nepal, el hechicero Kaecilius y sus fanáticos entran en el recinto secreto de Kamar-Taj y asesinan a su bibliotecario',
      img: '"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1-MK7tHomhOcaLsoMzbNaTsfDIYG4nvx9iOXJEV93wtDdFTbC"',
      stars: '5.0',
      director: 'cott Derrickson',
      contentType: 'movie',
      __v: 0
    };
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status, movie: stubValue };
      status.returns(res);
    });

    body = {
      title: 'Doctor Strange',
      stars: '5.0'
    };

    req = { body, params: { id: '60710c00bd10166b7bd3fb18' } }
    it("should update a movie", async function () {
      const stub = sinon.stub(moviesRepo, "updateMovie").returns(stubValue)
      await updateMovie(req, res)
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200)
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0]['_id']).to.be.equal(req.params.id);
      expect(json.args[0][0].title).to.be.equal(req.body.title);
      expect(json.args[0][0].stars).to.be.equal(req.body.stars);
      stub.restore()
    });

    it("shouldn't update a movie", async function () {
      const stub = sinon.stub(moviesRepo, "updateMovie").callsFake(() => {
        throw new Error("Internal Server Error")
      })
      await updateMovie(req, res)
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(500)
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.be.equal("Internal Server Error");
      stub.restore()
    });
  });
});
