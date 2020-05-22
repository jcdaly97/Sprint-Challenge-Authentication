const request = require('supertest')
const server = require('./server')
const db = require('../database/dbConfig')

/*const testUser = {
    username: "testUser",
    password: "testPassword"
}

beforeEach(async () => {
    await db.insert(testUser)
});*/

afterEach( async()=>{
    await db("users").truncate();
})

describe("endpoints tests", ()=>{
    it('can run tests', ()=>{
        expect(true).toBeTruthy()
    })

    describe('register flow', ()=>{

        it('POST success',()=>{
            return request(server).post('/api/auth/register')
                .send({
                    "username": "testUser",
                    "password": "testPassword"
                })
                .expect(201)
        })
        it('POST failure', ()=>{
            return request(server).post('/api/auth/register')
                .send({
                    "name": "testUser",
                    "pass": "testPassword"
                })
                .expect(500)
        })
    })

    describe('login flow success', ()=>{
        it('login success', ()=>{
            const testUser = {
                "username": "testUser",
                "password": "testPassword"
            }
            return request(server).post('/api/auth/register')
                .send(testUser)
                .expect(201)
                .then(response=>{
                   return request(server).post('/api/auth/login')
                        .send(testUser)
                        .expect(200)
                        .then(response2=>{
                            console.log(response2.body.token, 'response from login')
                            let token = response2.body.token
                            console.log(token, 'saved token')
                            expect(response2.body.token).toBeTruthy()
                            return request(server).get('/api/jokes')
                                .set('authorization', `${token}`)
                                .expect(200)
                                .then(jokes=>{
                                    expect(jokes.body.length > 0).toBe(true)
                                })
                        })
                })
        })
    })

    describe('login flow failure', ()=>{
        it('failure case 1', ()=>{
            const testUser = {
                "username": "testUser",
                "password": "testPassword"
            }
            return request(server).post('/api/auth/register')
                .send(testUser)
                .expect(201)
                .then(response=>{
                   return request(server).post('/api/auth/login')
                        .send({
                            "username": "testUser",
                            "password": "testPasswo"
                        })
                        .expect(401)
                        
                })
        })
        it('failure case 2', ()=>{
          
            const testUser = {
                "username": "testUser",
                "password": "testPassword"
            }
            return request(server).post('/api/auth/register')
                .send(testUser)
                .expect(201)
                .then(response=>{
                   return request(server).post('/api/auth/login')
                        .send(testUser)
                        .expect(200)
                        .then(response2=>{
                            console.log(response2.body.token, 'response from login')
                            let token = response2.body.token
                            console.log(token, 'saved token')
                            expect(response2.body.token).toBeTruthy()
                            return request(server).get('/api/jokes')
                                .set('authorization', `${token}`)
                                .expect(200)
                                .then(jokes=>{
                                    expect(jokes.body.length > 0).toBe(true)
                                })
                        
                
        })
    })
        })
    })


})