const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const pool = require('../utils/db');

describe('Orange API Endpoints', function () {
  let createdOrangeId;

  before(async function () {
    await pool.query('DELETE FROM oranges');
    await pool.query("INSERT INTO oranges (name, quantity, price) VALUES ('Sample Orange', 20, 1.99) RETURNING id");
  });

  after(async function () {
    await pool.query('DELETE FROM oranges');
    await pool.end();
  });

  describe('POST /oranges', function () {
    it('should create a new orange', async function () {
      const newOrange = { name: 'Test Orange', quantity: 50, price: 2.99 };

      const res = await request(app).post('/oranges').send(newOrange);

      expect(res.status).to.equal(201);
      expect(res.body).to.include.keys('id', 'name', 'quantity', 'price');
      expect(res.body.name).to.equal(newOrange.name);
      createdOrangeId = res.body.id;
    });

    it('should fail if missing required fields', async function () {
      const res = await request(app).post('/oranges').send({});

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property('error');
    });
  });

  describe('GET /oranges', function () {
    it('should retrieve all oranges', async function () {
      const res = await request(app).get('/oranges');

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

  describe('GET /oranges/:id', function () {
    it('should retrieve an orange by id', async function () {
      if (!createdOrangeId) this.skip();

      const res = await request(app).get(`/oranges/${createdOrangeId}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('id', createdOrangeId);
    });

    it('should return 404 for a non-existing orange', async function () {
      const res = await request(app).get('/oranges/999999');

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('error', 'Orange not found');
    });
  });

  describe('PUT /oranges/:id', function () {
    it('should update an existing orange', async function () {
      if (!createdOrangeId) this.skip();

      const updatedOrange = { name: 'Updated Orange', quantity: 75, price: 3.49 };

      const res = await request(app).put(`/oranges/${createdOrangeId}`).send(updatedOrange);

      expect(res.status).to.equal(200);
      expect(res.body).to.include(updatedOrange);
    });

    it('should return 404 when updating a non-existing orange', async function () {
      const updatedOrange = { name: 'Non-Existing Orange', quantity: 10, price: 1.99 };

      const res = await request(app).put('/oranges/999999').send(updatedOrange);

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('error', 'Orange not found');
    });
  });

  describe('DELETE /oranges/:id', function () {
    it('should delete an existing orange', async function () {
      if (!createdOrangeId) this.skip();

      const res = await request(app).delete(`/oranges/${createdOrangeId}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Orange deleted successfully');
    });

    it('should return 404 when deleting a non-existing orange', async function () {
      const res = await request(app).delete('/oranges/999999');

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('error', 'Orange not found');
    });
  });
});
