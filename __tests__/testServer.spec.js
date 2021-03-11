const request = require('supertest')
const app = require('../src/server/server')

describe('Server routes', () => {
    test('Valid / request returns 200 response', async () => {
        const res = await request(app)
        .get('/')
        expect(200)
    })
    test('Valid /trip request returns 200 response', async () => {
        const res = await request(app)
        .post('/trip')
        .set('Content-Type', 'application/json')
        .set('Acccept', 'application/json')
        .send({'destination': 'Paris, France', 'arrivalDate': '2022-01-01'})
        expect(res.statusCode).toEqual(200)
        expect(res.body.imageSource).toBeDefined()
        expect(res.body.weather).toBeDefined()
    })
})
