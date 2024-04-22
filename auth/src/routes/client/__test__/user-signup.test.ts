import request from 'supertest'
import { app } from '../../../app'

it("return 201 when user signup", async()=>{
    return request(app)
            .post('/api/users/signup')
            .send({
                email: "dhairya@yahoo.com",
                password: "123456789"
            })
            .expect(201)
})

it("return 400 when user signup with invalid email", async()=>{
    return request(app)
            .post('/api/users/signup')
            .send({
                email: "",
                password: "123456789"
            })
            .expect(400)
})

it("return 400 when user signup with invalid password", async()=>{
    return request(app)
            .post('/api/users/signup')
            .send({
                email: "dhairya@yahoo.com",
                password: ""
            })
            .expect(400)
})

it("return 400 when user signup with invalid email and password", async()=>{
    return request(app)
            .post('/api/users/signup')
            .send({})
            .expect(400)
})

it("return 400 when user signup with invalid email or password", async()=>{
    await request(app)
            .post('/api/users/signup')
            .send({ email : "dhariya@yahoo.com"})
            .expect(400)
    await request(app)
            .post('/api/users/signup')
            .send({ password : "123456789"})
            .expect(400)
})

it("return 400 when user signup with duplicate email", async()=>{
    await request(app)
            .post('/api/users/signup')
            .send({ 
                email : "dhariya@yahoo.com",
                password: "123456789"
            })
            .expect(201)

    await request(app)
            .post('/api/users/signup')
            .send({ 
                email : "dhariya@yahoo.com",
                password: "123456789"
            })
            .expect(400)
})