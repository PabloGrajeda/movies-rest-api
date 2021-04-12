import { expect } from 'chai'
import sinon from 'sinon'
import { getMovie } from '../controllers/movieControllers.js'
import 'mocha'

describe("moviesController", function () {
  describe("getMovie", function () {

    let status, json, req, res
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
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status, movie: stubValue };
      status.returns(res);
    });

    req = { params: { id: '60710c00bd10166b7bd3fb18' } }

    it("should get a movie", async function () {
      await getMovie(req, res)
      expect(status.calledOnce).to.be.true;
      expect(json.args[0][0]['_id']).to.be.equal('60710c00bd10166b7bd3fb18')
      expect(status.args[0][0]).to.equal(200)
    });
  });
});
