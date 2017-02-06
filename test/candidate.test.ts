import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/candidates', () => {

  it('responds with JSON array', () => {
    return chai.request(app).get('/api/candidates')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(5);
      });
  });

  it('should include Fidel Castro', () => {
    return chai.request(app).get('/api/candidates')
      .then(res => {
        let Wolverine = res.body.find(hero => hero.name === 'Fidel Castro');
        expect(Wolverine).to.exist;
        expect(Wolverine).to.have.all.keys([
          'id',
          'name',
          'gender',
          'jobs',
          'city',
          'skills'
        ]);
      });
  });

  describe('GET api/candidates/:id', () => {

    it('responds with single JSON object', () => {
      return chai.request(app).get('/api/candidates/1')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
        });
    });

    it('should return Sasha Grey', () => {
      return chai.request(app).get('/api/candidates/4')
        .then(res => {
          expect(res.body.hero.name).to.equal('Sasha Grey');
        });
    });

  });

});
