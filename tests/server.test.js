const request = require('supertest')
const app = require('../server')

describe('API Test', () => {
    it('should return all issues', async() => {
        const res = await request(app).get('/issues')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toBe(2)
    })

    it('should return a single issue by id', async() => {
        const res = await request(app).get('/issues/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('id', 1)
    })

    it('should create a new issue', async() => {
        const newIssue = { title: "Issue 3", description: "Description of Issue 3"}
        const res = await request(app).post('/issues').send(newIssue)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('id', 3)
    })

    it('should update an issue', async() => {
        const updatedIssue = { title: "Updated Issue 1", description: "Updated description of Issue 1"}
        const res = await request(app).put('/issues/1').send(updatedIssue)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('title', 'Updated Issue 1')
    })

    it('should delete an issue', async() => {
        const res = await request(app).delete('/issues/1')
        expect(res.statusCode).toEqual(204)
    })

    it('should return 404 for non-existing issue', async() => {
        const res = await request(app).get('/issues/999')
        expect(res.statusCode).toEqual(404)
    })

})