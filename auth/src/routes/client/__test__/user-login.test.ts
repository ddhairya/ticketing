import request from "supertest";
import {app} from '../../../app'

it('return 200 with succesfull login', async()=> {
    const userSignup = await request(app)
                                .post('/api/users/signup')
                                .send({
                                    email: "dhairya@yahoo.com",
                                    password: "123456789"
                                })
                                .expect(201)

    const userLogin = await request(app)
            .post('/api/users/login')
            .send({
                email: "dhairya@yahoo.com",
                password: "123456789"
            })
            .expect(200)
    expect(userLogin.get('Set-Cookie')).toBeDefined()
})

it('return 400 password missmatch', async()=> {
    const userSignup = await request(app)
                                .post('/api/users/signup')
                                .send({
                                    email: "dhairya@yahoo.com",
                                    password: "123456789"
                                })
                                .expect(201)

    await request(app)
            .post('/api/users/login')
            .send({
                email: "dhairya@yhaoo.com",
                password: "1234056789"
            })
            .expect(400)
})

it('return 400 email id dosenot exists', async()=> {
    const userSignup = await request(app)
                                .post('/api/users/signup')
                                .send({
                                    email: "dhairya@yahoo.com",
                                    password: "123456789"
                                })
                                .expect(201)

    await request(app)
            .post('/api/users/login')
            .send({
                email: "dhairya@yhao.com",
                password: "1234056789"
            })
            .expect(400)
})