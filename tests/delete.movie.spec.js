import { expect } from 'chai'
import sinon from 'sinon'
import moviesRepo from '../repositories/movie.repository.js'
import { deleteMovie } from '../controllers/movieControllers.js'
import 'mocha'

describe("moviesController", function () {
  describe("deleteMovie", function () {

    let status, json, req, res, body, send
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
      send = sinon.spy();
      res = { json, status, send, movie: stubValue };
      status.returns(res);
    });

    req = { body, params: { id: '60710c00bd10166b7bd3fb18' } }
    it("should delete a movie", async function () {
      const stub = sinon.stub(moviesRepo, "deleteMovie").returns(stubValue)
      await deleteMovie(req, res)
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(204)
      expect(send.args[0][0]).to.be.undefined
      stub.restore()
    });

    it("shouldn't delete a movie", async function () {
      const stub = sinon.stub(moviesRepo, "deleteMovie").callsFake(() => {
        throw new Error("Internal Server Error")
      })
      await deleteMovie(req, res)
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(500)
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.be.equal("Internal Server Error");
      stub.restore()
    });
  });
});
